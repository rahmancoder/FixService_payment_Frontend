import { getTechnicians } from '../_actions/getTechnicians';
import TechnicianList from '../_components/technicians/TechnicianList';
import { Badge } from '@/components/ui/badge';
import TechnicianSearchBar from '../_components/technicians/TechnicianSearchBar';

export const dynamic = 'force-dynamic';

export default async function TechniciansPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    // FIX: Await searchParams 
    const resolvedSearchParams = await searchParams;

    const technicians = await getTechnicians(resolvedSearchParams);
    const page = technicians?.meta?.page || 1;
    const totalPages = technicians?.meta ? Math.ceil(technicians.meta.total / technicians.meta.limit) : 1;

    return (
        <div className="mx-auto max-w-6xl px-5 py-12">
            <div className="border-b border-ink-100 pb-8 mb-8">
                <Badge variant="warning">Verified pros</Badge>
                <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold text-ink-950">Find a technician</h1>
                <p className="mt-2 text-ink-500">
                    {technicians?.meta?.total ?? technicians?.data?.length ?? 0} technicians ready to take the job.
                </p>
            </div>


            <TechnicianSearchBar searchParams={resolvedSearchParams} />
            <TechnicianList
                technicians={technicians?.data ?? []}
                page={page}
                totalPages={totalPages}
                searchParams={resolvedSearchParams}
            />
        </div>
    );
}