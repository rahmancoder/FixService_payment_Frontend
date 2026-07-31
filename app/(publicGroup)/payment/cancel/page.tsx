import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PaymentCancelPage() {
    return (
        <div className="mx-auto max-w-lg px-5 py-24 text-center">
            <Badge variant="warning">Payment cancelled</Badge>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink-950">No charge was made</h1>
            <p className="mt-2 text-ink-500 text-sm">
                You closed the Stripe checkout before completing payment. Your booking is still
                accepted and waiting — you can pay any time from your bookings page.
            </p>
            <Button asChild variant="accent" className="mt-6">
                <Link href="/dashboard/my-bookings">Back to my bookings</Link>
            </Button>
        </div>
    );
}