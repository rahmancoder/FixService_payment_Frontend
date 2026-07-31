'use server';

import { redirect } from 'next/navigation';
import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ActionState, ApiResponse, Booking } from '@/lib/types';
import { BookingFormValues } from '@/lib/schemas';

export async function createBooking(serviceId: number, data: BookingFormValues): Promise<ActionState> {
    const scheduledAt = new Date(`${data.scheduledDate}T${data.scheduledTime}`);

    if (Number.isNaN(scheduledAt.getTime())) {
        return { error: 'Please choose a valid date and time.' };
    }


    let booking: Booking;
    try {
        const res = await backendFetch<ApiResponse<Booking>>('/bookings', {
            method: 'POST',

            body: JSON.stringify({
                serviceId,
                scheduledAt: scheduledAt.toISOString(),
                address: data.address || undefined,
                notes: data.notes || undefined,
            }),
        });

        booking = res.data;
    }

    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not create booking' };
    }

    redirect(`/dashboard/my-bookings/${booking.id}`);
}