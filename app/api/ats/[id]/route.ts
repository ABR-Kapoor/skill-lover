import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';
import { getATSAnalysisById } from '@/lib/db/ats';
import { getUserByClerkId } from '@/lib/db/users';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const clerkId = await requireAuth();
        const { id } = await params;

        const analysis = await getATSAnalysisById(id);

        if (!analysis) {
            return NextResponse.json(
                { success: false, error: 'Analysis not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        const user = await getUserByClerkId(clerkId);
        if (!user || analysis.user_id !== user.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            data: analysis,
        });
    } catch (error) {
        console.error('Get analysis error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get analysis' },
            { status: 500 }
        );
    }
}
