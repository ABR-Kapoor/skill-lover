'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { AuraButton } from '@/components/ui/aura-button';
import { NeuCard } from '@/components/ui/neu-card';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
}

export function SceneDashboardTransition({ progress, range }: SceneProps) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]); 
  const scale = useTransform(progress, [start, end], [0.85, 1]); 
  const y = useTransform(progress, [start, end], [50, 0]);
  
  const display = useTransform(progress, (value) => 
    (value >= start) ? 'flex' : 'none'
  );

  return (
    <motion.div 
      style={{ opacity, display, scale, y }}
      className="absolute inset-0 items-center justify-center pointer-events-auto z-20"
    >
      <div className="text-center space-y-10 max-w-3xl mx-auto px-4 relative">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

          <motion.div 
            initial={{ rotate: -10, y: 0 }}
            animate={{ rotate: 10, y: -20 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="w-32 h-32 mx-auto relative"
          >
             <NeuCard variant="lifted" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-[2rem]">
                <span className="text-6xl filter drop-shadow-lg">🚀</span>
             </NeuCard>
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/50 blur-xl rounded-full" />
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground">
                Ready to <br />
                <span className="heading-gradient">Launch?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Join thousands of designers, developers, and creators <br className="hidden md:block"/>
                building their future with AuraSutra today.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
               <Link href="/sign-up">
                   <AuraButton size="lg" className="h-16 px-12 text-xl shadow-[var(--neu-xl)] hover:shadow-[var(--neu-lifted)] hover:scale-105 transition-all duration-500 bg-primary hover:bg-primary/90">
                       Get Started for Free <ArrowRight className="ml-3 w-6 h-6" />
                   </AuraButton>
               </Link>
               
               <div className="flex items-center gap-3 text-sm text-muted-foreground mt-4 p-3 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                   <Sparkles className="w-4 h-4 text-amber-500" />
                   <span>No credit card required</span>
                   <span className="w-1 h-1 rounded-full bg-white/20" />
                   <span>2 Free credits included</span>
               </div>
          </div>
      </div>
    </motion.div>
  );
}
