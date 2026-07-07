'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface ChatMessage {
  type: 'chat' | 'system';
  username: string;
  text: string;
  ts: number;
}

interface PresenceMessage {
  type: 'presence';
  users: string[];
  ts: number;
}

type IncomingMessage = ChatMessage | PresenceMessage;

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

export function useWebSocket(roomId: string, username: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId || !username) return;

    const socket = new WebSocket(
      `${WS_URL}?roomId=${encodeURIComponent(roomId)}&username=${encodeURIComponent(username)}`
    );
    socketRef.current = socket;

    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);

    socket.onmessage = event => {
      try {
        const data: IncomingMessage = JSON.parse(event.data);
        if (data.type === 'presence') {
          setOnlineUsers(data.users);
        } else {
          setMessages(prev => [...prev, data]);
        }
      } catch {
        // ignore malformed payloads
      }
    };

    return () => {
      socket.close();
    };
  }, [roomId, username]);

  const sendMessage = useCallback((text: string) => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN && text.trim()) {
      socket.send(JSON.stringify({ text }));
    }
  }, []);

  return { messages, onlineUsers, connected, sendMessage };
}
