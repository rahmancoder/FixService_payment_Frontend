'use server';

import { ActionState } from '@/lib/types';
import { ContactFormValues } from '@/lib/schemas';

export async function sendContactMessage(data: ContactFormValues): Promise<ActionState> {
    await new Promise(resolve => setTimeout(resolve, 400)); // simulate network latency

    console.log('[contact] new message received:', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
    });

    return { success: true };
}
