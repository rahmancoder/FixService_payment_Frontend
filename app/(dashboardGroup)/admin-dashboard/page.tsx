
import { backendFetch } from '@/lib/backendFetch';
import { ApiResponse, Booking, Category, User } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import AdminDashboardTabs from './AdminDashboardTabs';
import StatsCard from '../_components/StatsCard';
import BookingStatusChart from '../_components/BookingStatusChart';
import DistributionPieChart from '../_components/DistributionPieChart';

export const dynamic = 'force-dynamic';

async function getAdminData(searchParams: Record<string, string | undefined>) {
    const usersParams = new URLSearchParams();
    // usersParams.set('limit', '10');
    // if (searchParams.page) usersParams.set('page', searchParams.page);
    // if (searchParams.searchTerm) usersParams.set('searchTerm', searchParams.searchTerm);
    // if (searchParams.role) usersParams.set('role', searchParams.role);

    const [users, allUsers, bookings, categories] = await Promise.all([
        backendFetch<ApiResponse<User[]>>(`/admin/users?${usersParams.toString()}`),
        backendFetch<ApiResponse<User[]>>('/admin/users?limit=200'),
        backendFetch<ApiResponse<Booking[]>>('/admin/bookings?limit=50'),
        backendFetch<ApiResponse<Category[]>>('/categories'),
    ]);

    return {
        users: users.data,
        // usersMeta: users.meta || { page: 1, limit: 10, total: users.data.length },
        // usersMeta: users.meta || { page: 1, total: users.data.length },

        allUsers: allUsers.data,
        bookings: bookings.data,
        categories: categories.data,
    };
}


export default async function AdminDashboardPage({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const { users, allUsers, bookings, categories } = await getAdminData(searchParams);

    const activeBookings = bookings.filter(b =>
        ['REQUESTED', 'ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status)
    ).length;


    const revenue = bookings.reduce((sum, b) => {
        return b.payment?.status === 'COMPLETED' ? sum + b.payment.amount : sum;
    }, 0);

    const statusOrder = ['REQUESTED', 'ACCEPTED', 'DECLINED', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    const bookingsByStatus = statusOrder
        .map(status => ({ status, count: bookings.filter(b => b.status === status).length }))
        .filter(row => row.count > 0);

    const roleDistribution = ['CUSTOMER', 'TECHNICIAN', 'ADMIN']
        .map(role => ({ name: role, value: allUsers.filter(u => u.role === role).length }))
        .filter(row => row.value > 0);


    const paymentStatusOrder = ['PENDING', 'COMPLETED', 'FAILED'];
    const paymentsByStatus = paymentStatusOrder
        .map(status => ({ status, count: bookings.filter(b => b.payment?.status === status).length }))
        .filter(row => row.count > 0);

    return (
        <div className="mx-auto max-w-5xl px-5 py-12">
            <Badge variant="warning">Admin dashboard</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-950 dark:text-white">Platform oversight</h1>
            <p className="mt-2 text-ink-500 dark:text-ink-400">Global snapshot of everything moving through FixItNow.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* <StatsCard label="Total users" value={String(usersMeta.total)} /> */}
                <StatsCard label="Active bookings" value={String(activeBookings)} />
                <StatsCard label="Categories" value={String(categories.length)} />
                <StatsCard label="Revenue collected" value={`$${revenue.toFixed(2)}`} accent />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
                <BookingStatusChart data={bookingsByStatus} />
                <BookingStatusChart
                    data={paymentsByStatus.map(p => ({ status: p.status, count: p.count }))}
                    title="Payments by status"
                    subtitle="Derived from the payment attached to each booking."
                    emptyMessage="No payments yet — this fills in once a customer pays for an accepted booking."
                    barColor="#2F6E5E"
                />
                <DistributionPieChart
                    title="Users by role"
                    subtitle="Across all registered accounts."
                    data={roleDistribution}
                    emptyMessage="No registered users to show yet."
                />
            </div>

            <AdminDashboardTabs
                users={users}
                // usersMeta={usersMeta}
                searchParams={searchParams}
                bookings={bookings}
                categories={categories}
            />
        </div>
    );
}
