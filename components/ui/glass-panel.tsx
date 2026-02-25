import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'sidebar' | 'light';
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "bg-glass-primary border-glass-border shadow-[var(--glass-shadow)]",
      dark: "bg-glass-dark border-glass-border shadow-[var(--glass-shadow)] text-white",
      sidebar: "bg-glass-primary border-r border-glass-border backdrop-blur-xl",
      light: "bg-white/80 border-white/20 shadow-xl text-zinc-900 backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative backdrop-blur-[var(--glass-blur)] border rounded-2xl overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassPanel.displayName = 'GlassPanel';

export { GlassPanel };
