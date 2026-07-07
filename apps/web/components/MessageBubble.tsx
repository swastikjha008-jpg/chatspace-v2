'use client';

import { CSSProperties } from 'react';
import { BioluminescentGridItem } from '@chatspace/ui';
import { ChatMessage } from '@/lib/useWebSocket';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  if (message.type === 'system') {
    return <div className="text-center text-xs text-muted font-mono py-1">{message.text}</div>;
  }

  const ownStyle: CSSProperties = {
    background: 'rgba(6, 182, 212, 0.10)',
    borderColor: 'rgba(6, 182, 212, 0.35)',
  };
  const otherStyle: CSSProperties = {
    background: 'rgba(168, 85, 247, 0.10)',
    borderColor: 'rgba(168, 85, 247, 0.35)',
  };

  return (
    <BioluminescentGridItem
      className={isOwn ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'}
      style={isOwn ? ownStyle : otherStyle}
    >
      <div className="flex items-baseline gap-2 mb-1">
        <span className={`text-xs font-semibold ${isOwn ? 'text-plasma-cyan' : 'text-plasma-purple'}`}>
          {isOwn ? 'You' : message.username}
        </span>
        <span className="text-[10px] text-muted font-mono">
          {new Date(message.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p className="text-sm text-ink leading-relaxed break-words">{message.text}</p>
    </BioluminescentGridItem>
  );
}
