import { query } from './neon';
import { getUserById } from './users';
import type { User } from '@/types/database';

/**
 * Update user credits
 */
export async function updateUserCredits(
    userId: string,
    creditsChange: number
): Promise<User> {
    // Get current credits
    const currentUser = await getUserById(userId);

    if (!currentUser) {
        throw new Error('User not found');
    }

    const newCredits = currentUser.credits + creditsChange;

    if (newCredits < 0) {
        throw new Error('Insufficient credits');
    }

    const result = await query(
        'UPDATE users SET credits = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [newCredits, userId]
    );

    return result.rows[0];
}