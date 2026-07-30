import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptyState({
    title,
    description,
    actionHref,
    actionLabel,
}: {
    title: string;
    description: string;
    actionHref?: string;
    actionLabel?: string;
}) {
    return (
        <div className="docket flex flex-col items-center text-center px-8 py-16">
            <span className="font-mono text-3xl text-ink-200">— / —</span>

            <h3 className="mt-4 font-display text-xl font-semibold text-ink-950">{title}</h3>
            <p className="mt-2 text-sm text-ink-500 max-w-sm">{description}</p>

            {actionHref && actionLabel && (
                <Button asChild variant="outline" className="mt-6">
                    <Link href={actionHref}>{actionLabel}</Link>
                </Button>
            )}

        </div>
    );
}