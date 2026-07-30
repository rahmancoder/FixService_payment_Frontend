export default function TechnicianSkeleton() {
    return (
        <div className="docket p-5 h-48 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-ink-100" />

                <div className="flex-1">
                    <div className="h-4 w-2/3 bg-ink-100 rounded" />
                    <div className="h-3 w-1/3 bg-ink-100 rounded mt-2" />
                </div>

            </div>
            <div className="h-4 w-full bg-ink-100 rounded mt-4" />
            <div className="h-4 w-2/3 bg-ink-100 rounded mt-1" />
        </div>
    );
}