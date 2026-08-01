'use client';

import { useState } from 'react';
import { Booking, Category, User } from '@/lib/types';
import { cn } from '@/lib/utils';

import AdminBookingsTab from './AdminBookingsTab';
import UsersTab from './UsersTab';
import CategoriesTab from './CategoriesTab';


const tabs = ['Users', 'Bookings', 'Categories'] as const;
type Tab = (typeof tabs)[number];

export default function AdminDashboardTabs({
    users,
    bookings,
    categories,
}: {
    users: User[];
    bookings: Booking[];
    categories: Category[];
}) {
    const [active, setActive] = useState<Tab>('Users');

    return (
        <div className="mt-8">
            <div className="flex gap-1 border-b border-ink-100 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={cn(
                            'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
                            active === tab ? 'border-rust text-ink-950' : 'border-transparent text-ink-400 hover:text-ink-700'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {active === 'Users' && <UsersTab users={users} />}
                {active === 'Bookings' && <AdminBookingsTab bookings={bookings} />}
                {active === 'Categories' && <CategoriesTab categories={categories} />}
            </div>
        </div>
    );
}