'use client';

import { useState } from 'react';
import { Booking, Category, User } from '@/lib/types';
import { cn } from '@/lib/utils';
import UsersTab from './UsersTab';
import AdminBookingsTab from './AdminBookingsTab';
import CategoriesTab from './CategoriesTab';

const tabs = ['Users', 'Bookings', 'Categories'] as const;
type Tab = (typeof tabs)[number];

export default function AdminDashboardTabs({
    users,
    // usersMeta,
    searchParams,
    bookings,
    categories,
}: {
    users: User[];
    // usersMeta: { page: number; limit: number; total: number };
    searchParams: Record<string, string | undefined>;
    bookings: Booking[];
    categories: Category[];
}) {
    const [active, setActive] = useState<Tab>('Users');

    return (
        <div className="mt-8">
            <div className="flex gap-1 border-b border-ink-100 dark:border-ink-800 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={cn(
                            'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
                            active === tab ? 'border-rust text-ink-950 dark:text-white' : 'border-transparent text-ink-400 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-200'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {/* {active === 'Users' && <UsersTab users={users} meta={usersMeta} searchParams={searchParams} />} */}

                {active === 'Users' && <UsersTab users={users} searchParams={searchParams} />}

                {active === 'Bookings' && <AdminBookingsTab bookings={bookings} />}
                {active === 'Categories' && <CategoriesTab categories={categories} />}
            </div>
        </div>
    );
}
