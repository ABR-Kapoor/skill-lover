'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface NeuInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startIcon?: React.ReactNode;
}

const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, type, label, startIcon, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="relative group my-4">
        <div 
          className={cn(
            "flex h-12 w-full rounded-2xl border-none bg-surface-deep px-4 py-2 text-sm shadow-[var(--neu-inset-sm)] transition-all",
            "focus-within:shadow-[var(--neu-inset-md)] focus-within:ring-2 focus-within:ring-primary/20",
            className
          )}
        >
          {startIcon && (
            <div className="mr-3 flex items-center justify-center text-muted-foreground group-focus-within:text-primary">
              {startIcon}
            </div>
          )}
          <input
            {...props}
            type={type}
            ref={ref}
            className="flex-1 bg-transparent border-none outline-none placeholder:text-transparent text-foreground autofill:bg-transparent"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        
        {label && (
          <label
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none text-muted-foreground",
              (isFocused || hasValue || props.value) 
                ? "-top-6 text-xs text-primary font-medium" 
                : "top-3 text-sm"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
NeuInput.displayName = 'NeuInput';

export { NeuInput };
