import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * Get the current authenticated user's Clerk ID
 */
export async function getCurrentUserId(): Promise<string | null> {
    const { userId } = await auth();
    return userId;
}

/**
 * Get the current authenticated user's full details
 */
export async function getCurrentUser() {
    return await currentUser();
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<string> {
    const userId = await getCurrentUserId();

    if (!userId) {
        throw new Error('Unauthorized');
    }

    return userId;
}
