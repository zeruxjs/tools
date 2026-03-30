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
 * Internal next dev port in dev mode:
 *   NEXT_DEV_PORT env var, or PORT+1 as fallback.
 *   It is force-freed on every startup so stale processes never block.
 *
 * Dev:  NODE_ENV=development tsx server.ts [--turbo] [-p PORT]
 * Prod: NODE_ENV=production  tsx server.ts [-p PORT]
 */

import { createServer, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import type { IncomingMessage } from "http";
import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { spawn, execSync } from "child_process";
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

// Internal port for next dev child process (never public)
const NEXT_DEV_PORT = process.env.NEXT_DEV_PORT
    ? parseInt(process.env.NEXT_DEV_PORT, 10)
    : PORT + 1;

// ─── Force-free a port (kill all PIDs using it) ───────────────────────────────

function forceKillPort(port: number): void {
    try {
        // fuser -k kills all processes using the port immediately (synchronous)
        execSync(`fuser -k ${port}/tcp`, { stdio: "ignore" });
        console.log(`[server.ts] cleared port ${port}`);
    } catch {
        // fuser exits non-zero if no process was using the port — that's fine
    }
}

// ─── Safe base URL from an incoming request ───────────────────────────────────
// req.headers.host already contains the port (e.g. "localhost:10195").
// Appending :PORT again would produce "http://localhost:10195:10195" which
// is an invalid URL. This helper returns a correct base in all cases.

function reqBase(req: IncomingMessage): string {
    const host = req.headers.host;
    return host ? `http://${host}` : `http://${HOST}:${PORT}`;
}

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
        const url = new URL(req.url ?? "/", reqBase(req));
        handle(req, res, {
            query: Object.fromEntries(url.searchParams),
            pathname: url.pathname,
            search: url.search,
            href: url.href,
        } as unknown as UrlWithParsedQuery);
    });

    server.on("upgrade", (req: IncomingMessage, socket: net.Socket, head: Buffer) => {
        const url = new URL(req.url ?? "/", reqBase(req));
        if (url.pathname === "/ws") {
            wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req));
        } else {
            socket.destroy();
        }
    });

    server.listen(PORT, HOST, () => {
        console.log(`▲ Next.js ready (production)`);
        console.log(`  http → http://localhost:${PORT}`);
        console.log(`  ws   → ws://localhost:${PORT}/ws`);
    });
}

// ─── Development ──────────────────────────────────────────────────────────────

async function startDev(wss: WebSocketServer) {
    // Always force-free the internal port before spawning next dev.
    // This handles: tsx watch restarts, Ctrl+C that didn't propagate, stale PIDs.
    forceKillPort(NEXT_DEV_PORT);

    // Small delay to let OS release the port after fuser kill
    await sleep(400);

    const turboFlag = USE_TURBO ? ["--turbo"] : [];
    const child = spawn(
        `npx next dev --port ${NEXT_DEV_PORT} ${turboFlag.join(" ")}`,
        [],
        {
            stdio: "inherit",
            shell: true,
            env: { ...process.env, PORT: String(NEXT_DEV_PORT) },
        }
    );

    child.on("error", (e) => console.error("[dev] child error:", e.message));

    let cleanedUp = false;
    const cleanup = () => {
        if (cleanedUp) return;
        cleanedUp = true;
        forceKillPort(NEXT_DEV_PORT); // kill by port, not just by child PID
        try { child.kill("SIGKILL"); } catch { /* already dead */ }
    };

    process.on("exit", cleanup);
    process.on("SIGINT", () => { cleanup(); process.exit(0); });
    process.on("SIGTERM", () => { cleanup(); process.exit(0); });

    console.log(`[dev] waiting for next dev on :${NEXT_DEV_PORT}...`);
    await waitForPort(NEXT_DEV_PORT);
    console.log(`[dev] next dev is ready`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let proxy: any;
    try {
        const mod = await import("http-proxy");
        const httpProxy = mod.default ?? mod;
        proxy = httpProxy.createProxyServer({
            target: { host: "127.0.0.1", port: NEXT_DEV_PORT },
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

    server.on("upgrade", (req: IncomingMessage, socket: net.Socket, head: Buffer) => {
        const url = new URL(req.url ?? "/", reqBase(req));
        if (url.pathname === "/ws") {
            wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req));
        } else {
            proxy.ws(req, socket, head);
        }
    });

    server.listen(PORT, HOST, () => {
        console.log(`▲ Next.js ready (dev${USE_TURBO ? " + turbopack" : ""})`);
        console.log(`  http → http://localhost:${PORT}  (→ next dev :${NEXT_DEV_PORT})`);
        console.log(`  ws   → ws://localhost:${PORT}/ws`);
        console.log(`  hmr  → proxied to :${NEXT_DEV_PORT}`);
    });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

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
    console.log(`[server.ts] dev — port ${PORT}${USE_TURBO ? " (turbopack)" : ""}`);
    startDev(wss).catch((e) => { console.error(e); process.exit(1); });
} else {
    console.log(`[server.ts] production — port ${PORT}`);
    startProd(wss).catch((e) => { console.error(e); process.exit(1); });
}