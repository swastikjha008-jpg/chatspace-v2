# ChatSpace

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-Realtime-22c55e?style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A realtime, room-based chat app — the v2 rebuild of my earlier [Simple Chat App](https://github.com/swastikjha008-jpg/Simple-chat-app),
this time as a proper Turborepo monorepo with a Next.js frontend, a standalone WebSocket
server, and a shared UI package. Same idea, cleaner architecture, nicer face.

Create a room, share the code, chat instantly with anyone who joins it.

## Live Flow

```text
Land on site -> auto-generated room code -> copy & share (or paste a friend's code)
-> enter name -> join room -> realtime chat, live online list
```

## Features

- Random room code generated the moment you land on the site
- Regenerate (`↻`) a new code, or paste a friend's code to join their room instead
- Realtime chat over WebSockets, scoped per room
- Live online users list per room, with colored initials avatars
- Own messages vs. others' messages are visually distinct (cyan vs. purple)
- Glassmorphic chat card, WebGL plasma background visible through it
- Copy room code button, one-click leave
- Responsive: sidebar becomes a top bar on mobile
- Two independently deployable services (frontend + WS server)

## Tech Stack

| Part          | Tech                                   |
| ------------- | --------------------------------------- |
| Frontend      | Next.js 14 (App Router) + TypeScript    |
| Styling       | Tailwind CSS + Framer Motion            |
| Realtime      | WebSocket (`ws`), room-based broadcast  |
| Background    | WebGL plasma shader (`ogl`)             |
| Monorepo      | Turborepo                               |
| Deploy        | Render (both services) or Vercel (web)  |

## Project Structure

```text
.
├── apps/
│   ├── web/                 — Next.js frontend
│   │   ├── app/
│   │   │   ├── page.tsx             — landing / join screen
│   │   │   └── chat/[roomId]/       — chat room
│   │   ├── components/              — JoinForm, ChatWindow, ChatSidebar, MessageBubble
│   │   └── lib/                     — useWebSocket hook, room code + avatar helpers
│   └── ws-server/           — standalone WebSocket server
│       └── src/index.ts             — room + presence broadcast logic
├── packages/
│   └── ui/                  — shared design-system components
│       ├── PlasmaWave.tsx           — WebGL background
│       ├── Dock.tsx                 — floating pill navbar
│       ├── BioluminescentGrid.tsx   — cursor-glow message container
│       └── Button.tsx
├── turbo.json
├── package.json
└── README.md
```

## Run Locally

Install dependencies from the repo root:

```bash
npm install
```

Start everything (frontend + WS server together, via Turborepo):

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The WebSocket server runs alongside it on `ws://localhost:8080` — no separate terminal
needed, Turborepo runs both `dev` scripts concurrently.

## How To Use

1. Land on the site — a room code is already generated for you.
2. Enter your name.
3. Copy the code and send it to a friend, or paste theirs into the second field to join them.
4. Click **Enter chat**.
5. Start chatting in realtime — you'll both show up in the Online list.

## Deploy

This needs two separate services, since a WebSocket server can't run on a static host.

**`apps/web`** → Vercel or Render, as a standard Next.js app:

```text
Build Command: npm install && npm run build
Start Command: npm run start
```

**`apps/ws-server`** → Render, as a Node Web Service:

```text
Build Command: npm install && npm run build
Start Command: npm run start
```

Once `ws-server` has a live URL, set this in `apps/web`'s environment (use `wss://`, not
`ws://`, once it's on a real domain):

```text
NEXT_PUBLIC_WS_URL=wss://your-ws-server-domain.com
```

## Git Commands

```bash
git add .
git commit -m "ChatSpace v2 — Turborepo, glassmorphic UI, presence tracking"
git push origin main
```

Do not commit:

```text
node_modules/
.next/
dist/
.turbo/
*.tsbuildinfo
```

(all already handled by `.gitignore`)

## Scripts

| Command         | Description                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Runs `web` + `ws-server` together (Turborepo)  |
| `npm run build` | Builds both apps for production                |
| `npm run lint`  | Lints all workspaces                            |

## Notes

- No accounts, no database — refresh the `ws-server` and room history is gone. That's intentional.
- Both people must use the exact same room code to land in the same room.
- If the chat says "connecting..." and never resolves, check that `ws-server` is actually running and that `NEXT_PUBLIC_WS_URL` points at it correctly.

## v1

The original React + Vite + plain WebSocket version is still up here:
[Simple Chat App](https://github.com/swastikjha008-jpg/Simple-chat-app)
