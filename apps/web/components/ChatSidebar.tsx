'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { getAvatarStyle, getInitials } from '@/lib/avatar';

interface ChatSidebarProps {
  roomId: string;
  onlineUsers: string[];
  currentUsername: string;
}

export default function ChatSidebar({ roomId, onlineUsers, currentUsername }: ChatSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <aside className="w-full sm:w-60 shrink-0 border-b sm:border-b-0 sm:border-r border-white/10 p-4 sm:p-5 flex sm:flex-col gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible">
      <div className="shrink-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">Room</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-[0.12em] bg-gradient-to-r from-plasma-purple to-plasma-cyan bg-clip-text text-transparent">
            {roomId}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy room code"
            className="p-1.5 rounded-md hover:bg-white/10 text-muted hover:text-ink transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-plasma-cyan" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="shrink-0 flex-1 sm:flex-none">
        <div className="flex items-center gap-2 mb-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Online</p>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-plasma-cyan/15 text-plasma-cyan">
            {onlineUsers.length}
          </span>
        </div>
        <div className="flex sm:flex-col gap-2">
          {onlineUsers.map(user => {
            const style = getAvatarStyle(user);
            const isYou = user === currentUsername;
            return (
              <div key={user} className="flex items-center gap-2 shrink-0">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full ring-1 text-[10px] font-semibold ${style.bg} ${style.text} ${style.ring}`}
                >
                  {getInitials(user)}
                </span>
                <span className="text-xs text-ink whitespace-nowrap">{isYou ? 'you' : user}</span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
