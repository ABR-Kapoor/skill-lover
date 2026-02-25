'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { EnhancedRoadmapTimeline } from '@/components/roadmap/enhanced-roadmap-timeline';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { AuraButton } from '@/components/ui/aura-button';
import { ExportButtons } from '@/components/roadmap/export-buttons';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Roadmap } from '@/types/database';
import Link from 'next/link';

export default function RoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/roadmap/${params.id}`);

        if (!res.ok) {
          if (res.status === 404) {
            toast.error('Roadmap not found');
            router.push('/roadmaps');
            return;
          }
          throw new Error('Failed to fetch roadmap');
        }

        const data = await res.json();
        setRoadmap(data.data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to load roadmap');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchRoadmap();
    }
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this roadmap?')) return;

    try {
      const res = await fetch(`/api/roadmap/${params.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      toast.success('Roadmap deleted');
      router.push('/roadmaps');
    } catch (error) {
      toast.error('Failed to delete roadmap');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/roadmaps">
          <AuraButton variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roadmaps
          </AuraButton>
        </Link>
        
        <div className="flex gap-2">
          <ExportButtons roadmap={roadmap} />
          <AuraButton variant="outline" onClick={handleDelete} className="text-destructive hover:bg-destructive/10 border-destructive/20">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </AuraButton>
        </div>
      </div>

      {/* Enhanced Timeline */}
      <EnhancedRoadmapTimeline content={roadmap.content} />
    </div>
  );
}
