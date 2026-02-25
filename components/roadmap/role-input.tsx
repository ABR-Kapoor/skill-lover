'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface RoleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const popularRoles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist',
  'Product Manager',
  'UI/UX Designer',
  'DevOps Engineer',
  'Mobile Developer',
  'Digital Marketer',
  'Content Creator',
];

export function RoleInput({ value, onChange }: RoleInputProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="targetRole" className="text-lg font-semibold">
          What role are you aiming for?
        </Label>
        <Input
          id="targetRole"
          placeholder="e.g., Full Stack Developer, Product Manager, Data Scientist..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg h-12"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Popular roles:</p>
        <div className="flex flex-wrap gap-2">
          {popularRoles.map((role) => (
            <button
              key={role}
              onClick={() => onChange(role)}
              className="px-3 py-1.5 text-sm border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
