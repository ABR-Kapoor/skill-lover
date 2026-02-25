'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import type { ATSAnalysisResult } from '@/types/database';

interface SuggestionsPanelProps {
  analysis: ATSAnalysisResult;
}

export function SuggestionsPanel({ analysis }: SuggestionsPanelProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Actionable Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{suggestion.category}</Badge>
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} impact
                      </Badge>
                    </div>
                    <p className="font-medium text-sm">{suggestion.issue}</p>
                  </div>
                </div>
                <div className="pl-4 border-l-2 border-primary">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Suggestion: </span>
                    {suggestion.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Wins */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Wins</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.recommendedImprovements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Keyword Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Present Keywords</p>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordAnalysis.presentKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Missing Important Keywords</p>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordAnalysis.missingImportantKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Keyword Density</p>
            <Badge className={
              analysis.keywordAnalysis.keywordDensity === 'appropriate' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }>
              {analysis.keywordAnalysis.keywordDensity}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
