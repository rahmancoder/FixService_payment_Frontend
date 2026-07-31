import Link from 'next/link';
import { notFound } from 'next/navigation';
import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ApiResponse, Booking } from '@/lib/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import StatusBadge from '@/components/shared/status-badge';
import BookingActions from './BookingActions';

async function getBooking(id: string): Promise<Booking | null> {
    try {
        const json = await backendFetch<ApiResponse<Booking>>(`/bookings/${id}`);
        return json.data;
    }

    catch (err) {
        if (err instanceof BackendFetchError && err.status === 404) return null;
        throw err;
    }
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const booking = await getBooking(id);

    if (!booking) notFound();

    return (
        <div>
            <Link href="/dashboard/my-bookings" className="text-sm text-ink-500 hover:text-rust-600 font-mono">
                ← Back to bookings
            </Link>

            <div className="docket mt-6 p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <StatusBadge status={booking.status} />
                        <h1 className="mt-3 font-display text-2xl font-bold text-ink-950">{booking.service?.title}</h1>
                        <p className="mt-1 text-sm text-ink-500">Booking #{booking.id.slice(0, 8)}</p>
                    </div>

                    <span className="font-mono text-2xl font-bold text-rust-600">
                        {booking.service && formatCurrency(booking.service.price)}
                    </span>
                </div>

                <dl className="mt-6 pt-6 border-t border-dashed border-ink-100 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <dt className="text-ink-400 font-mono text-xs uppercase">Technician</dt>
                        <dd className="mt-1 text-ink-900 font-medium">{booking.technician?.user?.name}</dd>
                    </div>

                    <div>
                        <dt className="text-ink-400 font-mono text-xs uppercase">Scheduled for</dt>
                        <dd className="mt-1 text-ink-900 font-medium">{formatDateTime(booking.scheduledAt)}</dd>
                    </div>
                    {booking.address && (
                        <div className="col-span-2">
                            <dt className="text-ink-400 font-mono text-xs uppercase">Address</dt>
                            <dd className="mt-1 text-ink-900">{booking.address}</dd>
                        </div>
                    )}
                    {booking.notes && (
                        <div className="col-span-2">
                            <dt className="text-ink-400 font-mono text-xs uppercase">Notes</dt>
                            <dd className="mt-1 text-ink-900">{booking.notes}</dd>
                        </div>
                    )}
                    {booking.payment && (
                        <div className="col-span-2">
                            <dt className="text-ink-400 font-mono text-xs uppercase">Payment</dt>
                            <dd className="mt-1 flex items-center gap-2">
                                <StatusBadge status={booking.payment.status} />
                                <span className="text-ink-500 text-xs font-mono">{booking.payment.transactionId}</span>
                            </dd>
                        </div>

                    )}
                </dl>

                <BookingActions booking={booking} />
            </div>
        </div>
    );
}