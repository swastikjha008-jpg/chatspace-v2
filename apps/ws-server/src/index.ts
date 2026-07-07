import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

const PORT = Number(process.env.PORT) || 8080;

interface RoomClient {
  socket: WebSocket;
  username: string;
}

// roomId -> set of connected clients
const rooms = new Map<string, Set<RoomClient>>();

function getQueryParams(req: IncomingMessage) {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  return {
    roomId: url.searchParams.get('roomId') || 'lobby',
    username: url.searchParams.get('username') || 'Anonymous',
  };
}

function broadcast(roomId: string, payload: object) {
  const clients = rooms.get(roomId);
  if (!clients) return;

  const message = JSON.stringify(payload);
  clients.forEach(client => {
    if (client.socket.readyState === WebSocket.OPEN) {
      client.socket.send(message);
    }
  });
}

function broadcastPresence(roomId: string) {
  const clients = rooms.get(roomId);
  const users = clients ? Array.from(clients).map(c => c.username) : [];
  broadcast(roomId, { type: 'presence', users, ts: Date.now() });
}

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {
  const { roomId, username } = getQueryParams(req);

  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  const client: RoomClient = { socket, username };
  rooms.get(roomId)!.add(client);

  broadcast(roomId, { type: 'system', username: 'system', text: `${username} joined the room`, ts: Date.now() });
  broadcastPresence(roomId);

  socket.on('message', data => {
    let text: string;
    try {
      const parsed = JSON.parse(data.toString());
      text = typeof parsed.text === 'string' ? parsed.text : '';
    } catch {
      text = data.toString();
    }
    if (!text.trim()) return;

    broadcast(roomId, { type: 'chat', username, text, ts: Date.now() });
  });

  socket.on('close', () => {
    rooms.get(roomId)?.delete(client);
    broadcast(roomId, { type: 'system', username: 'system', text: `${username} left the room`, ts: Date.now() });
    broadcastPresence(roomId);
    if (rooms.get(roomId)?.size === 0) {
      rooms.delete(roomId);
    }
  });

  socket.on('error', err => {
    console.error(`[ws-server] socket error in room ${roomId}:`, err.message);
  });
});

console.log(`[ws-server] listening on ws://localhost:${PORT}`);
