'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Map, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Map,
    title: 'AI Roadmap Generator',
    description: 'Get personalized career roadmaps tailored to your goals, whether you\'re an entrepreneur or job seeker.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-950',
  },
  {
    icon: FileText,
    title: 'ATS Resume Analyzer',
    description: 'Optimize your resume for Applicant Tracking Systems with AI-powered suggestions and scoring.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Curated resources and learning paths based on your skills and career objectives.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-950',
  },
  {
    icon: Zap,
    title: 'Multiple Intensities',
    description: 'Choose from Chill, Regular, or Intense pacing to match your schedule and commitment level.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-950',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your journey with milestone tracking and achievement markers.',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-950',
  },
  {
    icon: Sparkles,
    title: 'Export & Share',
    description: 'Download your roadmaps as PDF or Markdown to share with mentors and peers.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 bg-background">
      {/* Gradient Overlay for smooth transition from Black Video */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful AI-driven tools designed to accelerate your career growth
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
