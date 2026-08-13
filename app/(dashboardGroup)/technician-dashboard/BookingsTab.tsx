'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateBookingStatus } from '../_actions/bookingActions';
import { Booking, BookingStatus } from '@/lib/types';
import BookingList from '../_components/BookingList';
import { Button } from '@/components/ui/button';

const nextActions: Partial<Record<BookingStatus, { label: string; status: BookingStatus; variant: 'accept' | 'default' | 'outline' | 'destructive' }[]>> = {
    REQUESTED: [
        { label: 'Accept', status: 'ACCEPTED', variant: 'accept' },
        { label: 'Decline', status: 'DECLINED', variant: 'destructive' },
    ],
    PAID: [{ label: 'Start job', status: 'IN_PROGRESS', variant: 'accept' }],
    IN_PROGRESS: [{ label: 'Mark completed', status: 'COMPLETED', variant: 'accept' }],
};

const successMessage: Partial<Record<BookingStatus, string>> = {
    ACCEPTED: 'Booking accepted',
    DECLINED: 'Booking declined',
    IN_PROGRESS: 'Job marked in progress',
    COMPLETED: 'Job marked completed',
};

function getButtonStyles(variant: 'accept' | 'default' | 'outline' | 'destructive') {
    switch (variant) {
        case 'accept':
            return 'bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:text-white border-transparent transition-colors';
        case 'destructive':
            return 'bg-brick-600 text-white hover:bg-brick-700 dark:bg-red-600 dark:hover:bg-red-500 dark:text-white transition-colors';
        case 'default':
            return 'dark:bg-ink-100 dark:text-ink-950 dark:hover:bg-white transition-colors';
        case 'outline':
            return 'border-ink-200 dark:border-ink-700 dark:bg-ink-800/60 dark:text-ink-100 dark:hover:bg-ink-800 dark:hover:border-ink-500 transition-colors';
        default:
            return '';
    }
}

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
                <div className="flex items-center gap-2">
                    {(nextActions[booking.status] || []).map(action => (
                        <Button
                            key={action.status}
                            variant={action.variant === 'accept' ? 'default' : action.variant}
                            size="sm"
                            disabled={isPending && loadingId === booking.id}
                            onClick={() => handleUpdate(booking.id, action.status)}
                            className={getButtonStyles(action.variant)}
                        >
                            {isPending && loadingId === booking.id ? '…' : action.label}
                        </Button>
                    ))}
                </div>
            )}
        />
    );
}