'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { ATSAnalysisResult } from '@/types/database';

interface AnalysisSectionsProps {
  analysis: ATSAnalysisResult;
}

export function AnalysisSections({ analysis }: AnalysisSectionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Assessment */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.overallAssessment}</p>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Weaknesses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                <span className="text-sm">{weakness}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Missing Keywords */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Missing Important Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="border-yellow-600 text-yellow-600">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Scores */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Section-by-Section Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.sectionScores.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.section}</span>
                  <span className={`font-bold ${
                    section.score >= 75 ? 'text-green-600' :
                    section.score >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {section.score}/100
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      section.score >= 75 ? 'bg-green-600' :
                      section.score >= 50 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{section.feedback}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
