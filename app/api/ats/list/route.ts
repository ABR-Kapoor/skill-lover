import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getUserByClerkId } from '@/lib/db/users';
import { getUserATSAnalyses } from '@/lib/db/ats';

export async function GET() {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await getUserByClerkId(clerkUser.id);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const analyses = await getUserATSAnalyses(user.id);

        return NextResponse.json({
            success: true,
            data: analyses,
        });
    } catch (error: any) {
        console.error('Error fetching ATS analyses:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch analyses' },
            { status: 500 }
        );
    }
}
