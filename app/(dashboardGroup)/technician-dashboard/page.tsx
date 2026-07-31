import { getMe } from '@/service/getMe';
import { backendFetch, API_URL } from '@/lib/backendFetch';
import { ApiResponse, Booking, Category, TechnicianProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import StatsCard from '../_components/StatsCard';
import TechnicianDashboardTabs from './TechnicianDashboardTabs';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
    const [me, bookingsRes, categoriesRes] = await Promise.all([
        getMe(),
        backendFetch<ApiResponse<Booking[]>>('/technician/bookings'),
        fetch(`${API_URL}/categories`, { next: { revalidate: 300 } }).then(r => r.json()),
    ]);

    const technicianId = me?.technicianProfile?.id;
    // const detailRes = technicianId
    //     ? await fetch(`${API_URL}/technicians/${technicianId}`, { cache: 'no-store' }).then(r => r.json())
    //     : { data: null };

    const detailRes = technicianId
        ? await fetch(`${API_URL}/technician/single/${technicianId}`, { cache: 'no-store' }).then(r => r.json())
        : { data: null };

    return {
        profile: me?.technicianProfile as TechnicianProfile,
        detail: detailRes.data as TechnicianProfile | null,
        bookings: bookingsRes.data,
        categories: (categoriesRes.data || []) as Category[],
    };
}

// proxy.ts already guarantees only an authenticated TECHNICIAN reaches this
// page — no session/role check needed here.
export default async function TechnicianDashboardPage() {
    const { profile, detail, bookings, categories } = await getDashboardData();

    const pendingRequests = bookings.filter(b => b.status === 'REQUESTED').length;
    const upcomingJobs = bookings.filter(b => ['ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status)).length;

    // Computed from the technician's own bookings — the backend doesn't expose
    // a dedicated earnings endpoint, so this sums completed payments from the
    // booking list already fetched for the Bookings tab.
    const earnings = bookings.reduce((sum, b) => {
        return b.payment?.status === 'COMPLETED' ? sum + b.payment.amount : sum;
    }, 0);

    return (
        <div className="mx-auto max-w-5xl px-5 py-12">
            <Badge variant="warning">Technician dashboard</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-950">Manage your workshop</h1>
            <p className="mt-2 text-ink-500">
                {profile?.avgRating > 0 ? `${profile.avgRating.toFixed(1)}★ average` : 'No ratings yet'} ·{' '}
                {profile?.totalReviews ?? 0} review{profile?.totalReviews !== 1 ? 's' : ''}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard label="Total earnings" value={`$${earnings.toFixed(2)}`} accent />
                <StatsCard label="Upcoming jobs" value={String(upcomingJobs)} />
                <StatsCard label="Pending requests" value={String(pendingRequests)} />
                <StatsCard label="Services listed" value={String(detail?.services?.length ?? 0)} />
            </div>

            <TechnicianDashboardTabs
                profile={profile}
                services={detail?.services || []}
                availability={detail?.availability || []}
                bookings={bookings}
                categories={categories}
            />
        </div>
    );
}