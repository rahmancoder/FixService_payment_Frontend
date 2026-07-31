export default function BookingSkeleton() {
    return (
        <div className="docket p-5 flex items-center justify-between gap-4 animate-pulse">

            <div className="min-w-0 flex-1">
                <div className="h-5 w-20 bg-ink-100 rounded" />
                <div className="h-5 w-1/2 bg-ink-100 rounded mt-2" />
                <div className="h-4 w-1/3 bg-ink-100 rounded mt-2" />
            </div>

            <div className="h-5 w-16 bg-ink-100 rounded" />
        </div>
    );
}