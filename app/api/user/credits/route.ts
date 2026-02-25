import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';
import { getCreditBalance, addCredits, getCreditPricing } from '@/lib/utils/credits';
import { getUserTransactions } from '@/lib/db/transactions';
import { getUserByClerkId } from '@/lib/db/users';

/**
 * GET /api/user/credits
 * Get user's credit balance and pricing info
 */
export async function GET() {
    try {
        const clerkId = await requireAuth();

        const balance = await getCreditBalance(clerkId);
        const pricing = getCreditPricing();

        return NextResponse.json({
            success: true,
            data: {
                balance,
                pricing,
            },
        });
    } catch (error) {
        console.error('Error getting credits:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get credits' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/user/credits
 * Purchase credits (mock payment)
 */
export async function POST(req: Request) {
    try {
        const clerkId = await requireAuth();

        // In a real app, you would:
        // 1. Verify payment with payment gateway (Razorpay, Stripe, etc.)
        // 2. Only add credits after successful payment

        // For this academic project, we'll simulate a successful payment
        const mockPaymentId = `mock_${Date.now()}`;

        const result = await addCredits(clerkId, undefined, mockPaymentId);

        return NextResponse.json({
            success: true,
            data: result,
            message: 'Credits purchased successfully',
        });
    } catch (error) {
        console.error('Error purchasing credits:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to purchase credits' },
            { status: 500 }
        );
    }
}
