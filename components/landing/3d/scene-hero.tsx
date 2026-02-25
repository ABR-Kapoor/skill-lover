'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeuCard } from '@/components/ui/neu-card';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
}

export function SceneHero({ progress, range }: SceneProps) {
  // Map global scroll progress to local scene progress (0 to 1)
  const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1]], [1, 1, 0]);
  const scale = useTransform(progress, [range[0], range[1]], [1, 1.2]);
  const y = useTransform(progress, [range[0], range[1]], [0, -100]);
  
  // Dashboard mock rotation
  const rotateY = useTransform(progress, [range[0], range[1]], [8, 0]);
  const translateX = useTransform(progress, [range[0], range[1]], [0, -50]);

  // Ensure scene is visible only during its range
  const display = useTransform(progress, (value) => 
    (value >= range[0] && value <= range[1] + 0.1) ? 'flex' : 'none'
  );

  return (
    <motion.div 
      style={{ opacity, display }}
      className="absolute inset-0 items-center justify-center pointer-events-none"
    >
      {/* Cinematic Background - Subtle Warm Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,220,200,0.05),transparent_70%)] z-0" />
      
      <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        {/* Text Content */}
        <motion.div 
            style={{ y }} 
            className="space-y-8 text-left pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Planning
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
             Build Your <br />
            <span className="text-primary">
              Career Roadmap
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
            Generate personalized career roadmaps and optimize your resume with AI. 
            From student to professional, we've got your journey covered.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-12 shadow-[0_0_20px_rgba(232,220,200,0.15)] transition-all">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 h-12 border-white/10 hover:bg-white/5 hover:text-white">
                See How It Works
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* 3D Dashboard Mockup */}
        <motion.div 
            style={{ rotateY, translateX, scale }}
            className="hidden lg:block relative perspective-1000"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] -z-10 rounded-full scale-90" />

          {/* Main Interface - Light Theme */}
          <NeuCard variant="lifted" className="w-full aspect-square bg-white/80 dark:bg-white/5 backdrop-blur-2xl border-white/40 shadow-2xl p-2">
             <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-50/50 to-white/50 dark:from-white/5 dark:to-transparent border border-white/20 overflow-hidden relative">
                 {/* Mock UI Header */}
                 <div className="h-12 border-b border-indigo-100/50 dark:border-white/5 flex items-center px-4 gap-3">
                     <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                     </div>
                     <div className="h-5 w-32 bg-indigo-100/50 dark:bg-white/10 rounded-full ml-4" />
                 </div>

                 {/* Mock UI Body */}
                 <div className="p-6 space-y-6">
                     <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                           <Sparkles className="w-8 h-8" />
                        </div>
                        <div className="space-y-2 flex-1">
                            <div className="h-4 w-1/3 bg-indigo-900/10 dark:bg-white/20 rounded-lg" />
                            <div className="h-3 w-1/2 bg-indigo-900/5 dark:bg-white/10 rounded-lg" />
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-3">
                         {[1, 2, 3].map((i) => (
                             <div key={i} className="h-24 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 shadow-sm" />
                         ))}
                     </div>

                     <div className="space-y-3 pt-2">
                         <div className="h-2 w-full bg-indigo-100/50 dark:bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500" />
                         </div>
                         <div className="h-2 w-full bg-indigo-100/50 dark:bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500" />
                         </div>
                     </div>
                 </div>
             </div>
          </NeuCard>

          {/* Floating Data Card */}
          <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -right-12 top-20 z-20"
          >
              <div className="p-5 flex flex-col gap-4 min-w-[220px] bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl">
                 <div className="flex items-center gap-3 border-b border-indigo-50 pb-3">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <Sparkles className="w-5 h-5" />
                     </div>
                     <div>
                        <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Career Velocity</div>
                        <div className="text-lg font-bold text-indigo-950 leading-none">Accelerating</div>
                     </div>
                 </div>
                 
                 <div className="space-y-3">
                     <div className="flex justify-between items-center text-sm">
                         <span className="text-zinc-500 font-medium">Skills Acquired</span>
                         <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md text-xs">+12 New</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                         <span className="text-zinc-500 font-medium">Goal Progress</span>
                         <span className="font-bold text-zinc-900">85%</span>
                     </div>
                     <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                         <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-[85%]" />
                     </div>
                 </div>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
