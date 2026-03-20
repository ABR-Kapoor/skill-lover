'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { AuraButton } from '@/components/ui/aura-button';
import { NeuCard } from '@/components/ui/neu-card';
import { FileText, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { ATSAnalysis } from '@/types/database';
import { formatDistanceToNow } from 'date-fns';

export default function ATSPage() {
  const [analyses, setAnalyses] = useState<ATSAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const res = await fetch('/api/ats/list');
        const contentType = res.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            if (res.ok && data.success) {
              setAnalyses(data.data || []);
            } else {
              toast.error(data.error || 'Failed to load analyses');
            }
        } else {
            console.error('API returned non-JSON response');
            if (!res.ok) {
                toast.error('Server error while loading analyses');
            }
        }
      } catch (error) {
        console.error('Network or fetch error:', error);
        toast.error('Network error - could not load analyses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (score >= 50) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-red-500/10 text-red-600 border-red-500/20';
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
        title="ATS Analyses"
        description="View your resume analysis history"
        action={
          <Link href="/ats/new">
            <AuraButton>
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </AuraButton>
          </Link>
        }
      />

      {analyses.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No analyses yet"
          description="Upload your resume to get instant ATS compatibility feedback"
          action={
            <Link href="/ats/new">
              <AuraButton variant="secondary">Analyze Resume</AuraButton>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <Link key={analysis.id} href={`/ats/${analysis.id}`}>
              <NeuCard className="h-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer group">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                        {analysis.resume_filename || 'Resume Analysis'}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(analysis.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreColor(analysis.ats_score || 0)}`}>
                      {analysis.ats_score}/100
                    </span>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-surface-deep/50">
                      <span className="text-muted-foreground">Strengths</span>
                      <span className="font-bold text-green-600">{analysis.analysis_result.strengths.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-surface-deep/50">
                      <span className="text-muted-foreground">Improvements</span>
                      <span className="font-bold text-amber-600">{analysis.analysis_result.suggestions.length}</span>
                    </div>
                  </div>

                  <AuraButton variant="ghost" className="w-full mt-6" size="sm">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </AuraButton>
                </div>
              </NeuCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
