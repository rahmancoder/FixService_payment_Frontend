'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { toggleUserStatus } from '../_actions/adminActions';
import { User } from '@/lib/types';
import { formatDate, initials } from '@/lib/utils';
import StatusBadge from '@/components/shared/status-badge';
import EmptyState from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';

export default function UsersTab({ users }: { users: User[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    function handleToggle(user: User) {
        setLoadingId(user.id);
        const nextStatus = user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
        startTransition(async () => {
            const res = await toggleUserStatus(user.id, nextStatus);
            if (res.error) {
                toast.error(res.error);
            }

            else {
                toast.success(nextStatus === 'BANNED' ? `${user.name} banned` : `${user.name} unbanned`);
                router.refresh();
            }
            setLoadingId(null);
        });
    }

    if (users.length === 0) {
        return <EmptyState title="No users yet" description="Registered customers and technicians will appear here." />;
    }

    return (
        <div>
            <div className="docket overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-ink-50 text-left text-xs font-mono uppercase tracking-wide text-ink-400">
                            <th className="px-5 py-3">User</th>
                            <th className="px-5 py-3">Role</th>
                            <th className="px-5 py-3">Joined</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-t border-ink-100">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-paper font-mono text-xs font-semibold">
                                            {initials(user.name)}
                                        </span>
                                        <div>
                                            <p className="font-medium text-ink-900">{user.name}</p>
                                            <p className="text-xs text-ink-400">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-ink-600">{user.role}</td>
                                <td className="px-5 py-3 text-ink-600">{formatDate(user.createdAt)}</td>
                                <td className="px-5 py-3"><StatusBadge status={user.status} /></td>
                                <td className="px-5 py-3 text-right">
                                    {user.role !== 'ADMIN' && (
                                        <Button
                                            variant="ghost"
                                            className={user.status === 'ACTIVE' ? 'text-brick' : 'text-moss-600'}
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
        </div>
    );
}