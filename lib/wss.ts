/**
 * lib/wss.ts — WebSocketServer singleton
 *
 * The WS server is created in server.ts (outside Next.js) and registered
 * here via initWss(). Next.js server code (Route Handlers, Server Actions)
 * can then call getWss() to access it.
 *
 * ⚠️  Only works in production (same Node.js process as server.ts).
 *     In dev, Next.js runs as a child process so global.__wss is not shared.
 *     Gate any getWss() calls with IS_DEV checks or use it only in prod paths.
 */

import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WssClient = WebSocket;

export type BroadcastFilter = (client: WssClient) => boolean;

// ─── Global singleton ─────────────────────────────────────────────────────────

declare global {
    // eslint-disable-next-line no-var
    var __wss: WebSocketServer | undefined;
}

// ─── Init (called once from server.ts) ───────────────────────────────────────

export function initWss(wss: WebSocketServer): void {
    global.__wss = wss;
}

// ─── Accessor ─────────────────────────────────────────────────────────────────

export function getWss(): WebSocketServer {
    if (!global.__wss) {
        throw new Error(
            "[wss] WebSocketServer not initialized. " +
            "getWss() can only be called in production (same process as server.ts). " +
            "In dev, Next.js runs in a child process and does not share global.__wss."
        );
    }
    return global.__wss;
}

export function isWssReady(): boolean {
    return !!global.__wss;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const OPEN = 1; // WebSocket.OPEN

/**
 * Broadcast a JSON-serialisable payload to all connected clients,
 * with an optional filter function.
 *
 * @example
 * broadcast({ type: "notify", message: "hello" });
 * broadcast({ type: "reload" }, (c) => c !== senderSocket);
 */
export function broadcast(
    payload: unknown,
    filter?: BroadcastFilter
): void {
    const wss = getWss();
    const data = JSON.stringify(payload);

    wss.clients.forEach((client) => {
        if (client.readyState !== OPEN) return;
        if (filter && !filter(client)) return;
        client.send(data);
    });
}

/**
 * Send a JSON-serialisable payload to a single client.
 */
export function sendTo(client: WssClient, payload: unknown): void {
    if (client.readyState === OPEN) {
        client.send(JSON.stringify(payload));
    }
}

/**
 * Returns the number of currently connected clients.
 */
export function clientCount(): number {
    return global.__wss?.clients.size ?? 0;
}