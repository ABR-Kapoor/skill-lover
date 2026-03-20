import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getUserByClerkId } from '@/lib/db/users';
import { createRoadmap } from '@/lib/db/roadmaps';
import { deductCredit } from '@/lib/utils/credits';
import { generateJSON } from '@/lib/ai';
import { getRoadmapGenerationPrompt } from '@/lib/gemini/prompts';
import { RoadmapGenerationSchema, RoadmapContentSchema } from '@/lib/utils/validators';
import { calculateDuration, calculateTotalHours } from '@/lib/utils/roadmap-calculator';
import type { RoadmapContent } from '@/types/database';

// Vercel serverless function config - extend timeout for AI generation
export const maxDuration = 60; // seconds (requires Vercel Pro for >10s)

export async function POST(req: Request) {
    try {
        console.log('🚀 Starting roadmap generation...');

        // Get current user from Clerk
        let clerkUser;
        try {
            clerkUser = await currentUser();
            console.log('Clerk user:', clerkUser ? 'Found' : 'Not found');
        } catch (clerkError) {
            console.error('❌ Clerk authentication error:', clerkError);
            return NextResponse.json(
                { success: false, error: 'Authentication service error', details: String(clerkError) },
                { status: 500 }
            );
        }

        if (!clerkUser) {
            console.log('❌ No authenticated user');
            return NextResponse.json(
                { success: false, error: 'Unauthorized - Please sign in' },
                { status: 401 }
            );
        }

        // Get user from Neon database
        console.log('🔍 Looking for user with Clerk ID:', clerkUser.id);
        console.log('📧 Clerk email:', clerkUser.emailAddresses[0]?.emailAddress);
        const user = await getUserByClerkId(clerkUser.id);

        if (!user) {
            console.log('❌ User not found in database');
            console.log('💡 To manually create user, run this SQL in Neon:');
            console.log(`INSERT INTO users (clerk_id, email, name, credits) VALUES ('${clerkUser.id}', '${clerkUser.emailAddresses[0]?.emailAddress}', '${clerkUser.firstName || ''} ${clerkUser.lastName || ''}', 2);`);
            return NextResponse.json(
                { success: false, error: 'User not found in database. Check server logs for setup SQL.' },
                { status: 404 }
            );
        }

        console.log('✅ Auth successful, User ID:', user.id);

        const body = await req.json();
        console.log('📝 Request body:', body);

        // Validate input
        const validatedInput = RoadmapGenerationSchema.parse(body);
        console.log('✅ Input validated');

        // Check credits
        console.log('👤 User:', `${user.email} (${user.credits} credits)`);

        if (user.credits < 1) {
            return NextResponse.json(
                { success: false, error: 'Insufficient credits' },
                { status: 402 }
            );
        }

        // Calculate duration
        const duration = calculateDuration(validatedInput.intensity);
        console.log('⏱️ Duration calculated:', duration);

        // Generate roadmap using AI (with automatic fallback)
        console.log('🤖 Calling AI for roadmap generation...');
        const prompt = getRoadmapGenerationPrompt(validatedInput);

        const aiResponse = await generateJSON(prompt, RoadmapContentSchema);
        console.log('✅ AI response received');

        // Validate AI response
        const validatedContent = RoadmapContentSchema.parse(aiResponse);
        console.log('✅ AI response validated');

        // Deduct credit
        await deductCredit(user.id, 1, 'roadmap_generation');
        console.log('💳 Credit deducted');

        // Save to database
        const roadmap = await createRoadmap({
            userId: user.id,
            title: validatedContent.title,
            type: validatedInput.type,
            intensity: validatedInput.intensity,
            targetRole: validatedInput.targetRole,
            durationMonths: duration.months,
            currentSkills: validatedInput.currentSkills || [],
            content: validatedContent,
        });
        console.log('💾 Roadmap saved to database');

        return NextResponse.json({
            success: true,
            data: roadmap,
        });

    } catch (error: any) {
        console.error('❌ Error in roadmap generation:', error);
        console.error('Error stack:', error.stack);

        if (error.message?.includes('Insufficient credits')) {
            return NextResponse.json(
                { success: false, error: 'Insufficient credits' },
                { status: 402 }
            );
        }

        if (error.name === 'ZodError') {
            console.error('Zod validation errors:', error.errors);
            return NextResponse.json(
                { success: false, error: 'Invalid input data', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to generate roadmap' },
            { status: 500 }
        );
    }
}
