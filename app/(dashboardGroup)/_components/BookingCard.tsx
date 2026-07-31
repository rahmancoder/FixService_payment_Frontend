import Link from 'next/link';
import { Booking } from '@/lib/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import StatusBadge from '@/components/shared/status-badge';

export default function BookingCard({
    booking,
    href,
    subtitle,
    actions,
}: {
    booking: Booking;
    href?: string;
    subtitle?: string;
    actions?: React.ReactNode;
}) {
    const content = (
        <div className="docket p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="min-w-0">

                <StatusBadge status={booking.status} />

                <h3 className="mt-2 font-display font-semibold text-ink-950 truncate">{booking.service?.title}</h3>

                <p className="text-sm text-ink-500 mt-0.5">
                    {subtitle || `${booking.technician?.user?.name} · ${formatDateTime(booking.scheduledAt)}`}
                </p>

                {booking.address && <p className="text-xs text-ink-400 mt-0.5">📍 {booking.address}</p>}
            </div>

            <div className="flex items-center gap-3">

                <span className="font-mono font-semibold text-rust-600 whitespace-nowrap">
                    {booking.service && formatCurrency(booking.service.price)}
                </span>

                {actions}
            </div>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}