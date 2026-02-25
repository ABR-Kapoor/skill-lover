'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { NeuCard } from '@/components/ui/neu-card';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Target, AlertCircle, CheckCircle, FileText, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
}

export function SceneATS({ progress, range }: SceneProps) {
  const [start, end] = range;
  
  // Transitions
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + 0.2], [0.8, 1]); 
  const rotateY = useTransform(progress, [start, end], [-15, -5]);
  const rotateX = useTransform(progress, [start, end], [5, 0]);
  
  const score = useTransform(progress, [start, end], [0, 85]);
  const scoreDisplay = useTransform(score, (s) => Math.round(s));

  const display = useTransform(progress, (value) => 
    (value >= start && value <= end) ? 'flex' : 'none'
  );

  return (
    <motion.div 
      style={{ opacity, display }}
      className="absolute inset-0 items-center justify-center pointer-events-none"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         
         {/* 3D Resume Card */}
         <motion.div 
            style={{ scale, rotateY, rotateX }}
            className="relative lg:order-1 order-1 perspective-1000 flex justify-center"
         >
             {/* Background Glow */}
             <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 rounded-full scale-110 opacity-50" />

             {/* Main Card - Light Theme */}
             <NeuCard variant="lifted" className="w-full max-w-md bg-white/90 dark:bg-white/10 backdrop-blur-3xl border-white/40 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-full" />
                <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-primary" />
                                <h3 className="font-bold text-foreground text-lg">Resume_Final_v2.pdf</h3>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">Last analyzed 2 mins ago</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wide border border-green-500/20 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          Great Match
                        </span>
                    </div>

                    {/* Score Circle */}
                    <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                            {/* Background Circle */}
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-black/5 dark:text-white/5" />
                            {/* Progress Circle - Gradient defined in globals or inline if needed, simplified here */}
                            <motion.circle 
                                cx="96" cy="96" r="88" 
                                stroke="url(#scoreGradient)" 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray="553"
                                strokeDashoffset={useTransform(score, [0, 100], [553, 0])}
                                strokeLinecap="round"
                                className="drop-shadow-lg"
                            />
                            {/* Gradient Config */}
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <motion.span className="text-6xl font-bold font-display text-foreground tracking-tighter">
                                {scoreDisplay}
                             </motion.span>
                             <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">ATS Score</span>
                         </div>
                    </div>
                    
                    {/* Data Grid */}
                    <div className="grid grid-cols-2 gap-4">
                         <GlassPanel variant="light" className="p-4 rounded-xl border-blue-200/50 dark:border-white/10 bg-blue-50/50 dark:bg-white/5">
                             <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
                                 <AlertCircle className="h-4 w-4" />
                                 Missing Keywords
                             </div>
                             <div className="flex flex-wrap gap-1.5">
                                 {['React', 'Leadership', 'Agile'].map(keyword => (
                                     <span key={keyword} className="text-[10px] px-2 py-0.5 bg-white/60 dark:bg-black/20 rounded-md text-foreground/80 font-medium border border-black/5">
                                         {keyword}
                                     </span>
                                 ))}
                             </div>
                         </GlassPanel>

                         <GlassPanel variant="light" className="p-4 rounded-xl border-green-200/50 dark:border-white/10 bg-green-50/50 dark:bg-white/5">
                             <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-300 font-bold text-sm">
                                 <CheckCircle className="h-4 w-4" />
                                 Structure
                             </div>
                             <div className="space-y-1.5">
                                 <div className="flex justify-between items-center text-xs">
                                     <span className="text-muted-foreground">Headers</span>
                                     <CheckCircle className="w-3 h-3 text-green-500" />
                                 </div>
                                 <div className="flex justify-between items-center text-xs">
                                     <span className="text-muted-foreground">Contact Info</span>
                                     <CheckCircle className="w-3 h-3 text-green-500" />
                                 </div>
                                 <div className="flex justify-between items-center text-xs">
                                     <span className="text-muted-foreground">Chronology</span>
                                     <CheckCircle className="w-3 h-3 text-green-500" />
                                 </div>
                             </div>
                         </GlassPanel>
                    </div>
                </div>
             </NeuCard>

             {/* Floating Badge - New Data */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-12 top-8 z-20"
             >
                 <GlassPanel variant="light" className="p-5 flex flex-col gap-4 min-w-[200px] border-white/40 shadow-2xl">
                    <div className="flex items-center gap-3 border-b border-black/5 pb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
                           <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Market Analysis</div>
                           <div className="text-sm font-bold text-zinc-900 leading-none">High Demand</div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-500">Interview Rate</span>
                            <span className="font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-xs">+150%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-500">Est. Salary</span>
                            <span className="font-bold text-zinc-900">$120k - $150k</span>
                        </div>
                        <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-pink-500 w-[85%]" />
                        </div>
                    </div>
                 </GlassPanel>
             </motion.div>
         </motion.div>

         {/* Text Description */}
         <div className="lg:order-2 order-2 space-y-8 text-left pointer-events-auto">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20"
             >
                 <Sparkles className="h-4 w-4" />
                 Resume Optimizer
             </motion.div>
             
             <div>
                 <h2 className="text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
                     Beat the <span className="heading-gradient">Algorithms</span>
                 </h2>
                 <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                     Stop getting rejected by bots. Our AI scans your resume against job descriptions 
                     to ensure you pass the initial screening every time.
                 </p>
             </div>

             <div className="grid grid-cols-2 gap-8 pt-2">
                 <div className="group">
                     <h3 className="text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">2x</h3>
                     <p className="text-sm font-medium text-muted-foreground">More Interview Calls</p>
                 </div>
                 <div className="group">
                     <h3 className="text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Real-time</h3>
                     <p className="text-sm font-medium text-muted-foreground">Scoring & Feedback</p>
                 </div>
             </div>
         </div>

      </div>
    </motion.div>
  );
}
