'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LayoutGrid, Map, FileText, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassPanel } from './glass-panel';

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
  { icon: Map, label: 'Roadmaps', href: '/roadmaps' },
  { icon: FileText, label: 'Analysis', href: '/ats' },
  { icon: BookOpen, label: 'Resources', href: '/resources' },
];

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export function FloatingNav() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // If loading or not available yet, just render default
  if (!isLoaded) return null;

  return (
    <div className="fixed z-50 bottom-10 left-1/2 -translate-x-1/2 w-auto pointer-events-none">
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        drag
        dragConstraints={{ left: -200, right: 200, top: -600, bottom: 50 }}
        className="cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        <GlassPanel variant="dark" className="flex items-center gap-2 p-3 rounded-full border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/80 backdrop-blur-2xl ring-1 ring-white/5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            
            // Logic: If item is Dashboard and no user, hide it completely.
            if (item.label === 'Dashboard' && !user) return null;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center w-20 h-16 rounded-3xl transition-all duration-300 group overflow-hidden",
                  isActive 
                    ? "text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-1 ring-white/10" 
                    : "text-white/40 hover:text-white hover:bg-white/5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(255,255,255,0.05)] hover:ring-1 hover:ring-white/10"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_10px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <motion.div 
                  className="relative z-10 flex flex-col items-center gap-1.5"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                   {/* Special Logic for Dashboard Icon */}
                   {item.label === 'Dashboard' && user ? (
                      <div className={cn("relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-300", isActive ? "border-white shadow-[0_0_10px_rgba(255,255,255,0.4)]" : "border-white/20")}>
                        <Image src={user.imageUrl} alt="User" fill className="object-cover" />
                      </div>
                   ) : (
                      <item.icon className={cn("w-7 h-7 transition-all duration-300", isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "scale-100")} strokeWidth={isActive ? 2.5 : 2} />
                   )}

                   <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")}>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
          
           {/* Divider */}
           <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2" />

           {/* About Me Button - Using Goku Icon */}
           <a
             href="https://cv.kapoorabeer.me/"
             target="_blank"
             rel="noopener noreferrer"
             className="relative flex flex-col items-center justify-center w-20 h-16 rounded-3xl text-white/40 hover:text-white hover:bg-white/5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(255,255,255,0.05)] hover:ring-1 hover:ring-white/10 transition-all duration-300 group overflow-hidden"
           >
              <motion.div 
                className="relative z-10 flex flex-col items-center gap-1.5"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                 <div className="relative w-8 h-8 drop-shadow-md">
                    <Image src="/goku.svg" alt="About" fill className="object-contain" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity duration-300">About</span>
              </motion.div>
           </a>

        </GlassPanel>
      </motion.div>
    </div>
  );
}
