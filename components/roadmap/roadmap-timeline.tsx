'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Milestone } from '@/types/database';

interface RoadmapTimelineProps {
  milestones: Milestone[];
}

const taskTypeColors: Record<string, string> = {
  learning: 'bg-blue-100 text-blue-800 border-blue-200',
  project: 'bg-purple-100 text-purple-800 border-purple-200',
  networking: 'bg-green-100 text-green-800 border-green-200',
  linkedin: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  instagram: 'bg-pink-100 text-pink-800 border-pink-200',
  offline: 'bg-orange-100 text-orange-800 border-orange-200',
  interview_prep: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  application: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

export function RoadmapTimeline({ milestones }: RoadmapTimelineProps) {
  return (
    <div className="relative space-y-8">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.week}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          {/* Week Badge */}
          <div className="absolute left-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg z-10">
            W{milestone.week}
          </div>

          {/* Content */}
          <div className="ml-24">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <Badge variant="outline" className="mb-2">
                      {milestone.phase}
                    </Badge>
                    <CardTitle className="text-2xl">{milestone.title}</CardTitle>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Learning Objectives */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Learning Objectives:</h4>
                  <ul className="space-y-1">
                    {milestone.learningObjectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Tasks ({milestone.tasks.length}):</h4>
                  <div className="space-y-3">
                    {milestone.tasks.map((task, taskIdx) => (
                      <div key={taskIdx} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-medium">{task.title}</h5>
                              <Badge className={taskTypeColors[task.type] || 'bg-gray-100'}>
                                {task.type.replace('_', ' ')}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {task.estimatedHours}h
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>

                        {/* Resources */}
                        {task.resources.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground">Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {task.resources.map((resource, resIdx) => (
                                <a
                                  key={resIdx}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded flex items-center gap-1 transition-colors"
                                >
                                  {resource.isFree && <span className="text-green-600">🆓</span>}
                                  {resource.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Deliverable */}
                        <div className="text-sm">
                          <span className="font-semibold">Deliverable: </span>
                          <span className="text-muted-foreground">{task.deliverable}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Goal */}
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-sm">
                    <span className="font-semibold">Weekly Goal: </span>
                    {milestone.weeklyGoal}
                  </p>
                </div>

                {/* Time Allocation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{milestone.timeAllocation.learning}h</div>
                    <div className="text-muted-foreground">Learning</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{milestone.timeAllocation.practice}h</div>
                    <div className="text-muted-foreground">Practice</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{milestone.timeAllocation.projects}h</div>
                    <div className="text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{milestone.timeAllocation.networking}h</div>
                    <div className="text-muted-foreground">Networking</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
