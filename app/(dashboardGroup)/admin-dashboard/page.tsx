import { backendFetch } from '@/lib/backendFetch';
import { ApiResponse, Booking, Category, User } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import AdminDashboardTabs from './AdminDashboardTabs';
import StatsCard from '../_components/StatsCard';

export const dynamic = 'force-dynamic';

async function getAdminData() {
    const [users, bookings, categories] = await Promise.all([

        backendFetch<ApiResponse<User[]>>('/admin/users?limit=50'),

        backendFetch<ApiResponse<Booking[]>>('/admin/bookings?limit=50'),

        backendFetch<ApiResponse<Category[]>>('/categories'),
    ]);

    return { users: users.data, bookings: bookings.data, categories: categories.data };
}

// proxy.ts already guarantees only an authenticated ADMIN reaches this
// page — no session/role check needed here.
export default async function AdminDashboardPage() {
    const { users, bookings, categories } = await getAdminData();

    const activeBookings = bookings.filter(b =>
        ['REQUESTED', 'ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status)
    ).length;

    // Computed from the booking list already fetched above — the backend
    // doesn't expose a dedicated admin revenue/payments endpoint yet, so this
    // sums completed payments attached to the bookings we already have.
    const revenue = bookings.reduce((sum, b) => {
        return b.payment?.status === 'COMPLETED' ? sum + b.payment.amount : sum;
    }, 0);

    return (
        <div className="mx-auto max-w-5xl px-5 py-12">
            <Badge variant="warning">Admin dashboard</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-950">Platform oversight</h1>
            <p className="mt-2 text-ink-500">Global snapshot of everything moving through FixItNow.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard label="Total users" value={String(users.length)} />
                <StatsCard label="Active bookings" value={String(activeBookings)} />
                <StatsCard label="Categories" value={String(categories.length)} />

                <StatsCard label="Revenue collected" value={`$${revenue.toFixed(2)}`} accent />
            </div>

            <AdminDashboardTabs users={users} bookings={bookings} categories={categories} />
        </div>
    );
}