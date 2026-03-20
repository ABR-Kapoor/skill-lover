import { NextResponse } from 'next/server';
import { requireAuth, getCurrentUser } from '@/lib/clerk/server';
import { getUserByClerkId, createUserFromClerk } from '@/lib/db/users';
import { createATSAnalysis } from '@/lib/db/ats';
import { deductCredit } from '@/lib/utils/credits';
import { generateJSON } from '@/lib/ai';
import { getATSAnalysisPrompt } from '@/lib/gemini/prompts';
import type { ATSAnalysisResult } from '@/types/database';

export async function POST(req: Request) {
    try {
        console.log('🚀 Starting ATS analysis...');

        const clerkId = await requireAuth();
        const body = await req.json();

        const { resumeText, resumeFilename, resumeUrl, jobDescription } = body;

        console.log('📄 Resume text length:', resumeText?.length);
        console.log('📝 Has job description:', !!jobDescription);

        if (!resumeText || resumeText.length < 50) {
            return NextResponse.json(
                { success: false, error: 'Resume text is too short or missing' },
                { status: 400 }
            );
        }

        // Check credits
        let user = await getUserByClerkId(clerkId);

        // If user not found in local DB, try to sync from Clerk
        if (!user) {
            console.log('⚠️ User not found in local DB, attempting to sync from Clerk...');
            try {
                const clerkUser = await getCurrentUser();
                if (clerkUser) {
                    const email = clerkUser.emailAddresses[0]?.emailAddress;
                    if (email) {
                        user = await createUserFromClerk({
                            clerkId: clerkUser.id,
                            email: email,
                            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
                            image: clerkUser.imageUrl,
                        });
                        console.log('✅ User successfully synced from Clerk:', user.id);
                    }
                }
            } catch (syncError) {
                console.error('❌ Failed to sync user from Clerk:', syncError);
            }
        }

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found in database and failed to sync from Clerk' },
                { status: 404 }
            );
        }

        console.log('👤 User:', user.email, 'Credits:', user.credits);

        if (user.credits < 1) {
            return NextResponse.json(
                { success: false, error: 'Insufficient credits' },
                { status: 402 }
            );
        }

        // Generate analysis with AI (automatic fallback)
        console.log('🤖 Calling AI for analysis...');
        const prompt = getATSAnalysisPrompt(resumeText, jobDescription);
        const analysisResult = await generateJSON<ATSAnalysisResult>(prompt);

        console.log('✅ AI analysis complete. Score:', analysisResult.atsScore);

        // Validate and fix the analysis result
        if (!analysisResult.atsScore || analysisResult.atsScore === 0 || analysisResult.atsScore < 1) {
            console.warn('⚠️ Warning: ATS score is 0 or invalid, calculating fallback score...');

            // Calculate a basic score based on resume content
            const wordCount = resumeText.split(/\s+/).length;
            const hasEmail = /\S+@\S+\.\S+/.test(resumeText);
            const hasPhone = /\d{10}/.test(resumeText);
            const hasExperience = /experience|work|job|position|role/i.test(resumeText);
            const hasSkills = /skills|technologies|tools/i.test(resumeText);
            const hasEducation = /education|degree|university|college/i.test(resumeText);

            let fallbackScore = 30; // Base score
            if (wordCount > 200) fallbackScore += 10;
            if (wordCount > 400) fallbackScore += 10;
            if (hasEmail) fallbackScore += 10;
            if (hasPhone) fallbackScore += 10;
            if (hasExperience) fallbackScore += 15;
            if (hasSkills) fallbackScore += 10;
            if (hasEducation) fallbackScore += 5;

            analysisResult.atsScore = Math.min(fallbackScore, 75); // Cap at 75 for fallback
            console.log('📊 Fallback score calculated:', analysisResult.atsScore);
        }

        // Ensure score is within valid range (1-100)
        analysisResult.atsScore = Math.max(1, Math.min(100, analysisResult.atsScore));

        // Deduct credit
        console.log('💳 Deducting credit from user:', user.id, 'Type:', typeof user.id);
        if (user.id.startsWith('user_')) {
            console.error('❌ CRITICAL ERROR: User ID appears to be a Clerk ID, not a UUID!');
        }
        await deductCredit(user.id, 1, 'ats_analysis');
        console.log('💳 Credit deducted');

        // Save to database
        const analysis = await createATSAnalysis({
            userId: user.id,
            resumeFilename,
            resumeText,
            atsScore: analysisResult.atsScore,
            analysisResult,
            jobDescription,
        });

        console.log('💾 Analysis saved to database');

        return NextResponse.json({
            success: true,
            data: analysis,
            message: 'Analysis completed successfully',
        });
    } catch (error: any) {
        console.error('❌ Analysis error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);

        if (error.message === 'Insufficient credits') {
            return NextResponse.json(
                { success: false, error: 'Insufficient credits' },
                { status: 402 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to analyze resume' },
            { status: 500 }
        );
    }
}
