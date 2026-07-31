'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateBookingStatus } from '../_actions/bookingActions';
import { Booking, BookingStatus } from '@/lib/types';
import BookingList from '../_components/BookingList';
import { Button } from '@/components/ui/button';

const nextActions: Partial<Record<BookingStatus, { label: string; status: BookingStatus; variant: 'accent' | 'outline' }[]>> = {
    REQUESTED: [
        { label: 'Accept', status: 'ACCEPTED', variant: 'accent' },
        { label: 'Decline', status: 'DECLINED', variant: 'outline' },
    ],
    PAID: [{ label: 'Start job', status: 'IN_PROGRESS', variant: 'accent' }],
    IN_PROGRESS: [{ label: 'Mark completed', status: 'COMPLETED', variant: 'accent' }],
};

const successMessage: Partial<Record<BookingStatus, string>> = {
    ACCEPTED: 'Booking accepted',
    DECLINED: 'Booking declined',
    IN_PROGRESS: 'Job marked in progress',
    COMPLETED: 'Job marked completed',
};

export default function BookingsTab({ bookings }: { bookings: Booking[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    function handleUpdate(bookingId: string, status: BookingStatus) {
        setLoadingId(bookingId);
        startTransition(async () => {
            const res = await updateBookingStatus(bookingId, status);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(successMessage[status] || 'Booking updated');
                router.refresh();
            }
            setLoadingId(null);
        });
    }

    return (
        <BookingList
            bookings={bookings}
            subtitleFor={b => `${b.customer?.name} · ${new Date(b.scheduledAt).toLocaleString()}`}
            emptyTitle="No bookings yet"
            emptyDescription="Jobs booked by customers will show up here for you to accept or decline."
            actionsFor={booking => (
                <div className="flex gap-2">
                    {(nextActions[booking.status] || []).map(action => (
                        <Button
                            key={action.status}
                            variant={action.variant}
                            size="sm"
                            disabled={isPending && loadingId === booking.id}
                            onClick={() => handleUpdate(booking.id, action.status)}
                        >
                            {isPending && loadingId === booking.id ? '…' : action.label}
                        </Button>
                    ))}
                </div>
            )}
        />
    );
}