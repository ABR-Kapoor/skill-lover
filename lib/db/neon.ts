import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure WebSocket for local development
if (process.env.NODE_ENV !== 'production') {
    neonConfig.webSocketConstructor = ws;
}

let pool: Pool | null = null;

/**
 * Get Neon database client (singleton pattern)
 */
export function getNeonClient(): Pool {
    if (!pool) {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        pool = new Pool({ connectionString: process.env.DATABASE_URL });
    }
    return pool;
}

/**
 * Execute a query with the Neon client
 */
export async function query(text: string, params?: any[]) {
    const client = getNeonClient();
    try {
        const result = await client.query(text, params);
        return result;
    } catch (error: any) {
        console.error('Database query error:', error);
        throw new Error(`Database error: ${error.message}`);
    }
}
