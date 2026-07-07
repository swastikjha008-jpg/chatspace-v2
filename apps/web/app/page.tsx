'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Home, Github, Info } from 'lucide-react';
import { Dock } from '@chatspace/ui';
import JoinForm from '@/components/JoinForm';

const PlasmaWave = dynamic(() => import('@chatspace/ui').then(m => m.PlasmaWave), { ssr: false });

export default function Home_() {
  const dockItems = useMemo(
    () => [
      { icon: Home, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      { icon: Info, label: 'About', onClick: () => alert('A small real-time chat demo — Next.js + WebSockets + Turborepo.') },
      { icon: Github, label: 'GitHub', onClick: () => window.open('https://github.com', '_blank') },
    ],
    []
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 opacity-70">
        <PlasmaWave colors={['#A855F7', '#06B6D4']} speed1={0.05} speed2={0.05} bend1={1} bend2={0.5} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-base/60 to-base" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-plasma-cyan mb-4">
          real-time · rooms · no signup
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold text-ink mb-4 bg-gradient-to-r from-plasma-purple to-plasma-cyan bg-clip-text text-transparent">
          ChatSpace
        </h1>
        <p className="text-muted mb-10">
          You get a room code instantly — share it, or paste someone else&apos;s to join them. No accounts, no history.
        </p>
        <JoinForm />
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-20">
        <Dock items={dockItems} />
      </div>
    </main>
  );
}
