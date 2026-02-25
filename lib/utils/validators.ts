import { z } from 'zod';

/**
 * Roadmap Generation Request Schema
 */
export const RoadmapGenerationSchema = z.object({
    type: z.enum(['entrepreneur', 'job_seeker']),
    targetRole: z.string().min(3, 'Target role must be at least 3 characters'),
    intensity: z.enum(['chill', 'regular', 'intense']),
    currentSkills: z.array(z.string()).optional(),
});

export type RoadmapGenerationInput = z.infer<typeof RoadmapGenerationSchema>;

/**
 * Roadmap Structure Schema (for AI response validation)
 */
export const MilestoneSchema = z.object({
    week: z.number(),
    phase: z.string(),
    title: z.string(),
    description: z.string(),
    learningObjectives: z.array(z.string()),
    tasks: z.array(z.object({
        title: z.string(),
        description: z.string(),
        type: z.string().transform((val) => {
            // Map common variations to valid types
            const lower = val.toLowerCase();
            if (lower.includes('learn') || lower.includes('study') || lower.includes('read')) return 'learning';
            if (lower.includes('project') || lower.includes('build') || lower.includes('create')) return 'project';
            if (lower.includes('network') || lower.includes('connect') || lower.includes('meet')) return 'networking';
            if (lower.includes('linkedin')) return 'linkedin';
            if (lower.includes('instagram')) return 'instagram';
            if (lower.includes('offline') || lower.includes('event')) return 'offline';
            if (lower.includes('interview') || lower.includes('prep')) return 'interview_prep';
            if (lower.includes('apply') || lower.includes('application') || lower.includes('job')) return 'application';
            // Default to learning if unknown
            return 'learning';
        }),
        estimatedHours: z.number(),
        priority: z.enum(['high', 'medium', 'low']),
        resources: z.array(z.object({
            title: z.string(),
            type: z.enum(['course', 'video', 'article', 'tool', 'book', 'template']),
            platform: z.string(),
            url: z.string(),
            isFree: z.boolean(),
            estimatedDuration: z.string(),
        })),
        deliverable: z.string(),
        successCriteria: z.string(),
    })),
    weeklyGoal: z.string(),
    timeAllocation: z.object({
        learning: z.number(),
        practice: z.number(),
        projects: z.number(),
        networking: z.number(),
    }),
});

export const RoadmapContentSchema = z.object({
    title: z.string(),
    description: z.string(),
    durationMonths: z.number(),
    totalWeeks: z.number(),
    hoursPerDay: z.number(),
    estimatedTotalHours: z.number(),
    milestones: z.array(MilestoneSchema),
    keySkills: z.array(z.string()),
    toolsAndPlatforms: z.array(z.string()),
    successMetrics: z.array(z.string()),
    tips: z.array(z.string()),
});

export type RoadmapContent = z.infer<typeof RoadmapContentSchema>;
