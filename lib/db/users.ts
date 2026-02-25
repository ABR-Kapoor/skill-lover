import { query } from './neon';
// User database operations for Neon and Clerk
import type { User } from '@/types/database';

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0] || null;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE clerk_id = $1', [clerkId]);
    return result.rows[0] || null;
}

/**
 * Create or update user from Clerk webhook data
 */
export async function createUserFromClerk(data: {
    clerkId: string;
    email: string;
    name?: string;
    image?: string;
}): Promise<User> {
    const freeCredits = parseInt(process.env.FREE_CREDITS || '2');

    // Check if user exists by email first (to link accounts if needed)
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
        // Link existing user to Clerk
        const result = await query(
            `UPDATE users 
             SET clerk_id = $1, name = COALESCE($2, name), image = COALESCE($3, image), updated_at = NOW() 
             WHERE id = $4 
             RETURNING *`,
            [data.clerkId, data.name || null, data.image || null, existingUser.id]
        );
        return result.rows[0];
    }

    // Create new user
    const result = await query(
        `INSERT INTO users (clerk_id, email, name, image, credits) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [data.clerkId, data.email, data.name || null, data.image || null, freeCredits]
    );

    const user = result.rows[0];

    // Create initial credits transaction
    await query(
        `INSERT INTO credit_transactions (user_id, transaction_type, credits_changed, credits_after) 
         VALUES ($1, 'initial_credits', $2, $3)`,
        [user.id, freeCredits, freeCredits]
    );

    return user;
}

/**
 * Update user from Clerk webhook
 */
export async function updateUserFromClerk(data: {
    clerkId: string;
    email: string;
    name?: string;
    image?: string;
}): Promise<User> {
    const result = await query(
        `UPDATE users 
         SET email = $1, name = $2, image = $3, updated_at = NOW() 
         WHERE clerk_id = $4 
         RETURNING *`,
        [data.email, data.name || null, data.image || null, data.clerkId]
    );
    return result.rows[0];
}

/**
 * Delete user by Clerk ID
 */
export async function deleteUserByClerkId(clerkId: string): Promise<void> {
    await query('DELETE FROM users WHERE clerk_id = $1', [clerkId]);
}



/**
 * Update user profile
 */
export async function updateUserProfile(
    userId: string,
    updates: Partial<Pick<User, 'name' | 'email'>>
): Promise<User> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
        fields.push(`name = $${paramIndex++}`);
        values.push(updates.name);
    }

    if (updates.email !== undefined) {
        fields.push(`email = $${paramIndex++}`);
        values.push(updates.email);
    }

    fields.push(`updated_at = NOW()`);
    values.push(userId);

    const result = await query(
        `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
        values
    );

    if (result.rows.length === 0) {
        throw new Error('User not found');
    }

    return result.rows[0];
}

