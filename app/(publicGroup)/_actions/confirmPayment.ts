'use server';

import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ActionState, ApiResponse } from '@/lib/types';

export async function confirmPayment(
    sessionId: string
): Promise<ActionState & { bookingId?: string; amount?: number }> {
    try {
        const res = await backendFetch<ApiResponse<{ bookingId: string; amount: number }>>('/payments/confirm', {
            method: 'POST',
            body: JSON.stringify({ sessionId }),
        });
        return { success: true, bookingId: res.data.bookingId, amount: res.data.amount };
    }

    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not confirm payment' };
    }
}