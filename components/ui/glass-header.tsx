'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from './button';
import { SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';


import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-7 rounded-full bg-white/5 border border-white/5" />; // Placeholder to avoid layout shift
  }

  return (
    <div 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-14 h-7 rounded-full bg-white/10 border border-white/5 cursor-pointer shadow-inner transition-colors hover:bg-white/20"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{ x: theme === "dark" ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
         {theme === "dark" ? (
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
         ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
         )}
      </motion.div>
    </div>
  );
}

// ... imports
// (Keeping imports same, removing UserButton usage)

export function GlassHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full border-b",
        scrolled 
          ? "bg-transparent backdrop-blur-xl border-white/10 py-3" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
         {/* Logo Section - Left Side */}
         <div className="flex items-center gap-3">
             <div className="relative w-10 h-10 drop-shadow-lg">
                <Image src="/goku.svg" alt="App Logo" fill className="object-contain" />
             </div>
             <span className="font-display font-bold text-2xl tracking-tight text-glow">
               Skill <span className="text-[#cb5c4f]">Lover</span>
             </span>
         </div>

         {/* Theme Toggle - Right Corner */}
         <div className="flex items-center gap-4">
             <ThemeToggle />
         </div>
      </div>
    </motion.header>
  );
}
