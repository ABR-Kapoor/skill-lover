export interface User {
    id: string;
    clerk_id: string | null; // Nullable initially for existing users without clerk_id
    email: string;
    name: string | null;
    image: string | null;
    credits: number;
    is_premium: boolean;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface Roadmap {
    id: string;
    user_id: string;
    title: string;
    type: 'entrepreneur' | 'job_seeker';
    intensity: 'chill' | 'regular' | 'intense';
    target_role: string;
    duration_months: number;
    current_skills: string[];
    content: RoadmapContent;
    is_custom_edited: boolean;
    created_at: string;
    updated_at: string;
}

export interface RoadmapContent {
    title: string;
    description: string;
    durationMonths: number;
    totalWeeks: number;
    hoursPerDay: number;
    estimatedTotalHours: number;
    milestones: Milestone[];
    keySkills: string[];
    toolsAndPlatforms: string[];
    successMetrics: string[];
    tips: string[];
}

export interface Milestone {
    week: number;
    phase: string;
    title: string;
    description: string;
    learningObjectives: string[];
    tasks: Task[];
    weeklyGoal: string;
    timeAllocation: {
        learning: number;
        practice: number;
        projects: number;
        networking: number;
    };
}

export interface Task {
    title: string;
    description: string;
    type: 'learning' | 'project' | 'networking' | 'linkedin' | 'instagram' | 'offline' | 'interview_prep' | 'application';
    estimatedHours: number;
    priority: 'high' | 'medium' | 'low';
    resources: Resource[];
    deliverable: string;
    successCriteria: string;
}

export interface Resource {
    title: string;
    type: 'course' | 'video' | 'article' | 'tool' | 'book' | 'template';
    platform: string;
    url: string;
    isFree: boolean;
    estimatedDuration: string;
}

export interface ATSAnalysis {
    id: string;
    user_id: string;
    resume_filename: string | null;
    resume_text: string | null;
    ats_score: number | null;
    analysis_result: ATSAnalysisResult;
    job_description: string | null;
    created_at: string;
}

export interface ATSAnalysisResult {
    candidateName?: string;
    candidateTitle?: string;
    yearsOfExperience?: string;
    atsScore: number;
    overallAssessment: string;
    strengths: string[];
    weaknesses: string[];
    missingKeywords: string[];
    suggestions: Suggestion[];
    sectionScores: SectionScore[];
    keywordAnalysis: KeywordAnalysis;
    recommendedImprovements: string[];
}

export interface Suggestion {
    category: string;
    issue: string;
    suggestion: string;
    impact: 'high' | 'medium' | 'low';
}

export interface SectionScore {
    section: string;
    score: number;
    feedback: string;
}

export interface KeywordAnalysis {
    presentKeywords: string[];
    missingImportantKeywords: string[];
    keywordDensity: 'appropriate' | 'too low' | 'too high';
}

export interface ResourceDB {
    id: string;
    title: string;
    description: string | null;
    type: 'course' | 'video' | 'article' | 'tool' | 'book' | 'template';
    url: string;
    platform: string | null;
    is_free: boolean;
    price: number | null;
    currency: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all' | null;
    rating: number | null;
    thumbnail_url: string | null;
    author: string | null;
    duration_hours: number | null;
    created_at: string;
}

export interface CreditTransaction {
    id: string;
    user_id: string;
    transaction_type: 'roadmap_generation' | 'ats_analysis' | 'credit_purchase' | 'initial_credits';
    credits_changed: number;
    credits_after: number;
    payment_id: string | null;
    amount_paid: number | null;
    currency: string;
    created_at: string;
}
