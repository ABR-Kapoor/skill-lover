'use client';

import { Card } from '@/components/ui/card';
import { Megaphone, Code, TrendingUp, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FocusAreaSelectorProps {
  value: 'marketing' | 'tech' | 'sales' | 'operations' | null;
  onChange: (value: 'marketing' | 'tech' | 'sales' | 'operations') => void;
}

const FOCUS_AREAS = [
  {
    value: 'marketing' as const,
    label: 'Marketing',
    description: 'Content, SEO, social media, branding',
    icon: Megaphone,
    color: 'purple',
  },
  {
    value: 'tech' as const,
    label: 'Technology',
    description: 'Product development, coding, tools',
    icon: Code,
    color: 'blue',
  },
  {
    value: 'sales' as const,
    label: 'Sales',
    description: 'Client acquisition, pitching, closing',
    icon: TrendingUp,
    color: 'green',
  },
  {
    value: 'operations' as const,
    label: 'Operations',
    description: 'Systems, processes, management',
    icon: Settings,
    color: 'orange',
  },
];

export function FocusAreaSelector({ value, onChange }: FocusAreaSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        What area do you want to focus on most in your business?
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {FOCUS_AREAS.map((area) => {
          const Icon = area.icon;
          const isSelected = value === area.value;

          return (
            <Card
              key={area.value}
              className={cn(
                'p-6 cursor-pointer transition-all hover:shadow-lg',
                isSelected
                  ? `border-${area.color}-500 bg-${area.color}-50 shadow-md`
                  : 'hover:border-gray-300'
              )}
              onClick={() => onChange(area.value)}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'p-3 rounded-lg',
                      isSelected
                        ? `bg-${area.color}-600 text-white`
                        : 'bg-gray-100'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{area.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {area.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        💡 Your roadmap will emphasize this area while covering all aspects of business
      </p>
    </div>
  );
}
