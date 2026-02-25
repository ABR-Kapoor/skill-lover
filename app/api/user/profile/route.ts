import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';
import { getUserByClerkId, updateUserProfile } from '@/lib/db/users';

/**
 * GET /api/user/profile
 * Get user profile
 */
export async function GET() {
    try {
        const clerkId = await requireAuth();

        const user = await getUserByClerkId(clerkId);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Error getting profile:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get profile' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/user/profile
 * Update user profile
 */
export async function PATCH(req: Request) {
    try {
        const clerkId = await requireAuth();
        const body = await req.json();

        const user = await getUserByClerkId(clerkId);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const updatedUser = await updateUserProfile(user.id, {
            name: body.name,
            email: body.email,
        });

        return NextResponse.json({
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
