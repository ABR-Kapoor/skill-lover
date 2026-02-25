'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SkillsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const commonSkills = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'TypeScript',
  'SQL',
  'Git',
  'HTML/CSS',
  'Java',
  'AWS',
  'Docker',
  'MongoDB',
];

export function SkillsInput({ value, onChange }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skills" className="text-lg font-semibold">
          What skills do you already have? (Optional)
        </Label>
        <Input
          id="skills"
          placeholder="Type a skill and press Enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-lg h-12"
        />
        <p className="text-sm text-muted-foreground">
          Press Enter to add each skill. Leave empty if you're a complete beginner.
        </p>
      </div>

      {/* Selected Skills */}
      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Your skills:</p>
          <div className="flex flex-wrap gap-2">
            {value.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm">
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Common Skills */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {commonSkills
            .filter((skill) => !value.includes(skill))
            .map((skill) => (
              <button
                key={skill}
                onClick={() => handleAddSkill(skill)}
                className="px-3 py-1.5 text-sm border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
