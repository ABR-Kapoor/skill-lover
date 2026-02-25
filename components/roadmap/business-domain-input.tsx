'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase } from 'lucide-react';

interface BusinessDomainInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BusinessDomainInput({ value, onChange }: BusinessDomainInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="h-5 w-5 text-purple-600" />
        <p className="text-sm text-muted-foreground">
          What industry or domain is your business in?
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="business-domain">Business Domain *</Label>
        <Input
          id="business-domain"
          placeholder="e.g., E-commerce, SaaS, Digital Marketing, Consulting, Web Development..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
        {[
          'E-commerce',
          'SaaS',
          'Digital Marketing',
          'Web Development',
          'Mobile Apps',
          'Consulting',
          'Content Creation',
          'Design Services',
          'AI/ML Services',
        ].map((domain) => (
          <button
            key={domain}
            type="button"
            onClick={() => onChange(domain)}
            className="px-3 py-2 text-sm border rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
          >
            {domain}
          </button>
        ))}
      </div>
    </div>
  );
}
