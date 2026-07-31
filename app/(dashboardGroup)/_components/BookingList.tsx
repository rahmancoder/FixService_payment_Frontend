import { Booking } from '@/lib/types';
import BookingCard from './BookingCard';
import EmptyState from '@/components/shared/empty-state';

export default function BookingList({
    bookings,
    hrefFor,
    emptyTitle,
    emptyDescription,
    subtitleFor,
    actionsFor,
}: {
    bookings: Booking[];
    hrefFor?: (booking: Booking) => string;
    emptyTitle: string;
    emptyDescription: string;
    subtitleFor?: (booking: Booking) => string;
    actionsFor?: (booking: Booking) => React.ReactNode;
}) {
    if (bookings.length === 0) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    return (
        <div className="space-y-3">
            {bookings.map(booking => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    href={hrefFor?.(booking)}
                    subtitle={subtitleFor?.(booking)}
                    actions={actionsFor?.(booking)}
                />
            ))}
        </div>
    );
}