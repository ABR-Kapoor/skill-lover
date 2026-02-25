'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, Rocket } from 'lucide-react';

interface PathSelectorProps {
  value: 'entrepreneur' | 'job_seeker' | null;
  onChange: (value: 'entrepreneur' | 'job_seeker') => void;
}

const paths = [
  {
    value: 'entrepreneur' as const,
    icon: Rocket,
    title: 'Entrepreneur Path',
    description: 'Freelancing, consulting, or building your own startup',
    features: [
      'Client acquisition strategies',
      'Portfolio building',
      'LinkedIn & social media',
      'Pricing & proposals',
      'Networking tactics',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    value: 'job_seeker' as const,
    icon: Briefcase,
    title: 'Job Seeker Path',
    description: 'Landing your dream job at a company',
    features: [
      'Interview preparation',
      'Resume optimization',
      'Job search strategies',
      'Portfolio projects',
      'Application tracking',
    ],
    gradient: 'from-blue-500 to-indigo-500',
  },
];

export function PathSelector({ value, onChange }: PathSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {paths.map((path) => (
        <Card
          key={path.value}
          className={cn(
            'cursor-pointer transition-all border-2 hover:shadow-lg',
            value === path.value
              ? 'border-primary shadow-lg scale-105'
              : 'border-muted hover:border-primary/50'
          )}
          onClick={() => onChange(path.value)}
        >
          <CardContent className="p-6 space-y-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center`}>
              <path.icon className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{path.title}</h3>
              <p className="text-sm text-muted-foreground">{path.description}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Includes:</p>
              <ul className="space-y-1">
                {path.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {value === path.value && (
              <div className="pt-2">
                <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full inline-block">
                  ✓ Selected
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
