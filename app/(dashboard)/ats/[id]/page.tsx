'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { ATSScoreCard } from '@/components/ats/ats-score-card';
import { AnalysisSections } from '@/components/ats/analysis-sections';
import { SuggestionsPanel } from '@/components/ats/suggestions-panel';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { AuraButton } from '@/components/ui/aura-button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ATSAnalysis } from '@/types/database';
import Link from 'next/link';

export default function ATSAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`/api/ats/${params.id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            toast.error('Analysis not found');
            router.push('/ats');
            return;
          }
          throw new Error('Failed to fetch analysis');
        }

        const data = await res.json();
        setAnalysis(data.data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to load analysis');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchAnalysis();
    }
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const handleDownload = () => {
    toast.info('PDF export will be implemented in Phase 6');
  };

  const handleShare = () => {
    toast.info('Share functionality coming soon');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="ATS Analysis Results"
        description={`Analysis for ${analysis.resume_filename || 'your resume'}`}
        action={
          <div className="flex gap-2">
            <AuraButton variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </AuraButton>
            <AuraButton variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </AuraButton>
          </div>
        }
      />

      <div className="mb-6">
        <Link href="/ats">
          <AuraButton variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analyses
          </AuraButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Score */}
        <div className="lg:col-span-1">
          <ATSScoreCard score={analysis.ats_score || 0} />
        </div>

        {/* Middle Column - Analysis Sections */}
        <div className="lg:col-span-2">
          <AnalysisSections analysis={analysis.analysis_result} />
        </div>

        {/* Full Width - Suggestions */}
        <div className="lg:col-span-3">
          <SuggestionsPanel analysis={analysis.analysis_result} />
        </div>
      </div>

      {/* Job Description (if provided) */}
      {analysis.job_description && (
        <div className="mt-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Job Description Used</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {analysis.job_description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
