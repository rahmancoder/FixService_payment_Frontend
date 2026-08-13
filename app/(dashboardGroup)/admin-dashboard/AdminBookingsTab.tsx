import { Booking } from '@/lib/types';
import BookingList from '../_components/BookingList';

export default function AdminBookingsTab({ bookings }: { bookings: Booking[] }) {
    return (
        <BookingList
            bookings={bookings}
            subtitleFor={b => `${b.customer?.name} → ${b.technician?.user?.name} · ${new Date(b.scheduledAt).toLocaleString()}`}
            emptyTitle="No bookings yet"
            emptyDescription="All bookings placed on the platform will appear here."
        />
    );
}
