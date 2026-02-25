'use client';

import { Card } from '@/components/ui/card';
import { Package, Wrench, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusinessTypeSelectorProps {
  value: 'product' | 'service' | 'both' | null;
  onChange: (value: 'product' | 'service' | 'both') => void;
}

const BUSINESS_TYPES = [
  {
    value: 'product' as const,
    label: 'Product',
    description: 'Selling physical or digital products',
    icon: Package,
    examples: 'E-commerce, SaaS, Apps, Courses',
  },
  {
    value: 'service' as const,
    label: 'Service',
    description: 'Providing services to clients',
    icon: Wrench,
    examples: 'Consulting, Freelancing, Agency',
  },
  {
    value: 'both' as const,
    label: 'Both',
    description: 'Combination of products and services',
    icon: Layers,
    examples: 'Product + Support, Agency + Tools',
  },
];

export function BusinessTypeSelector({ value, onChange }: BusinessTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Are you building a product-based or service-based business?
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {BUSINESS_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.value;

          return (
            <Card
              key={type.value}
              className={cn(
                'p-6 cursor-pointer transition-all hover:shadow-lg',
                isSelected
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'hover:border-purple-200'
              )}
              onClick={() => onChange(type.value)}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{type.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{type.description}</p>
                <p className="text-xs text-purple-600 font-medium">
                  Examples: {type.examples}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
