'use server';

import { ActionState } from '@/lib/types';

/**
 * NOTE: there's no mailing-list provider (Mailchimp/ConvertKit/etc) connected
 * yet. This validates and logs the signup so the form is fully functional,
 * but nobody actually gets added to a list until one is wired up here.
 */
export async function subscribeNewsletter(email: string): Promise<ActionState> {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return { error: 'Enter a valid email address.' };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('[newsletter] signup received:', email);

    return { success: true };
}
