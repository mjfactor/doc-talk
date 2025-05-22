'use server';

import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
/**
 * Creates a new talk session in the database
 */
export async function createTalkSession(userId: string, userName: string, pdfName: string) {
    try {
        // Generate a unique ID for the session (using a UUID pattern)
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;        // Insert the talk session record
        const result = await sql`
      INSERT INTO talk_session ("id", "userId", "userName", "pdfName", "createdAt", "updatedAt") 
      VALUES (${id}, ${userId}, ${userName}, ${pdfName}, ${createdAt}, ${updatedAt})
      RETURNING "id"
    `;

        // Revalidate the home page to reflect any new data
        revalidatePath('/');

        // Return the newly created session ID
        return { success: true, id: result[0].id };
    } catch (error) {
        console.error('Error creating talk session:', error);
        return { success: false, error: 'Failed to create talk session' };
    }
}
