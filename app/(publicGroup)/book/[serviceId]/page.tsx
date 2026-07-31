import { notFound } from 'next/navigation';
import { getServiceById } from '../../_actions/getServices';
import { getTechnicianById } from '../../_actions/getTechnicians';
import BookingForm from './BookingForm';
import { Badge } from '@/components/ui/badge';

// proxy.ts already guarantees only an authenticated CUSTOMER reaches
// /book/* (see the pathname.startsWith('/book') branch) — no session/role
// check needed here.
export default async function BookServicePage({
    params,
}: {
    params: Promise<{ serviceId: number }>;
}) {
    const { serviceId } = await params;

    const service = await getServiceById(serviceId);
    if (!service) notFound();

    // Fetch the technician's weekly availability windows so the time-slot
    // picker can show real working hours instead of a bare datetime input.
    const technician = service.technicianId ? await getTechnicianById(service.technicianId) : null;

    return (
        <div className="mx-auto max-w-lg px-5 py-16">
            <Badge variant="warning">New booking request</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-950">{service.title}</h1>
            <p className="mt-2 text-ink-500 text-sm">
                with {service.technician?.user?.name} · from the technicians location
            </p>

            <BookingForm service={service} availability={technician?.availability || []} />
        </div>
    );
}