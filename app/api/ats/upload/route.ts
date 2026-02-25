import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';

export async function POST(req: Request) {
    try {
        const clerkId = await requireAuth();

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: 'Invalid file type. Only PDF and DOCX are supported.' },
                { status: 400 }
            );
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, error: 'File size must be less than 5MB' },
                { status: 400 }
            );
        }

        // Skip storage upload for now - just return file info
        // In production, you'd set up Supabase storage bucket
        const filename = `${clerkId}_${Date.now()}_${file.name}`;

        return NextResponse.json({
            success: true,
            data: {
                path: filename,
                url: null, // No URL since we're not storing
                filename: file.name,
            },
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
