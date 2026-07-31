import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { confirmPayment } from '../../_actions/confirmPayment';

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id: sessionId } = await searchParams;

    if (!sessionId) {
        return (
            <div className="mx-auto max-w-lg px-5 py-24 text-center">
                <Badge variant="destructive">Missing session</Badge>
                <h1 className="mt-4 font-display text-2xl font-bold text-ink-950">No payment session found</h1>
                <p className="mt-2 text-ink-500 text-sm">
                    This page is meant to be reached via a Stripe Checkout redirect.
                </p>
                <Button asChild variant="accent" className="mt-6">
                    <Link href="/dashboard">Go to your dashboard</Link>
                </Button>
            </div>
        );
    }

    const result = await confirmPayment(sessionId);

    if (result.error) {
        return (
            <div className="mx-auto max-w-lg px-5 py-24 text-center">
                <Badge variant="destructive">Payment not confirmed</Badge>
                <h1 className="mt-4 font-display text-2xl font-bold text-ink-950">We could not confirm this payment</h1>
                <p className="mt-2 text-ink-500 text-sm">{result.error}</p>
                <Button asChild variant="accent" className="mt-6">
                    <Link href="/dashboard/my-bookings">View your bookings</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-lg px-5 py-24 text-center">
            <Badge variant="success">Payment confirmed</Badge>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink-950">Job docket stamped: PAID ✓</h1>
            <p className="mt-2 text-ink-500 text-sm">
                {result.amount ? `${formatCurrency(result.amount)} — ` : ''}
                Your technician has been notified and will start the job as scheduled.
            </p>
            <Button asChild variant="accent" className="mt-6">
                <Link href={result.bookingId ? `/dashboard/my-bookings/${result.bookingId}` : '/dashboard/my-bookings'}>
                    View booking →
                </Link>
            </Button>
        </div>
    );
}