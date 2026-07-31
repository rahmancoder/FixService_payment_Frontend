import { cn } from '@/lib/utils';

export default function StatsCard({
    label,
    value,
    accent = false,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="docket p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-400">{label}</p>
            <p className={cn('mt-1.5 font-display text-2xl font-bold', accent ? 'text-rust-600' : 'text-ink-950')}>
                {value}
            </p>
        </div>
    );
}