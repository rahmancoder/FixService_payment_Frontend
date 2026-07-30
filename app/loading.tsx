export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-5 py-24 flex flex-col items-center gap-3">

            <span className="font-mono text-xs uppercase tracking-widest text-ink-400 animate-pulse">
                Global Loading…
            </span>

            <div className="h-1 w-40 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full w-1/3 animate-pulse bg-rust" />
            </div>

        </div>
    );
}