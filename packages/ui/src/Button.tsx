'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from './utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const variants: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-[#A855F7] to-[#06B6D4] text-white shadow-[0_0_24px_-6px_rgba(168,85,247,0.7)] hover:shadow-[0_0_32px_-4px_rgba(6,182,212,0.8)]',
  secondary:
    'bg-white/5 text-slate-100 border border-white/10 hover:border-[#A855F7]/60 hover:bg-white/10',
  ghost: 'bg-transparent text-slate-300 hover:text-white underline underline-offset-4',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5',
          'text-sm font-semibold transition-all duration-200',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
