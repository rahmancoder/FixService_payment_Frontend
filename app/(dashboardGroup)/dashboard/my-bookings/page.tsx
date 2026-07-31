import { backendFetch } from '@/lib/backendFetch';
import { ApiResponse, Booking } from '@/lib/types';
import BookingList from '../../_components/BookingList';

export const dynamic = 'force-dynamic';

async function getBookings() {
    return backendFetch<ApiResponse<Booking[]>>('/bookings');
}

export default async function MyBookingsPage() {
    const { data: bookings } = await getBookings();

    const active = bookings.filter(b => !['COMPLETED', 'CANCELLED', 'DECLINED'].includes(b.status));
    const past = bookings.filter(b => ['COMPLETED', 'CANCELLED', 'DECLINED'].includes(b.status));

    return (
        <div className="space-y-8">
            <section>
                <h2 className="font-mono text-xs uppercase tracking-wide text-ink-400 mb-3">
                    In progress ({active.length})
                </h2>
                <BookingList
                    bookings={active}
                    hrefFor={b => `/dashboard/my-bookings/${b.id}`}
                    emptyTitle="Nothing in progress"
                    emptyDescription="Active bookings will show up here once you request a service."
                />
            </section>

            {past.length > 0 && (
                <section>
                    <h2 className="font-mono text-xs uppercase tracking-wide text-ink-400 mb-3">
                        History ({past.length})
                    </h2>
                    <BookingList
                        bookings={past}
                        hrefFor={b => `/dashboard/my-bookings/${b.id}`}
                        emptyTitle="No history yet"
                        emptyDescription="Completed and cancelled bookings will appear here."
                    />
                </section>
            )}
        </div>
    );
}