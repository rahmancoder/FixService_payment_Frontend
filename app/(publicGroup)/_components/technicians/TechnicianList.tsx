import { TechnicianProfile } from '@/lib/types';
import TechnicianCard from './TechnicianCard';
import EmptyState from '@/components/shared/empty-state';
import Pagination from '@/components/shared/pagination';


export default function TechnicianList({
    technicians,
    page,
    totalPages,
    searchParams,
}: {
    technicians: TechnicianProfile[];
    page: number;
    totalPages: number;
    searchParams: Record<string, string | undefined>;
}) {
    if (technicians.length === 0) {
        return (
            <EmptyState
                title="No technicians match those filters"
                description="Try a broader search — new pros join FixItNow every week."
                actionHref="/technicians"
                actionLabel="Clear filters"
            />
        );
    }

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {technicians.map(tech => (
                    <TechnicianCard key={tech.id} technician={tech} />
                ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
        </>
    );
}