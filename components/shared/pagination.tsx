import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Pagination({
    currentPage,
    totalPages,
    searchParams,
}: {
    currentPage: number;
    totalPages: number;
    searchParams: Record<string, string | undefined>;
}) {
    if (totalPages <= 1) return null;

    function hrefFor(page: number) {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value && key !== 'page') params.set(key, value);
        });
        params.set('page', String(page));
        return `?${params.toString()}`;
    }

    return (
        <div className="mt-10 flex items-center justify-center gap-2 font-mono text-sm">
            <Button asChild variant="outline" className={currentPage === 1 ? 'pointer-events-none opacity-40' : ''}>
                <Link href={hrefFor(Math.max(1, currentPage - 1))} aria-disabled={currentPage === 1}>
                    ← Prev
                </Link>
            </Button>
            <span className="px-3 text-ink-500 dark:text-ink-400">
                Page {currentPage} of {totalPages}
            </span>
            <Button asChild variant="outline" className={currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}>
                <Link href={hrefFor(Math.min(totalPages, currentPage + 1))} aria-disabled={currentPage === totalPages}>
                    Next →
                </Link>
            </Button>
        </div>
    );
}
