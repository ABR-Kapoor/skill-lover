'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { AuraButton } from '@/components/ui/aura-button';
import { NeuCard } from '@/components/ui/neu-card';
import { Map, Plus, ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { Roadmap } from '@/types/database';
import { formatDistanceToNow } from 'date-fns';

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch('/api/roadmap/list');

        if (!res.ok) throw new Error('Failed to fetch roadmaps');

        const data = await res.json();
        setRoadmaps(data.data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to load roadmaps');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'chill':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'regular':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'intense':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-surface-deep text-muted-foreground border-white/5';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <PageHeader
        title="My Roadmaps"
        description="View and manage your career roadmaps"
        action={
          <Link href="/roadmaps/new">
            <AuraButton>
              <Plus className="h-4 w-4 mr-2" />
              New Roadmap
            </AuraButton>
          </Link>
        }
      />

      {roadmaps.length === 0 ? (
        <EmptyState
          icon={Map}
          title="No roadmaps yet"
          description="Create your first AI-generated career roadmap to get started on your journey"
          action={
            <Link href="/roadmaps/new">
              <AuraButton>Create Roadmap</AuraButton>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <Link key={roadmap.id} href={`/roadmaps/${roadmap.id}`}>
              <NeuCard className="h-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer group">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-surface-base dark:bg-white/5 border-white/10 capitalize">
                        {roadmap.type.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getIntensityColor(roadmap.intensity)}`}>
                        {roadmap.intensity}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {roadmap.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {roadmap.target_role}
                        </p>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm p-3 rounded-xl bg-surface-deep/50 border border-white/5">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary/70" />
                          <span>{roadmap.content.totalWeeks} weeks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary/70" />
                          <span>{roadmap.content.hoursPerDay}h/day</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(roadmap.created_at), { addSuffix: true })}
                          </div>
                          <AuraButton variant="ghost" size="sm" className="h-8">
                            View <ArrowRight className="h-3 w-3 ml-2" />
                          </AuraButton>
                      </div>
                    </div>
                  </div>
              </NeuCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
