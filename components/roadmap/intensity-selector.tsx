'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Moon, Zap, Flame } from 'lucide-react';

interface IntensitySelectorProps {
  value: 'chill' | 'regular' | 'intense' | null;
  onChange: (value: 'chill' | 'regular' | 'intense') => void;
}

const intensities = [
  {
    value: 'chill' as const,
    icon: Moon,
    emoji: '🌙',
    title: 'Chill',
    hoursPerDay: '1-2 hours/day',
    duration: '6 months',
    description: 'Perfect for learning alongside work or studies',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
    borderColor: 'border-blue-500',
  },
  {
    value: 'regular' as const,
    icon: Zap,
    emoji: '⚡',
    title: 'Regular',
    hoursPerDay: '3-4 hours/day',
    duration: '3 months',
    description: 'Balanced pace for steady progress',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950',
    borderColor: 'border-yellow-500',
  },
  {
    value: 'intense' as const,
    icon: Flame,
    emoji: '🔥',
    title: 'Intense',
    hoursPerDay: '6+ hours/day',
    duration: '1.5 months',
    description: 'Full-time commitment for rapid results',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-950',
    borderColor: 'border-red-500',
  },
];

export function IntensitySelector({ value, onChange }: IntensitySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {intensities.map((intensity) => (
        <Card
          key={intensity.value}
          className={cn(
            'cursor-pointer transition-all border-2 hover:shadow-lg',
            value === intensity.value
              ? `${intensity.borderColor} shadow-lg scale-105`
              : 'border-muted hover:border-primary/50'
          )}
          onClick={() => onChange(intensity.value)}
        >
          <CardContent className="p-6 space-y-4 text-center">
            <div className="text-5xl">{intensity.emoji}</div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{intensity.title}</h3>
              <div className="space-y-1">
                <p className={`text-sm font-semibold ${intensity.color}`}>
                  {intensity.hoursPerDay}
                </p>
                <p className="text-sm text-muted-foreground">
                  {intensity.duration} timeline
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {intensity.description}
            </p>

            {value === intensity.value && (
              <div className="pt-2">
                <div className={`px-3 py-1 ${intensity.bgColor} ${intensity.color} text-sm font-medium rounded-full inline-block`}>
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
