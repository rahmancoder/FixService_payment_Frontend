'use client';

import { useState } from 'react';
import { Availability, Booking, Category, Service, TechnicianProfile } from '@/lib/types';
import { cn } from '@/lib/utils';
import BookingsTab from './BookingsTab';
import ProfileTab from './ProfileTab';
import ServicesTab from './ServicesTab';
import AvailabilityTab from './AvailabilityTab';

const tabs = ['Bookings', 'Profile', 'Services', 'Availability'] as const;
type Tab = (typeof tabs)[number];

export default function TechnicianDashboardTabs({
    profile,
    services,
    availability,
    bookings,
    categories,
}: {
    profile: TechnicianProfile;
    services: Service[];
    availability: Availability[];
    bookings: Booking[];
    categories: Category[];
}) {
    const [active, setActive] = useState<Tab>('Bookings');

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
                        {tab === 'Bookings' && bookings.filter(b => b.status === 'REQUESTED').length > 0 && (
                            <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rust px-1 text-[10px] text-white">
                                {bookings.filter(b => b.status === 'REQUESTED').length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {active === 'Bookings' && <BookingsTab bookings={bookings} />}
                {active === 'Profile' && <ProfileTab profile={profile} />}
                {active === 'Services' && <ServicesTab services={services} categories={categories} />}
                {active === 'Availability' && <AvailabilityTab availability={availability} />}
            </div>
        </div>
    );
}
