import { query } from './neon';
import type { ATSAnalysis, ATSAnalysisResult } from '@/types/database';

/**
 * Create a new ATS analysis
 */
export async function createATSAnalysis(data: {
    userId: string;
    resumeFilename?: string;
    resumeText?: string;
    atsScore: number;
    analysisResult: ATSAnalysisResult;
    jobDescription?: string;
}): Promise<ATSAnalysis> {
    const result = await query(
        `INSERT INTO ats_analyses (user_id, resume_filename, resume_text, ats_score, analysis_result, job_description) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [
            data.userId,
            data.resumeFilename || null,
            data.resumeText || null,
            data.atsScore,
            JSON.stringify(data.analysisResult),
            data.jobDescription || null,
        ]
    );

    return result.rows[0];
}

/**
 * Get ATS analysis by ID
 */
export async function getATSAnalysisById(analysisId: string): Promise<ATSAnalysis | null> {
    const result = await query('SELECT * FROM ats_analyses WHERE id = $1', [analysisId]);
    return result.rows[0] || null;
}

/**
 * Get all ATS analyses for a user
 */
export async function getUserATSAnalyses(userId: string): Promise<ATSAnalysis[]> {
    const result = await query(
        'SELECT * FROM ats_analyses WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
}

/**
 * Delete ATS analysis
 */
export async function deleteATSAnalysis(analysisId: string): Promise<void> {
    await query('DELETE FROM ats_analyses WHERE id = $1', [analysisId]);
}

