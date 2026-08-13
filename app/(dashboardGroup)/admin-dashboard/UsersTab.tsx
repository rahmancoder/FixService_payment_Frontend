'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { toggleUserStatus } from '../_actions/adminActions';
import { User } from '@/lib/types';
import { formatDate, initials } from '@/lib/utils';
import StatusBadge from '@/components/shared/status-badge';
import EmptyState from '@/components/shared/empty-state';
import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UsersTab({
    users,
    // meta,
    searchParams,
}: {
    users: User[];
    // meta: { page: number; limit: number; total: number };
    searchParams: Record<string, string | undefined>;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    // const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

    function handleToggle(user: User) {
        setLoadingId(user.id);
        const nextStatus = user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
        startTransition(async () => {
            const res = await toggleUserStatus(user.id, nextStatus);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(nextStatus === 'BANNED' ? `${user.name} banned` : `${user.name} unbanned`);
                router.refresh();
            }
            setLoadingId(null);
        });
    }

    return (
        <div>
            <form
                action="/admin-dashboard"
                method="GET"
                className="docket p-4 mb-4 grid sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm"
            >
                <Input
                    name="searchTerm"
                    defaultValue={searchParams.searchTerm}
                    placeholder="Search name or email"
                    className="sm:col-span-2 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                />
                <select
                    name="role"
                    defaultValue={searchParams.role || ''}
                    className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-950 dark:border-slate-700 px-3.5 text-sm text-foreground dark:text-slate-100 focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">All roles</option>
                    <option value="CUSTOMER" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Customer</option>
                    <option value="TECHNICIAN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Technician</option>
                    <option value="ADMIN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Admin</option>
                </select>
                <Button type="submit" className="bg-rust hover:bg-rust/90 text-white dark:bg-rust dark:text-white">
                    Filter
                </Button>
            </form>

            {users.length === 0 ? (
                <EmptyState title="No users match those filters" description="Try clearing the search or role filter." />
            ) : (
                <>
                    <div className="docket overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/60 text-left text-xs font-mono uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Role</th>
                                    <th className="px-5 py-3">Joined</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 font-mono text-xs font-semibold border border-slate-200 dark:border-slate-700">
                                                    {initials(user.name)}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-slate-600 dark:text-slate-300 font-medium">{user.role}</td>
                                        <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{formatDate(user.createdAt)}</td>
                                        <td className="px-5 py-3"><StatusBadge status={user.status} /></td>
                                        <td className="px-5 py-3 text-right">
                                            {user.role !== 'ADMIN' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={
                                                        user.status === 'ACTIVE'
                                                            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                                                            : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                                                    }
                                                    disabled={isPending && loadingId === user.id}
                                                    onClick={() => handleToggle(user)}
                                                >
                                                    {isPending && loadingId === user.id ? '…' : user.status === 'ACTIVE' ? 'Ban' : 'Unban'}
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <Pagination currentPage={1} totalPages={5} searchParams={searchParams} />
                    </div>
                </>
            )}
        </div>
    );
}