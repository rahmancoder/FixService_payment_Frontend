'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ActionState, ApiResponse, Booking, BookingStatus } from '@/lib/types';
import { ReviewFormValues } from '@/lib/schemas';





export async function payForBooking(bookingId: string): Promise<ActionState & { sessionUrl?: string }> {

    try {
        const res = await backendFetch<ApiResponse<{ sessionUrl: string }>>('/payments/create', {
            method: 'POST',
            body: JSON.stringify({ bookingId }),
        });

        return { success: true, sessionUrl: res.data.sessionUrl };

    }

    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not start payment' };
    }
}



export async function submitReview(bookingId: string, data: ReviewFormValues): Promise<ActionState> {

    try {
        await backendFetch('/reviews', {
            method: 'POST',
            body: JSON.stringify({ bookingId, rating: data.rating, comment: data.comment || undefined }),
        });
    }

    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not submit review' };
    }

    revalidatePath(`/dashboard/my-bookings/${bookingId}`);
    return { success: true };
}




export async function updateBookingStatus(
    bookingId: string,
    status: BookingStatus
): Promise<ActionState> {
    try {
        await backendFetch<ApiResponse<Booking>>(`/technician/bookings/${bookingId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    }

    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not update booking' };
    }

    revalidatePath('/technician-dashboard');
    return { success: true };
}



export async function cancelBooking(bookingId: string): Promise<ActionState> {

    try {
        await backendFetch(`/bookings/${bookingId}/cancel`, { method: 'PATCH' });
    }

    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not cancel booking' };
    }

    revalidatePath(`/dashboard/my-bookings/${bookingId}`);
    revalidatePath('/dashboard/my-bookings');

    return { success: true };
}