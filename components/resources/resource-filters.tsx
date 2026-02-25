'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    category?: string;
    type?: string;
    difficulty?: string;
    isFree?: boolean;
  }) => void;
}

export function ResourceFilters({ onSearch, onFilterChange }: ResourceFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [isFree, setIsFree] = useState<boolean | undefined>(undefined);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === 'all' ? '' : value;
    setCategory(newCategory);
    updateFilters({ category: newCategory });
  };

  const handleTypeChange = (value: string) => {
    const newType = value === 'all' ? '' : value;
    setType(newType);
    updateFilters({ type: newType });
  };

  const handleDifficultyChange = (value: string) => {
    const newDifficulty = value === 'all' ? '' : value;
    setDifficulty(newDifficulty);
    updateFilters({ difficulty: newDifficulty });
  };

  const handleFreeChange = (value: string) => {
    const newIsFree = value === 'all' ? undefined : value === 'free';
    setIsFree(newIsFree);
    updateFilters({ isFree: newIsFree });
  };

  const updateFilters = (newFilter: {
    category?: string;
    type?: string;
    difficulty?: string;
    isFree?: boolean;
  }) => {
    const updatedFilters = {
      category: category || undefined,
      type: type || undefined,
      difficulty: difficulty || undefined,
      isFree,
      ...newFilter,
    };
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategory('');
    setType('');
    setDifficulty('');
    setIsFree(undefined);
    onSearch('');
    onFilterChange({});
  };

  const hasActiveFilters = searchQuery || category || type || difficulty || isFree !== undefined;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="ai_ml">AI & ML</SelectItem>
              <SelectItem value="data_science">Data Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={type || 'all'} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="tool">Tool</SelectItem>
              <SelectItem value="book">Book</SelectItem>
              <SelectItem value="platform">Platform</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select value={difficulty || 'all'} onValueChange={handleDifficultyChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price</Label>
          <Select value={isFree === undefined ? 'all' : isFree ? 'free' : 'paid'} onValueChange={handleFreeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Resources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
              <SelectItem value="paid">Paid Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary">
                Search: {searchQuery}
              </Badge>
            )}
            {category && (
              <Badge variant="secondary">
                Category: {category.replace('_', ' ')}
              </Badge>
            )}
            {type && (
              <Badge variant="secondary">
                Type: {type}
              </Badge>
            )}
            {difficulty && (
              <Badge variant="secondary">
                Difficulty: {difficulty}
              </Badge>
            )}
            {isFree !== undefined && (
              <Badge variant="secondary">
                {isFree ? 'Free' : 'Paid'}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
