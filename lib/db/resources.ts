import { query } from './neon';
import type { ResourceDB } from '@/types/database';

/**
 * Search resources with filters
 */
export async function searchResources(params: {
    query?: string;
    type?: string;
    isFree?: boolean;
    difficulty?: string;
    tags?: string[];
    limit?: number;
}): Promise<ResourceDB[]> {
    const conditions: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    // Text search
    if (params.query) {
        conditions.push(`(title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`);
        values.push(`%${params.query}%`);
        paramIndex++;
    }

    // Type filter
    if (params.type) {
        conditions.push(`type = $${paramIndex}`);
        values.push(params.type);
        paramIndex++;
    }

    // Free filter
    if (params.isFree !== undefined) {
        conditions.push(`is_free = $${paramIndex}`);
        values.push(params.isFree);
        paramIndex++;
    }

    // Difficulty filter
    if (params.difficulty) {
        conditions.push(`difficulty = $${paramIndex}`);
        values.push(params.difficulty);
        paramIndex++;
    }

    // Tags filter (contains any of the tags)
    if (params.tags && params.tags.length > 0) {
        conditions.push(`tags && $${paramIndex}`);
        values.push(params.tags);
        paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const limit = params.limit || 50;

    const result = await query(
        `SELECT * FROM resources ${whereClause} ORDER BY created_at DESC LIMIT $${paramIndex}`,
        [...values, limit]
    );

    return result.rows;
}

/**
 * Get resource by ID
 */
export async function getResourceById(resourceId: string): Promise<ResourceDB | null> {
    const result = await query('SELECT * FROM resources WHERE id = $1', [resourceId]);
    return result.rows[0] || null;
}

/**
 * Create a new resource (for admin/seeding)
 */
export async function createResource(data: Omit<ResourceDB, 'id' | 'created_at'>): Promise<ResourceDB> {
    const result = await query(
        `INSERT INTO resources (title, description, type, url, platform, is_free, price, currency, tags, difficulty, rating, thumbnail_url, author, duration_hours) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
         RETURNING *`,
        [
            data.title,
            data.description || null,
            data.type,
            data.url,
            data.platform || null,
            data.is_free ?? true,
            data.price || null,
            data.currency || 'USD',
            data.tags,
            data.difficulty || null,
            data.rating || null,
            data.thumbnail_url || null,
            data.author || null,
            data.duration_hours || null,
        ]
    );

    return result.rows[0];
}

