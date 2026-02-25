import { query } from './neon';
import type { CreditTransaction } from '@/types/database';

/**
 * Create a credit transaction record
 */
export async function createTransaction(data: {
    userId: string;
    transactionType: CreditTransaction['transaction_type'];
    creditsChanged: number;
    creditsAfter: number;
    paymentId?: string;
    amountPaid?: number;
    currency?: string;
}): Promise<CreditTransaction> {
    const result = await query(
        `INSERT INTO credit_transactions (user_id, transaction_type, credits_changed, credits_after, payment_id, amount_paid, currency) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [
            data.userId,
            data.transactionType,
            data.creditsChanged,
            data.creditsAfter,
            data.paymentId || null,
            data.amountPaid || null,
            data.currency || 'INR',
        ]
    );

    return result.rows[0];
}

/**
 * Get user's transaction history
 */
export async function getUserTransactions(
    userId: string,
    limit: number = 50
): Promise<CreditTransaction[]> {
    const result = await query(
        'SELECT * FROM credit_transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
        [userId, limit]
    );
    return result.rows;
}

