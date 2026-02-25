'use client';

import { RoadmapContent } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen,
  Video,
  ExternalLink,
  Sparkles,
  Zap,
  Award,
  Calendar,
  PlayCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedRoadmapTimelineProps {
  content: RoadmapContent;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

const typeIcons = {
  learning: BookOpen,
  project: Zap,
  practice: Target,
  networking: TrendingUp,
  application: Award,
  linkedin: TrendingUp,
};

const typeColors = {
  learning: 'bg-blue-500',
  project: 'bg-purple-500',
  practice: 'bg-green-500',
  networking: 'bg-pink-500',
  application: 'bg-orange-500',
  linkedin: 'bg-indigo-500',
};

export function EnhancedRoadmapTimeline({ content }: EnhancedRoadmapTimelineProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 text-white">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Your Personalized Roadmap</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-lg text-white/90 mb-6 max-w-3xl">{content.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Calendar className="h-5 w-5 mb-2" />
              <div className="text-2xl font-bold">{content.totalWeeks}</div>
              <div className="text-sm text-white/80">Weeks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="h-5 w-5 mb-2" />
              <div className="text-2xl font-bold">{content.hoursPerDay}h</div>
              <div className="text-sm text-white/80">Per Day</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Target className="h-5 w-5 mb-2" />
              <div className="text-2xl font-bold">{content.estimatedTotalHours}h</div>
              <div className="text-sm text-white/80">Total</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="h-5 w-5 mb-2" />
              <div className="text-2xl font-bold">{content.milestones.length}</div>
              <div className="text-sm text-white/80">Milestones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              Key Skills You'll Master
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {content.keySkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Tools & Platforms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {content.toolsAndPlatforms.map((tool, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Milestones */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Target className="h-8 w-8 text-purple-600" />
          Week-by-Week Journey
        </h2>

        {content.milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <Card 
              key={milestone.week} 
              className={cn(
                "border-l-4 hover:shadow-xl transition-all duration-300",
                isEven ? "border-l-purple-500 bg-gradient-to-r from-purple-50/50" : "border-l-blue-500 bg-gradient-to-r from-blue-50/50"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={cn(
                        "px-3 py-1 text-sm font-bold",
                        isEven ? "bg-purple-600" : "bg-blue-600"
                      )}>
                        Week {milestone.week}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {milestone.phase}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{milestone.title}</CardTitle>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-dashed">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-green-600" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {milestone.learningObjectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tasks */}
                {milestone.tasks.map((task, taskIndex) => {
                  const TypeIcon = typeIcons[task.type as keyof typeof typeIcons] || BookOpen;
                  const typeColor = typeColors[task.type as keyof typeof typeColors] || 'bg-gray-500';
                  
                  return (
                    <Card key={taskIndex} className="border-2 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={cn("p-1.5 rounded-lg", typeColor)}>
                                <TypeIcon className="h-4 w-4 text-white" />
                              </div>
                              <Badge className={priorityColors[task.priority]}>
                                {task.priority} priority
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.estimatedHours}h
                              </Badge>
                            </div>
                            <h5 className="font-bold text-lg">{task.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Resources */}
                        {task.resources && task.resources.length > 0 && (
                          <div className="space-y-2">
                            <h6 className="font-semibold text-sm flex items-center gap-2">
                              <Video className="h-4 w-4 text-red-600" />
                              Learning Resources
                            </h6>
                            <div className="grid gap-2">
                              {task.resources.map((resource, resIndex) => (
                                <a
                                  key={resIndex}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center justify-between p-3 rounded-lg border-2 hover:border-purple-500 hover:bg-purple-50 transition-all"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                                      {resource.type === 'video' ? (
                                        <PlayCircle className="h-4 w-4 text-white" />
                                      ) : (
                                        <BookOpen className="h-4 w-4 text-white" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium group-hover:text-purple-600 transition-colors">
                                        {resource.title}
                                      </div>
                                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span>{resource.platform}</span>
                                        {resource.isFree && (
                                          <Badge variant="outline" className="text-xs border-green-600 text-green-600">
                                            Free
                                          </Badge>
                                        )}
                                        {resource.estimatedDuration && (
                                          <span>• {resource.estimatedDuration}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Deliverable */}
                        <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                          <div className="font-semibold text-sm text-green-900 mb-1">
                            ✅ Deliverable
                          </div>
                          <p className="text-sm text-green-800">{task.deliverable}</p>
                        </div>

                        {/* Success Criteria */}
                        <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                          <div className="font-semibold text-sm text-blue-900 mb-1">
                            🎯 Success Criteria
                          </div>
                          <p className="text-sm text-blue-800">{task.successCriteria}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Weekly Goal */}
                <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border-2 border-purple-300">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Week {milestone.week} Goal
                  </h4>
                  <p className="text-sm font-medium">{milestone.weeklyGoal}</p>
                </div>

                {/* Time Allocation */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(milestone.timeAllocation).map(([key, hours]) => (
                    <div key={key} className="text-center p-3 bg-white rounded-lg border-2">
                      <div className="text-2xl font-bold text-purple-600">{hours}h</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Success Metrics */}
      <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Award className="h-6 w-6" />
            Success Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {content.successMetrics.map((metric, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-900 font-medium">{metric}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Sparkles className="h-6 w-6" />
            Pro Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {content.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-purple-900">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
