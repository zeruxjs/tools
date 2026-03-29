/**
 * server.ts — Custom Next.js server with WebSocket support
 *
 * Works for both dev (with Turbopack) and production.
 * HTTP and WS share the same port.
 *
 * Port resolution priority:
 *   1. CLI flag:  tsx server.ts -p 4000  |  --port 4000
 *   2. Env var:   PORT=4000
 *   3. Default:   3000
 *
 * Dev:  NODE_ENV=development tsx server.ts [--turbo] [-p PORT]
 * Prod: NODE_ENV=production  tsx server.ts [-p PORT]
 */

import { createServer, ServerResponse } from "http";
import type { IncomingMessage } from "http";
import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { parse } from "url";
import { spawn } from "child_process";
import * as net from "net";
import { initWss } from "./lib/wss";

// ─── Port & flags ──────────────────────────────────────────────────────────────

function resolvePort(): number {
    const args = process.argv.slice(2);
    const idx = args.findIndex((a) => a === "-p" || a === "--port");
    if (idx !== -1 && args[idx + 1]) {
        const n = parseInt(args[idx + 1], 10);
        if (!isNaN(n)) return n;
    }
    if (process.env.PORT) {
        const n = parseInt(process.env.PORT, 10);
        if (!isNaN(n)) return n;
    }
    return 3000;
}

const PORT = resolvePort();
const IS_DEV = process.env.NODE_ENV !== "production";
const USE_TURBO =
    process.argv.includes("--turbo") ||
    process.argv.includes("--turbopack") ||
    process.env.NEXT_EXPERIMENTAL_TURBOPACK === "1";
const HOST = process.env.HOSTNAME ?? "0.0.0.0";

// ─── WebSocket server ─────────────────────────────────────────────────────────

function makeWss(): WebSocketServer {
    const wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
        const ip =
            (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ??
            req.socket.remoteAddress ??
            "unknown";
        console.log(`[ws] + ${ip}`);

        ws.on("message", (raw) => {
            // ── YOUR HANDLER HERE ──────────────────────────────────────────────
            console.log(`[ws] msg: ${raw}`);
            ws.send(`echo: ${raw}`);
            // ──────────────────────────────────────────────────────────────────
        });

        ws.on("close", () => console.log(`[ws] - ${ip}`));
        ws.on("error", (e) => console.error(`[ws] error:`, e.message));
    });

    return wss;
}

// ─── Production ───────────────────────────────────────────────────────────────

async function startProd(wss: WebSocketServer) {
    const next = (await import("next")).default;
    const app = next({ dev: false, dir: process.cwd() });
    await app.prepare();
    const handle = app.getRequestHandler();

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
        handle(req, res, parse(req.url ?? "/", true));
    });

    server.on(
        "upgrade",
        (req: IncomingMessage, socket: net.Socket, head: Buffer) => {
            const { pathname } = parse(req.url ?? "/");
            if (pathname === "/ws") {
                wss.handleUpgrade(req, socket, head, (ws) =>
                    wss.emit("connection", ws, req)
                );
            } else {
                socket.destroy();
            }
        }
    );

    server.listen(PORT, HOST, () => {
        console.log(`▲ Next.js ready (production)`);
        console.log(`  http → http://localhost:${PORT}`);
        console.log(`  ws   → ws://localhost:${PORT}/ws`);
    });
}

// ─── Development ──────────────────────────────────────────────────────────────
//
// Strategy: run `next dev` as a child process on PORT+1 (internal),
// then expose our own HTTP server on PORT that:
//   • proxies all HTTP requests to Next.js dev server
//   • intercepts /ws upgrades for our WS server
//   • proxies all other WS upgrades (HMR, _next/webpack-hmr) to Next
//
// This keeps Turbopack, HMR, and fast-refresh working normally.

async function startDev(wss: WebSocketServer) {
    const NEXT_PORT = PORT + 1;

    // Spawn next dev on internal port
    const turboFlag = USE_TURBO ? ["--turbo"] : [];
    const child = spawn(
        "npx",
        ["next", "dev", "--port", String(NEXT_PORT), ...turboFlag],
        {
            stdio: "inherit",
            shell: true,
            env: { ...process.env, PORT: String(NEXT_PORT) },
        }
    );

    child.on("error", (e) => console.error("[dev] child error:", e.message));
    const cleanup = () => { try { child.kill(); } catch { } };
    process.on("exit", cleanup);
    process.on("SIGINT", () => { cleanup(); process.exit(0); });
    process.on("SIGTERM", () => { cleanup(); process.exit(0); });

    // Wait until next dev is ready
    console.log(`[dev] waiting for next dev on :${NEXT_PORT}...`);
    await waitForPort(NEXT_PORT);
    console.log(`[dev] next dev is ready`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let proxy: any;
    try {
        const mod = await import("http-proxy");
        const httpProxy = mod.default ?? mod;
        proxy = httpProxy.createProxyServer({
            target: { host: "127.0.0.1", port: NEXT_PORT },
            ws: true,
            xfwd: true,
        });
        proxy.on("error", (e: Error, _req: IncomingMessage, res: ServerResponse | net.Socket) => {
            console.error("[proxy]", e.message);
            if (res instanceof ServerResponse) res.writeHead(502).end("Bad Gateway");
        });
    } catch {
        console.error(
            "\n[server.ts] http-proxy is required for dev mode.\n" +
            "  Run: npm install -D http-proxy @types/http-proxy\n"
        );
        process.exit(1);
    }

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
        proxy.web(req, res);
    });

    server.on(
        "upgrade",
        (req: IncomingMessage, socket: net.Socket, head: Buffer) => {
            const { pathname } = parse(req.url ?? "/");
            if (pathname === "/ws") {
                // Our WS server handles /ws
                wss.handleUpgrade(req, socket, head, (ws) =>
                    wss.emit("connection", ws, req)
                );
            } else {
                // HMR, webpack-hmr, etc. → proxy to next dev
                proxy.ws(req, socket, head);
            }
        }
    );

    server.listen(PORT, HOST, () => {
        console.log(
            `▲ Next.js ready (dev${USE_TURBO ? " + turbopack" : ""})`
        );
        console.log(`  http → http://localhost:${PORT}  (→ next dev :${NEXT_PORT})`);
        console.log(`  ws   → ws://localhost:${PORT}/ws`);
        console.log(`  hmr  → proxied to :${NEXT_PORT}`);
    });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function waitForPort(port: number, timeout = 60_000): Promise<void> {
    const deadline = Date.now() + timeout;
    return new Promise((resolve, reject) => {
        function attempt() {
            const sock = net.createConnection({ port, host: "127.0.0.1" });
            sock.once("connect", () => { sock.destroy(); resolve(); });
            sock.once("error", () => {
                sock.destroy();
                if (Date.now() >= deadline) {
                    reject(new Error(`Timed out waiting for :${port}`));
                    return;
                }
                setTimeout(attempt, 300);
            });
        }
        attempt();
    });
}

// ─── Entry ────────────────────────────────────────────────────────────────────

const wss = makeWss();
initWss(wss);

if (IS_DEV) {
    console.log(
        `[server.ts] dev — port ${PORT}${USE_TURBO ? " (turbopack)" : ""}`
    );
    startDev(wss).catch((e) => { console.error(e); process.exit(1); });
} else {
    console.log(`[server.ts] production — port ${PORT}`);
    startProd(wss).catch((e) => { console.error(e); process.exit(1); });
}