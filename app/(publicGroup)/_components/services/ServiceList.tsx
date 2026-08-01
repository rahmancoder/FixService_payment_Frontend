import { Service } from '@/lib/types';
import ServiceCard from './ServiceCard';
import EmptyState from '@/components/shared/empty-state';
import Pagination from '@/components/shared/pagination';

export default function ServiceList({
    services,
    page,
    totalPages,
    searchParams,
}: {
    services: Service[];
    page: number;
    totalPages: number;
    searchParams: Record<string, string | undefined>;
}) {
    if (services.length === 0) {
        return (
            <EmptyState
                title="No services match those filters"
                description="Try widening your search or clearing filters to see everything on offer."
                actionHref="/services"
                actionLabel="Clear filters"
            />
        );
    }

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {services.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}

            </div>
            <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
        </>
    );
}