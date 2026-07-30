import ServiceSkeleton from '../_components/services/ServiceSkeleton';

export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-5 py-12 animate-pulse">
            <div className="h-4 w-24 bg-ink-100 rounded" />
            <div className="h-9 w-64 bg-ink-100 rounded mt-4" />
            <div className="h-4 w-40 bg-ink-100 rounded mt-3" />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <ServiceSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}