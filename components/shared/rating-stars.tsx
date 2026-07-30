export default function RatingStars({
    rating,
    count,
    size = 'sm',
}: {
    rating: number;
    count?: number;
    size?: 'sm' | 'md';
}) {
    const rounded = Math.round(rating);
    const starSize = size === 'md' ? 'text-base' : 'text-xs';

    return (
        <span className={`inline-flex items-center gap-1 ${starSize}`}>
            <span className="text-rust tracking-tight">
                {'★'.repeat(rounded)}
                <span className="text-ink-100">{'★'.repeat(5 - rounded)}</span>
            </span>
            <span className="font-mono text-ink-500 text-xs">
                {rating > 0 ? rating.toFixed(1) : 'New'}
                {typeof count === 'number' ? ` (${count})` : ''}
            </span>
        </span>
    );
}