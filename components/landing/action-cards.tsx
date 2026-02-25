'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Map } from 'lucide-react';
import Link from 'next/link';

export function ActionCards() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Starting Point
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Whether you need a career roadmap or resume optimization, we&apos;ve got you covered
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Roadmap Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Map className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Generate Career Roadmap</CardTitle>
                <CardDescription className="text-base">
                  Get a personalized, AI-generated roadmap tailored to your career goals. 
                  Choose between entrepreneur or job seeker paths with customizable intensity levels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Week-by-week breakdown with actionable tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Curated learning resources and tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Networking and portfolio building strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Export as PDF or Markdown</span>
                  </li>
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
                    Create Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* ATS Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Analyze Resume (ATS)</CardTitle>
                <CardDescription className="text-base">
                  Upload your resume and get instant AI-powered feedback on ATS compatibility, 
                  keyword optimization, and improvement suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>ATS compatibility score (0-100)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Section-by-section detailed analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Missing keywords and optimization tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Job description matching (optional)</span>
                  </li>
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                    Analyze Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
