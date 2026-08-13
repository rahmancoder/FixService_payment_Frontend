import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, Category } from '@/lib/types';
import { getServices } from '../_actions/getServices';
import ServiceList from '../_components/services/ServiceList';
import { Badge } from '@/components/ui/badge';
import ServiceSearchBar from '../_components/services/ServiceSearchBar';

export const dynamic = 'force-dynamic'; // always reflect latest filters/listings (SSR)

async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 300 } });
    const json: ApiResponse<Category[]> = await res.json();
    return json.data || [];
}

export default async function ServicesPage({
    searchParams,
}: {
    // searchParams: Record<string, string | undefined>;
    searchParams: Promise<Record<string, string | undefined>>;
}) {

    const resolvedSearchParams = await searchParams;
    const [services, categories] = await Promise.all([getServices(resolvedSearchParams), getCategories()]);
    const page = services.meta?.page || 1;
    const totalPages = services.meta ? Math.ceil(services.meta.total / services.meta.limit) : 1;

    return (
        <div className="mx-auto max-w-6xl px-5 py-12">
            <div className="border-b border-ink-100 pb-8 mb-8">
                <Badge variant="warning">Service catalog</Badge>
                <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold text-ink-950">
                    Browse services
                </h1>

                <p className="mt-2 text-ink-500 dark:text-slate-400">
                    {services.meta?.total ?? services.data.length} job{(services.meta?.total ?? 0) !== 1 ? 's' : ''} listed by verified technicians.
                </p>
            </div>

            <div className="grid lg:grid-cols-[240px_1fr] gap-8">
                <aside>
                    {/* <ServiceSearchBar categories={categories} searchParams={searchParams} /> */}
                    <ServiceSearchBar categories={categories} searchParams={resolvedSearchParams} />

                </aside>

                <div>
                    {/* <ServiceList services={services.data} page={page} totalPages={totalPages} searchParams={searchParams} /> */}
                    <ServiceList services={services.data} page={page} totalPages={totalPages} searchParams={resolvedSearchParams} />

                </div>
            </div>
        </div>
    );
}