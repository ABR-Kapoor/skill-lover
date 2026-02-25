'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { NeuCard } from '@/components/ui/neu-card';
import { GlassPanel } from '@/components/ui/glass-panel';
import { AuraButton } from '@/components/ui/aura-button';
import { IndianRupee, History, Check, Zap } from 'lucide-react';

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
}

export function SceneCredits({ progress, range }: SceneProps) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start+0.2], [0.9, 1]);
  const rotateX = useTransform(progress, [start, end], [10, 0]);
  
  const display = useTransform(progress, (value) => 
    (value >= start && value <= end) ? 'flex' : 'none'
  );

  return (
    <motion.div 
      style={{ opacity, display }}
      className="absolute inset-0 items-center justify-center pointer-events-none"
    >
      <div className="container mx-auto px-4 text-center space-y-12 z-10">
         
         <div className="space-y-4 pointer-events-auto">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-border bg-glass-primary text-sm font-medium text-primary shadow-[var(--glass-shadow)] mx-auto">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Simple, Transparent Pricing</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
               Pay as you <span className="heading-gradient">Grow</span>
             </h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                 Start with 2 free credits. No hidden fees. No subscription traps.
             </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-center pointer-events-auto">
             
             {/* Pricing Card */}
             <motion.div style={{ scale, rotateX }} className="perspective-[1000px]">
                 <NeuCard variant="lifted" className="relative p-1 bg-gradient-to-br from-primary/20 via-surface-base to-surface-base dark:from-primary/10 dark:via-[#161B28] dark:to-[#161B28]">
                     <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                     <div className="rounded-[calc(var(--radius)-4px)] bg-surface-light dark:bg-[#1E2433] overflow-hidden p-8 text-left h-full">
                         
                         <div className="flex justify-between items-start mb-6">
                             <div>
                                 <h3 className="text-lg font-bold">Standard Pack</h3>
                                 <p className="text-xs text-muted-foreground">Perfect for job seekers</p>
                             </div>
                             <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg shadow-primary/20">
                                POPULAR
                             </span>
                         </div>

                         <div className="mb-8">
                             <div className="text-5xl font-bold flex items-center gap-1 text-foreground">
                                 <span className="text-2xl mt-2 text-muted-foreground">₹</span>
                                 20 <span className="text-base font-normal text-muted-foreground self-end mb-1">/ 4 credits</span>
                             </div>
                         </div>

                         <div className="space-y-4 mb-8">
                             {[
                               '1 Detailed Roadmap Generation',
                               '2 Resume Deep Scans',
                               'Lifetime access to history',
                               'Priority Support'
                             ].map((feature, i) => (
                               <div key={i} className="flex items-center gap-3 text-sm">
                                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                     <Check className="w-3 h-3" />
                                  </div>
                                  <span className="text-foreground/80">{feature}</span>
                               </div>
                             ))}
                         </div>

                         <AuraButton className="w-full">Get Credits</AuraButton>
                     </div>
                 </NeuCard>
             </motion.div>

             {/* Transparency Mockup */}
             <div className="text-left space-y-6">
                 <div className="flex items-center gap-3 text-muted-foreground mb-2">
                     <History className="h-5 w-5" />
                     <span className="font-medium">Recent Transactions</span>
                 </div>
                 
                 <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                         <GlassPanel key={i} variant="default" className="flex justify-between items-center p-4">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-surface-base dark:bg-white/5 flex items-center justify-center text-xl">
                                   {i === 1 ? '🗺️' : i === 2 ? '📄' : '🎓'}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground">
                                      {i === 1 ? 'Roadmap Generation' : i === 2 ? 'Resume Scan' : 'Resource Unlock'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">2 mins ago</div>
                                </div>
                             </div>
                             <div className="text-red-500 font-mono text-sm font-medium bg-red-500/10 px-2 py-1 rounded">
                                {i === 1 ? '-2' : '-1'} Credits
                             </div>
                         </GlassPanel>
                     ))}
                 </div>
                 
                 <p className="text-xs text-center text-muted-foreground mt-4">
                   Every transaction is recorded on your dashboard.
                 </p>
             </div>

         </div>

      </div>
    </motion.div>
  );
}
