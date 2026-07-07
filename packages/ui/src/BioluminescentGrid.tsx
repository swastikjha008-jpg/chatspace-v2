'use client';

import React, { useEffect, useRef, forwardRef, ReactNode } from 'react';

interface BioluminescentGridItemProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const BioluminescentGridItem = forwardRef<HTMLDivElement, BioluminescentGridItemProps>(
  ({ className, style, children }, ref) => {
    const itemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const item = itemRef.current;
      if (!item) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
      };

      item.addEventListener('mousemove', handleMouseMove);
      return () => {
        item.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    return (
      <div
        ref={node => {
          itemRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        style={style}
        className={`bio-item ${className || ''}`.trim()}
      >
        <div className="bio-item-content">{children}</div>
      </div>
    );
  }
);
BioluminescentGridItem.displayName = 'BioluminescentGridItem';

interface BioluminescentGridProps {
  className?: string;
  children?: ReactNode;
}

export const BioluminescentGrid = forwardRef<HTMLDivElement, BioluminescentGridProps>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={`bio-grid ${className || ''}`.trim()}>
        {children}
      </div>
    );
  }
);
BioluminescentGrid.displayName = 'BioluminescentGrid';
