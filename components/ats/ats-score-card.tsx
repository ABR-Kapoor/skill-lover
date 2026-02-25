'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ATSScoreCardProps {
  score: number;
}

export function ATSScoreCard({ score }: ATSScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'stroke-green-600';
    if (score >= 50) return 'stroke-yellow-600';
    return 'stroke-red-600';
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-center">ATS Compatibility Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={getScoreBgColor(score)}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm font-medium">
            {score >= 75 && '✅ Excellent! Your resume is well-optimized for ATS.'}
            {score >= 50 && score < 75 && '⚠️ Good, but there\'s room for improvement.'}
            {score < 50 && '❌ Needs significant improvements for ATS compatibility.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
