'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@chatspace/ui';
import { generateRoomId } from '@/lib/generateRoomId';

export default function JoinForm() {
  const router = useRouter();
  const [myRoomId, setMyRoomId] = useState(() => generateRoomId());
  const [username, setUsername] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(myRoomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    const finalRoomId = joinRoomId.trim() || myRoomId;
    const params = new URLSearchParams({ username: username.trim() });
    router.push(`/chat/${encodeURIComponent(finalRoomId)}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
      <div className="rounded-xl border border-line bg-white/5 backdrop-blur-md px-4 py-3.5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">Your room code</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-bold tracking-[0.15em] bg-gradient-to-r from-plasma-purple to-plasma-cyan bg-clip-text text-transparent">
            {myRoomId}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy room code"
              className="p-2 rounded-md hover:bg-white/10 text-muted hover:text-ink transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-plasma-cyan" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMyRoomId(generateRoomId())}
              aria-label="Generate a new room code"
              className="p-2 rounded-md hover:bg-white/10 text-muted hover:text-ink transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-muted">Share this code so someone else can join you.</p>
      </div>

      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Your name"
        className="w-full rounded-lg bg-white/5 border border-line px-4 py-3 text-ink placeholder:text-muted outline-none focus:border-plasma-purple/60 transition-colors"
      />
      <input
        value={joinRoomId}
        onChange={e => setJoinRoomId(e.target.value.toUpperCase())}
        placeholder="Joining someone else? Paste their code here"
        className="w-full rounded-lg bg-white/5 border border-line px-4 py-3 text-ink placeholder:text-muted outline-none focus:border-plasma-cyan/60 transition-colors font-mono tracking-wider"
      />

      <Button type="submit" variant="primary" className="w-full mt-1">
        Enter chat
      </Button>
    </form>
  );
}
