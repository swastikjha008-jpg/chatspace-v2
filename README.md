# ChatSpace 💬

A small, real-time chat app — rooms, no accounts, no database. Built to practice a
Turborepo monorepo setup: a Next.js frontend talking to a standalone WebSocket server,
sharing a small design-system package between them.

Not trying to be a real product — just a clean example of the pattern.

## What's inside

```
chatspace/
  apps/
    web/         — Next.js 14 (App Router) frontend
    ws-server/   — standalone WebSocket server (rooms + broadcast)
  packages/
    ui/          — shared components used by web
```

### `packages/ui`

Each component lives in its own file:

- `PlasmaWave.tsx` — the animated WebGL background (built with `ogl`)
- `Dock.tsx` — the floating pill navbar
- `BioluminescentGrid.tsx` — message container with a cursor-tracking glow
- `Button.tsx` — shared button, colors synced to the PlasmaWave purple/cyan palette
- `utils.ts` — the `cn()` class-merge helper

### `apps/web`

- `/` — enter a name + room ID, join instantly
- `/chat/[roomId]` — the chat room itself, connects to `ws-server` over a WebSocket
- `components/` — chat-specific pieces (`ChatWindow`, `MessageBubble`, `JoinForm`) that
  are built on top of `packages/ui`, but aren't generic enough to belong there
- `lib/useWebSocket.ts` — the hook that owns the socket connection and message state

### `apps/ws-server`

Minimal `ws`-based server. Tracks connected clients per room in memory and broadcasts
any message to everyone else in that room. No persistence — refresh the server and
history is gone. That's intentional; this is meant to be the simple version.

## Running it locally

From the repo root:

```bash
npm install
npm run dev
```

This starts both apps together via Turborepo:
- `web` on http://localhost:3000
- `ws-server` on ws://localhost:8080

Open two browser tabs, join the same room ID with different names, and chat.

## Environment variables

`apps/web` reads `NEXT_PUBLIC_WS_URL` to know where the WebSocket server lives. Locally
it defaults to `ws://localhost:8080`, so no `.env` file is required for local dev.

For deployment, create `apps/web/.env.local` (or set it in your hosting provider):

```
NEXT_PUBLIC_WS_URL=wss://your-ws-server-domain.com
```

## Deploying

These are two separate deployable services:

- **`apps/web`** → deploy to Vercel or Render as a standard Next.js app
  (build: `npm install && npm run build`, start: `npm run start`)
- **`apps/ws-server`** → deploy to Render as a Node web service
  (build: `npm install && npm run build`, start: `npm run start`)

Once `ws-server` is deployed, update `NEXT_PUBLIC_WS_URL` in `web`'s environment to point
at it (use `wss://`, not `ws://`, once it's on a real domain with HTTPS).

## Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · `ws` · `ogl` · Turborepo

## License

MIT
