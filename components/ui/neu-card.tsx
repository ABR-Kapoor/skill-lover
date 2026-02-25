'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface NeuCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: 'flat' | 'lifted' | 'inset';
  className?: string;
  noTilt?: boolean;
}

const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  ({ children, variant = 'flat', className, noTilt = false, ...props }, ref) => {
    
    // Base classes for the card feel
    const baseClasses = `
      relative overflow-hidden rounded-[var(--radius)]
      bg-surface-base dark:bg-card
      transition-all duration-300 ease-out
    `;

    // Variant shadows
    const variantClasses = {
      flat: 'shadow-[var(--neu-sm)] dark:shadow-[var(--neu-md)]',
      lifted: 'shadow-[var(--neu-lifted)] z-10',
      inset: 'shadow-[var(--neu-inset-md)] bg-surface-deep',
    };

    // Glare overlay - absolute positioned
    const Glare = () => (
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'max(var(--tilt-intensity, 0), var(--hover-opacity, 0))',
          background: `
            radial-gradient(
              800px circle at var(--cursor-x) var(--cursor-y), 
              rgba(255,255,255,0.06),
              transparent 40%
            ),
            radial-gradient(
              circle at var(--glare-x, 50%) var(--glare-y, 50%), 
              rgba(255,255,255,0.15) 0%, 
              transparent 80%
            )
          `
        }} 
      />
    );

    // Border highlight
    const Border = () => (
        <div className="pointer-events-none absolute inset-0 rounded-[var(--radius)] ring-1 ring-inset ring-white/10 dark:ring-white/5" />
    )

    return (
      <motion.div
        ref={ref}
        data-neu-card={!noTilt ? "" : undefined}
        className={cn(baseClasses, variantClasses[variant], "group hover:[--hover-opacity:1]", className)}
        suppressHydrationWarning
        {...props}
      >
        <Glare />
        <Border />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);
NeuCard.displayName = 'NeuCard';

export { NeuCard };
