'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { BioluminescentGrid, Button } from '@chatspace/ui';
import { ChatMessage } from '@/lib/useWebSocket';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: ChatMessage[];
  username: string;
  connected: boolean;
  onSend: (text: string) => void;
}

export default function ChatWindow({ messages, username, connected, onSend }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <BioluminescentGrid>
          {messages.length === 0 && (
            <p className="text-center text-sm text-muted font-mono py-10">
              No messages yet — say something to get it started.
            </p>
          )}
          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} isOwn={m.username === username} />
          ))}
        </BioluminescentGrid>
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/10 bg-white/[0.02] backdrop-blur-md px-4 sm:px-6 py-4"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={connected ? 'Type a message...' : 'Connecting...'}
          disabled={!connected}
          className="flex-1 rounded-lg bg-white/5 border border-line px-4 py-3 text-ink placeholder:text-muted outline-none focus:border-plasma-purple/60 transition-colors disabled:opacity-50"
        />
        <Button type="submit" variant="primary" disabled={!connected || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
