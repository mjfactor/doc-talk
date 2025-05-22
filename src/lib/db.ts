import { neon } from '@neondatabase/serverless';

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not defined');
}

// Create a SQL query executor for server components
export const sql = neon(process.env.DATABASE_URL);
