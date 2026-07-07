'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useWebSocket } from '@/lib/useWebSocket';
import ChatWindow from '@/components/ChatWindow';
import ChatSidebar from '@/components/ChatSidebar';

const PlasmaWave = dynamic(() => import('@chatspace/ui').then(m => m.PlasmaWave), { ssr: false });

export default function ChatRoomPage() {
  const params = useParams<{ roomId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = decodeURIComponent(params.roomId).toUpperCase();
  const username = searchParams.get('username') || 'Anonymous';

  const { messages, onlineUsers, connected, sendMessage } = useWebSocket(roomId, username);

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 opacity-40">
        <PlasmaWave colors={['#A855F7', '#06B6D4']} speed1={0.03} speed2={0.03} bend1={0.6} bend2={0.4} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-base/30 via-base/70 to-base" />

      <div className="relative z-10 w-full max-w-4xl h-[85vh] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_0_60px_-16px_rgba(168,85,247,0.35)] flex flex-col sm:flex-row overflow-hidden">
        <ChatSidebar roomId={roomId} onlineUsers={onlineUsers} currentUsername={username} />

        <section className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-plasma-cyan' : 'bg-red-400'}`} />
              <span className="text-xs font-mono text-muted">{connected ? 'connected' : 'connecting...'}</span>
            </div>
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Leave
            </button>
          </header>

          <div className="flex-1 min-h-0">
            <ChatWindow messages={messages} username={username} connected={connected} onSend={sendMessage} />
          </div>
        </section>
      </div>
    </main>
  );
}
