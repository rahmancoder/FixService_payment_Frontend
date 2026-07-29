'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="mx-auto max-w-lg px-5 py-24 text-center">

            <Badge variant="destructive" className="mx-auto">System error</Badge>

            <h1 className="mt-4 font-display text-2xl font-bold text-ink-950">Something Went Wrong, Try Later</h1>

            <p className="mt-2 text-ink-500 text-sm">
                {error.message || 'An unexpected error occurred while loading this page.'}
            </p>

            <Button variant="accent" onClick={reset} className="mt-6">
                Try again
            </Button>
        </div>
    );
}