'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { NeuCard } from '@/components/ui/neu-card';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Search, Youtube, GraduationCap, Code2, BookOpen, ArrowRight, Layout } from 'lucide-react';
import { AuraButton } from '@/components/ui/aura-button';
import { NeuInput } from '@/components/ui/neu-input';
import { cn } from '@/lib/utils';

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
}

const resources = [
  { icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10', title: 'React Crash Course', type: 'Video' },
  { icon: Code2, color: 'text-blue-500', bg: 'bg-blue-500/10', title: 'System Architecture', type: 'Article' },
  { icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-500/10', title: 'Cracking the Coding Interview', type: 'Book' },
  { icon: GraduationCap, color: 'text-green-500', bg: 'bg-green-500/10', title: 'Harvard CS50', type: 'Course' },
];

export function SceneResources({ progress, range }: SceneProps) {
  const [start, end] = range;
  
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  // Staggered grid animation
  const y1 = useTransform(progress, [start, end], [50, -100]);
  const y2 = useTransform(progress, [start, end], [150, -50]);
  
  const display = useTransform(progress, (value) => 
    (value >= start && value <= end + 0.1) ? 'flex' : 'none'
  );

  return (
    <motion.div 
      style={{ opacity, display }}
      className="absolute inset-0 items-center justify-center pointer-events-none"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         
         {/* Text Section */}
         <div className="space-y-8 text-left pointer-events-auto z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-amber-500 font-medium"
            >
              <Layout className="w-5 h-5" />
              <span>Free Learning Hub</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
              Curated Resources <br />
              <span className="heading-gradient">For Every Skill</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Don't waste time searching. Access a massive library of hand-picked tutorials, 
              courses, and articles organized by your career path.
            </p>

            <div className="max-w-md pointer-events-auto">
               <NeuInput 
                 placeholder="Search for Python, React, System Design..." 
                 startIcon={<Search className="w-4 h-4" />}
                 className="bg-white/5 border border-white/10"
               />
               <div className="flex gap-2 mt-4 flex-wrap">
                  {['Frontend', 'Backend', 'DevOps', 'DSA'].map(tag => (
                     <div key={tag} className="px-3 py-1 rounded-full bg-surface-base dark:bg-white/5 border border-white/5 text-xs font-medium text-muted-foreground hover:bg-white/10 transition-colors cursor-pointer">
                        {tag}
                     </div>
                  ))}
               </div>
            </div>

            <AuraButton size="lg" className="mt-2 pointer-events-auto">
              Explore Library <ArrowRight className="ml-2 w-4 h-4" />
            </AuraButton>
         </div>

         {/* Masonry Grid Visual */}
         <div className="relative h-[600px] w-full flex gap-6 rotate-[-5deg] scale-[0.85] perspective-[1000px]">
             {/* Column 1 */}
             <motion.div style={{ y: y1 }} className="flex-1 flex flex-col gap-6">
                {resources.slice(0, 2).map((res, i) => (
                   <ResourceCard key={i} data={res} />
                ))}
                <GlassPanel variant="dark" className="p-6 opacity-60">
                   <div className="h-20 bg-white/5 rounded-lg mb-4" />
                   <div className="h-4 w-3/4 bg-white/5 rounded" />
                </GlassPanel>
             </motion.div>

             {/* Column 2 */}
             <motion.div style={{ y: y2 }} className="flex-1 flex flex-col gap-6 pt-12">
                {resources.slice(2, 4).map((res, i) => (
                   <ResourceCard key={i} data={res} />
                ))}
                 <div className="p-6 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-muted-foreground text-sm h-40 bg-white/5">
                    + 500 more
                 </div>
             </motion.div>
             
             {/* Background Decoration */}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
         </div>

      </div>
    </motion.div>
  );
}

function ResourceCard({ data }: { data: any }) {
  return (
    <NeuCard variant="flat" className="bg-surface-light dark:bg-[#1E2433] p-0 overflow-hidden group hover:-translate-y-2 transition-transform duration-300 pointer-events-auto cursor-pointer">
        <div className="h-32 bg-surface-base dark:bg-black/20 flex items-center justify-center relative overflow-hidden">
            <data.icon className={`w-12 h-12 ${data.color} opacity-80 group-hover:scale-110 transition-transform duration-500`} />
            <div className={`absolute inset-0 ${data.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
        </div>
        <div className="p-5">
            <div className={cn("inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider mb-2", data.bg, data.color)}>
                {data.type}
            </div>
            <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{data.title}</h4>
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
                <span>Free Resource</span>
                <span>⭐ 4.8</span>
            </div>
        </div>
    </NeuCard>
  );
}
