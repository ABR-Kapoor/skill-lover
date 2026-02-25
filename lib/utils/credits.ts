import { getUserById } from '../db/users';
import { updateUserCredits } from '../db/credits';
import { createTransaction } from '../db/transactions';

const CREDITS_PER_PURCHASE = parseInt(process.env.CREDITS_PER_PURCHASE || '4');
const CREDIT_PRICE_INR = parseInt(process.env.CREDIT_PRICE_INR || '20');

/**
 * Check if user has enough credits
 */
export async function hasEnoughCredits(
    userId: string,
    required: number = 1
): Promise<boolean> {
    const user = await getUserById(userId);
    if (!user) return false;
    return user.credits >= required;
}

/**
 * Deduct credits from user account
 */
export async function deductCredit(
    userId: string,
    amount: number = 1,
    transactionType: 'roadmap_generation' | 'ats_analysis'
): Promise<{ success: boolean; creditsRemaining: number }> {
    const user = await getUserById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.credits < amount) {
        throw new Error('Insufficient credits');
    }

    // Update credits
    const updatedUser = await updateUserCredits(user.id, -amount);

    // Create transaction record
    await createTransaction({
        userId: user.id,
        transactionType,
        creditsChanged: -amount,
        creditsAfter: updatedUser.credits,
    });

    return {
        success: true,
        creditsRemaining: updatedUser.credits,
    };
}

/**
 * Add credits to user account (purchase)
 */
export async function addCredits(
    userId: string,
    amount: number = CREDITS_PER_PURCHASE,
    paymentId?: string
): Promise<{ success: boolean; creditsAfter: number }> {
    const user = await getUserById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Update credits
    const updatedUser = await updateUserCredits(user.id, amount);

    // Create transaction record
    await createTransaction({
        userId: user.id,
        transactionType: 'credit_purchase',
        creditsChanged: amount,
        creditsAfter: updatedUser.credits,
        paymentId,
        amountPaid: CREDIT_PRICE_INR,
        currency: 'INR',
    });

    return {
        success: true,
        creditsAfter: updatedUser.credits,
    };
}

/**
 * Get user's current credit balance
 */
export async function getCreditBalance(userId: string): Promise<number> {
    const user = await getUserById(userId);
    return user?.credits || 0;
}

/**
 * Get credit pricing info
 */
export function getCreditPricing() {
    return {
        creditsPerPurchase: CREDITS_PER_PURCHASE,
        priceInr: CREDIT_PRICE_INR,
        pricePerCredit: CREDIT_PRICE_INR / CREDITS_PER_PURCHASE,
    };
}

