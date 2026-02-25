import { query } from './neon';
import type { Roadmap, RoadmapContent } from '@/types/database';

/**
 * Create a new roadmap
 */
export async function createRoadmap(data: {
    userId: string;
    title: string;
    type: 'entrepreneur' | 'job_seeker';
    intensity: 'chill' | 'regular' | 'intense';
    targetRole: string;
    durationMonths: number;
    currentSkills: string[];
    content: RoadmapContent;
}): Promise<Roadmap> {
    const result = await query(
        `INSERT INTO roadmaps (user_id, title, type, intensity, target_role, duration_months, current_skills, content) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *`,
        [
            data.userId,
            data.title,
            data.type,
            data.intensity,
            data.targetRole,
            data.durationMonths,
            data.currentSkills,
            JSON.stringify(data.content),
        ]
    );

    return result.rows[0];
}

/**
 * Get roadmap by ID
 */
export async function getRoadmapById(roadmapId: string): Promise<Roadmap | null> {
    const result = await query('SELECT * FROM roadmaps WHERE id = $1', [roadmapId]);
    return result.rows[0] || null;
}

/**
 * Get all roadmaps for a user
 */
export async function getUserRoadmaps(userId: string): Promise<Roadmap[]> {
    const result = await query(
        'SELECT * FROM roadmaps WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
}

/**
 * Update roadmap
 */
export async function updateRoadmap(
    roadmapId: string,
    updates: Partial<Pick<Roadmap, 'title' | 'content' | 'is_custom_edited'>>
): Promise<Roadmap> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
        fields.push(`title = $${paramIndex++}`);
        values.push(updates.title);
    }

    if (updates.content !== undefined) {
        fields.push(`content = $${paramIndex++}`);
        values.push(JSON.stringify(updates.content));
    }

    if (updates.is_custom_edited !== undefined) {
        fields.push(`is_custom_edited = $${paramIndex++}`);
        values.push(updates.is_custom_edited);
    }

    fields.push(`updated_at = NOW()`);
    values.push(roadmapId);

    const result = await query(
        `UPDATE roadmaps SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
        values
    );

    if (result.rows.length === 0) {
        throw new Error('Roadmap not found');
    }

    return result.rows[0];
}

/**
 * Delete roadmap
 */
export async function deleteRoadmap(roadmapId: string): Promise<void> {
    await query('DELETE FROM roadmaps WHERE id = $1', [roadmapId]);
}

