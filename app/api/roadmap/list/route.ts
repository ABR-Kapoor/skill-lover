import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';
import { getUserRoadmaps } from '@/lib/db/roadmaps';
import { getUserByClerkId } from '@/lib/db/users';

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

        const roadmaps = await getUserRoadmaps(user.id);

        return NextResponse.json({
            success: true,
            data: roadmaps,
        });
    } catch (error) {
        console.error('List roadmaps error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to list roadmaps' },
            { status: 500 }
        );
    }
}
