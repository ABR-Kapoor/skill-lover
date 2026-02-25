
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { NeuCard } from '@/components/ui/neu-card';
import { GlassPanel } from '@/components/ui/glass-panel';
import { CheckCircle2, Calendar, Map, ArrowRight } from 'lucide-react';
import { AuraButton } from '@/components/ui/aura-button';
import { cn } from '@/lib/utils';

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
}

export function SceneRoadmap({ progress, range }: SceneProps) {
  const [start, end] = range;
  
  // Transitions
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const x = useTransform(progress, [start, start + 0.1], [100, 0]); // Slide in from right
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const rotateY = useTransform(progress, [start, end], [15, 5]);
  
  // Internal animation for progress bar
  const progressBarWidth = useTransform(progress, [start, end], ['0%', '75%']);

  const display = useTransform(progress, (value) => 
    (value >= start && value <= end + 0.1) ? 'flex' : 'none'
  );

  return (
    <motion.div 
      style={{ opacity, display }}
      className="absolute inset-0 items-center justify-center pointer-events-none"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Description - Left Side */}
        <div className="space-y-8 lg:order-1 order-2 text-left pointer-events-auto z-10">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
             className="inline-flex items-center gap-2 text-primary font-medium"
           >
             <Map className="w-5 h-5" />
             <span>Step-by-Step Guidance</span>
           </motion.div>

           <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
             <span className="heading-gradient">AI-Generated</span> <br /> 
             Career Roadmaps
           </h2>
           
           <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
             Get a personalized, week-by-week plan tailored to your specific goals. 
             Whether you're starting from scratch or upskilling, our AI maps out the perfect route.
           </p>

           <div className="space-y-4">
               {[
                   'Personalized timelines based on your pace',
                   'Curated learning resources & projects',
                   ' real-time milestone tracking'
               ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-foreground/90">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                         <CheckCircle2 className="w-3.5 h-3.5" />
                       </div>
                       {item}
                   </div>
               ))}
           </div>

           <AuraButton size="lg" className="mt-4">
             Generate Your Roadmap <ArrowRight className="ml-2 w-4 h-4" />
           </AuraButton>
        </div>

        {/* 3D Visual - Right Side */}
        <motion.div 
            style={{ x, scale, rotateY }}
            className="lg:order-2 order-1 relative perspective-[1200px] flex justify-center"
        >
            <div className="relative w-full max-w-md">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-primary/20 blur-[80px] -z-10 rounded-full scale-75" />

                <NeuCard variant="lifted" className="w-full bg-surface-base dark:bg-[#161B28] p-1">
                    <div className="rounded-[calc(var(--radius)-4px)] overflow-hidden bg-surface-light dark:bg-[#1E2433]">
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-surface-base dark:bg-[#161B28]/50">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold">Full Stack Developer</h3>
                                    <p className="text-xs text-muted-foreground">Generated 2 mins ago</p>
                                </div>
                                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wide border border-primary/20">
                                  Intense Mode
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-muted-foreground">Overall Progress</span>
                                    <span className="text-primary">75%</span>
                                </div>
                                <div className="h-2 bg-surface-deep dark:bg-black/20 rounded-full overflow-hidden shadow-inner">
                                    <motion.div 
                                        style={{ width: progressBarWidth }}
                                        className="h-full bg-gradient-to-r from-primary to-purple-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Timeline List */}
                        <div className="p-4 space-y-3 bg-opacity-50">
                            {[1, 2, 3].map((week) => (
                                <GlassPanel key={week} variant="default" className="flex gap-4 items-center p-3 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className={cn(
                                      "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors",
                                      week === 1 ? "bg-primary text-white" : "bg-surface-base dark:bg-black/20 text-muted-foreground"
                                    )}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">Week {week}: Foundation</h4>
                                        <p className="text-[11px] text-muted-foreground">HTML, CSS, JavaScript Basics</p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-surface-shadow dark:border-white/10 flex items-center justify-center">
                                       {week === 1 && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                </GlassPanel>
                            ))}
                        </div>
                    </div>
                </NeuCard>

                {/* Floating Badge */}
                <motion.div 
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -left-6 bottom-12 z-20"
                >
                    <GlassPanel variant="dark" className="p-3 flex items-center gap-3 pr-5">
                       <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                          <CheckCircle2 className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-[10px] text-white/60 uppercase tracking-wider">Milestone</div>
                          <div className="text-sm font-bold">Frontend Mastery</div>
                       </div>
                    </GlassPanel>
                </motion.div>
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

