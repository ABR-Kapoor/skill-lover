// API Request/Response types

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface RoadmapGenerationRequest {
    type: 'entrepreneur' | 'job_seeker';
    targetRole: string;
    intensity: 'chill' | 'regular' | 'intense';
    currentSkills?: string[];
}

export interface ATSAnalysisRequest {
    resumeUrl: string;
    resumeFilename: string;
    jobDescription?: string;
}

export interface CreditPurchaseRequest {
    amount: number;
}
