'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import type { Resource } from '@/lib/data/resources';

interface ResourceCardProps {
  resource: Resource;
}

const typeColors: Record<string, string> = {
  course: 'bg-blue-100 text-blue-800 border-blue-200',
  video: 'bg-purple-100 text-purple-800 border-purple-200',
  article: 'bg-green-100 text-green-800 border-green-200',
  tool: 'bg-orange-100 text-orange-800 border-orange-200',
  book: 'bg-pink-100 text-pink-800 border-pink-200',
  template: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  platform: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-2">
            <Badge className={typeColors[resource.type] || 'bg-gray-100'}>
              {resource.type}
            </Badge>
            <Badge className={difficultyColors[resource.difficulty]}>
              {resource.difficulty}
            </Badge>
            {resource.isFree && (
              <Badge variant="outline" className="border-green-600 text-green-600">
                Free
              </Badge>
            )}
          </div>
          {resource.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{resource.rating}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{resource.platform}</span>
          {resource.estimatedDuration && (
            <span className="text-xs">{resource.estimatedDuration}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-muted rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Resource
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
