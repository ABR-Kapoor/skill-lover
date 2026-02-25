'use client';

import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Network, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourcesInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const AVAILABLE_RESOURCES = [
  { id: 'team', label: 'Team/Co-founder', icon: Users, color: 'bg-blue-100 text-blue-700' },
  { id: 'budget', label: 'Initial Budget', icon: DollarSign, color: 'bg-green-100 text-green-700' },
  { id: 'network', label: 'Professional Network', icon: Network, color: 'bg-purple-100 text-purple-700' },
  { id: 'time', label: 'Full-time Availability', icon: Clock, color: 'bg-orange-100 text-orange-700' },
  { id: 'experience', label: 'Industry Experience', icon: Zap, color: 'bg-pink-100 text-pink-700' },
];

export function ResourcesInput({ value, onChange }: ResourcesInputProps) {
  const toggleResource = (resourceId: string) => {
    if (value.includes(resourceId)) {
      onChange(value.filter((r) => r !== resourceId));
    } else {
      onChange([...value, resourceId]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Select the resources you currently have (optional - helps personalize your roadmap)
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {AVAILABLE_RESOURCES.map((resource) => {
          const Icon = resource.icon;
          const isSelected = value.includes(resource.id);

          return (
            <button
              key={resource.id}
              type="button"
              onClick={() => toggleResource(resource.id)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left',
                isSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
              )}
            >
              <div className={cn('p-2 rounded-lg', resource.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{resource.label}</span>
              {isSelected && (
                <Badge className="ml-auto bg-purple-600">Selected</Badge>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        💡 Tip: Your roadmap will be customized based on the resources you have available
      </p>
    </div>
  );
}
