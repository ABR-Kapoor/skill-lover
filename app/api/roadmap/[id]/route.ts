import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';
import { getRoadmapById, updateRoadmap, deleteRoadmap } from '@/lib/db/roadmaps';
import { getUserByClerkId } from '@/lib/db/users';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const clerkId = await requireAuth();
        const { id } = await params;

        const roadmap = await getRoadmapById(id);

        if (!roadmap) {
            return NextResponse.json(
                { success: false, error: 'Roadmap not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        const user = await getUserByClerkId(clerkId);
        if (!user || roadmap.user_id !== user.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            data: roadmap,
        });
    } catch (error) {
        console.error('Get roadmap error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get roadmap' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const clerkId = await requireAuth();
        const { id } = await params;
        const body = await req.json();

        const roadmap = await getRoadmapById(id);

        if (!roadmap) {
            return NextResponse.json(
                { success: false, error: 'Roadmap not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        const user = await getUserByClerkId(clerkId);
        if (!user || roadmap.user_id !== user.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 403 }
            );
        }

        const updatedRoadmap = await updateRoadmap(id, {
            title: body.title,
            content: body.content,
            is_custom_edited: true,
        });

        return NextResponse.json({
            success: true,
            data: updatedRoadmap,
            message: 'Roadmap updated successfully',
        });
    } catch (error) {
        console.error('Update roadmap error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update roadmap' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const clerkId = await requireAuth();
        const { id } = await params;

        const roadmap = await getRoadmapById(id);

        if (!roadmap) {
            return NextResponse.json(
                { success: false, error: 'Roadmap not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        const user = await getUserByClerkId(clerkId);
        if (!user || roadmap.user_id !== user.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 403 }
            );
        }

        await deleteRoadmap(id);

        return NextResponse.json({
            success: true,
            message: 'Roadmap deleted successfully',
        });
    } catch (error) {
        console.error('Delete roadmap error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete roadmap' },
            { status: 500 }
        );
    }
}
