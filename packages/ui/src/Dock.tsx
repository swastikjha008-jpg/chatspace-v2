'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from './utils';

export interface DockItem {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

interface DockProps {
  className?: string;
  items: DockItem[];
}

interface DockIconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        aria-label={label}
        className={cn(
          'relative group p-3 rounded-lg',
          'hover:bg-white/10 transition-colors',
          className
        )}
      >
        <Icon className="w-5 h-5 text-slate-100" />
        <span
          className={cn(
            'absolute -top-9 left-1/2 -translate-x-1/2',
            'px-2 py-1 rounded text-xs font-medium',
            'bg-black/80 text-slate-100 border border-white/10',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity whitespace-nowrap pointer-events-none'
          )}
        >
          {label}
        </span>
      </motion.button>
    );
  }
);
DockIconButton.displayName = 'DockIconButton';

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(({ items, className }, ref) => {
  return (
    <div ref={ref} className={cn('flex items-center justify-center', className)}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={floatingAnimation}
        className={cn(
          'flex items-center gap-1 p-2 rounded-2xl',
          'backdrop-blur-lg border shadow-lg',
          'bg-black/40 border-white/10',
          'hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] transition-shadow duration-300'
        )}
      >
        {items.map(item => (
          <DockIconButton key={item.label} {...item} />
        ))}
      </motion.div>
    </div>
  );
});
Dock.displayName = 'Dock';
