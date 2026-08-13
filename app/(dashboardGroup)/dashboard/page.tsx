import Link from 'next/link';
import { backendFetch } from '@/lib/backendFetch';
import { ApiResponse, Booking } from '@/lib/types';
import BookingList from '../_components/BookingList';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

async function getRecentBookings() {
    const res = await backendFetch<ApiResponse<Booking[]>>('/bookings');
    return res.data.slice(0, 3);
}

export default async function DashboardOverviewPage() {
    const bookings = await getRecentBookings();

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">Recent activity</h2>
                <Button asChild variant="outline">
                    <Link href="/services">Book a new service →</Link>
                </Button>
            </div>

            <BookingList
                bookings={bookings}
                hrefFor={b => `/dashboard/my-bookings/${b.id}`}
                emptyTitle="No bookings yet"
                emptyDescription="Once you book a service, it'll show up here with live status updates."
            />

            {bookings.length > 0 && (
                <div className="mt-6 text-center">
                    <Link href="/dashboard/my-bookings" className="text-sm text-rust-600 hover:text-rust-700 font-medium">
                        View all bookings →
                    </Link>
                </div>
            )}
        </div>
    );
}
