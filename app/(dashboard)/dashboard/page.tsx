'use client';

import { NeuCard } from '@/components/ui/neu-card';
import { AuraButton } from '@/components/ui/aura-button';
import { FileText, Map, BookOpen, Settings, ArrowRight, Sparkles, Plus, TrendingUp, History } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
              Skill Lover
            </h1>
            <p className="text-muted-foreground text-lg font-light flex items-center gap-2">
              Welcome back, <span className="font-medium text-foreground">{user?.firstName || 'Creator'}</span>
            </p>
          </div>
          <div className="text-right hidden md:block">
             <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Current Plan</p>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                <Sparkles className="w-3 h-3" />
                Free Trial
             </div>
          </div>
        </motion.div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* New Roadmap - Large Card */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-6 relative group">
            <Link href="/roadmaps/new" className="block h-full relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500 blur group-hover:blur-md" />
              <NeuCard className="relative h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 bg-surface-deep/90 backdrop-blur-xl border-white/10 group-hover:border-white/20">
                <div className="p-8 h-full flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 ring-1 ring-indigo-500/20 group-hover:ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      <Map className="w-7 h-7" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                      Popular
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-indigo-500 transition-colors">Create Roadmap</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Target a new role or skill. Get a personalized week-by-week learning plan powered by AI.
                    </p>
                  </div>

                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-6 h-6 text-indigo-500" />
                  </div>
                </div>
              </NeuCard>
            </Link>
          </motion.div>

          {/* Analyze Resume - Large Card */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-6 relative group">
            <Link href="/ats/new" className="block h-full relative">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500 blur group-hover:blur-md" />
               <NeuCard className="relative h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 bg-surface-deep/90 backdrop-blur-xl border-white/10 group-hover:border-white/20">
                <div className="p-8 h-full flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 ring-1 ring-blue-500/20 group-hover:ring-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                      New
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-500 transition-colors">Analyze Resume</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Check your ATS score inside our validator. Get instant feedback and improvement suggestions.
                    </p>
                  </div>

                   <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </NeuCard>
            </Link>
          </motion.div>

          {/* Total Roadmaps - Small Card */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-4 h-full">
              <NeuCard className="h-full bg-surface-base flex flex-col justify-between p-6 overflow-hidden relative">
                 <div className="relative z-10 flex justify-between items-start">
                    <div>
                       <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Roadmaps</h4>
                       <span className="text-4xl font-display font-bold text-foreground">0</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                       <Map className="w-5 h-5 text-emerald-500" />
                    </div>
                 </div>

                 <div className="relative z-10 mt-4">
                    <div className="flex justify-between items-center text-xs mb-2">
                       <span className="text-muted-foreground">Monthly Goal</span>
                       <span className="text-emerald-500 font-bold">0%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[5%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>
                 </div>

                 {/* Decorative background element */}
                 <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-[-15deg] z-0" />
              </NeuCard>
          </motion.div>

          {/* Small Actions Row */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-4 h-full group">
             <Link href="/resources" className="block h-full">
              <NeuCard className="h-full hover:bg-surface-light transition-colors cursor-pointer border-emerald-500/10">
                <div className="p-6 h-full flex items-center gap-5">
                   <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <BookOpen className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-foreground">Resources</h4>
                      <p className="text-sm text-muted-foreground">Learning database</p>
                   </div>
                </div>
              </NeuCard>
             </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-4 h-full group">
             <Link href="/settings" className="block h-full">
              <NeuCard className="h-full hover:bg-surface-light transition-colors cursor-pointer border-orange-500/10">
                 <div className="p-6 h-full flex items-center gap-5">
                   <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <Settings className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-foreground">Settings</h4>
                      <p className="text-sm text-muted-foreground">Manage account</p>
                   </div>
                </div>
              </NeuCard>
             </Link>
          </motion.div>

        </div>

        {/* Recent Activity Feed */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
           {/* Section 1 */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-500" /> Recent Roadmaps
                 </h3>
                 <Link href="/roadmaps" className="text-sm text-primary hover:text-primary/80 font-medium">View All</Link>
              </div>
              <NeuCard variant="flat" className="min-h-[240px] flex flex-col items-center justify-center p-8 bg-surface-base/50 border-2 border-dashed border-white/5">
                  <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-4">
                     <Map className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <p className="text-muted-foreground mb-6">You haven't created any roadmaps yet.</p>
                  <Link href="/roadmaps/new">
                    <AuraButton size="default" className="shadow-lg shadow-indigo-500/20">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </AuraButton>
                  </Link>
              </NeuCard>
           </div>

           {/* Section 2 */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-500" /> Recent Analyses
                 </h3>
                 <Link href="/ats" className="text-sm text-primary hover:text-primary/80 font-medium">View All</Link>
              </div>
              <NeuCard variant="flat" className="min-h-[240px] flex flex-col items-center justify-center p-8 bg-surface-base/50 border-2 border-dashed border-white/5">
                  <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-4">
                     <FileText className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <p className="text-muted-foreground mb-6">No resumes analyzed recently.</p>
                  <Link href="/ats/new">
                    <AuraButton variant="secondary" size="default">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Resume
                    </AuraButton>
                  </Link>
              </NeuCard>
           </div>
        </motion.div>
    </motion.div>
  );
}
