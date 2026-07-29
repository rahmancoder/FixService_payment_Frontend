import Link from 'next/link';
import { Badge } from '@/components/ui/badge';


export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { href: '/dashboard', label: 'Overview' },
        { href: '/dashboard/my-bookings', label: 'My bookings' },
        { href: '/dashboard/payments', label: 'Payments' },
        { href: '/dashboard/profile', label: 'Profile' },
    ];

    return (
        <div className="mx-auto max-w-4xl px-5 py-12">
            <Badge variant="warning">Customer dashboard</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-950">Your account</h1>

            <div className="mt-6 flex gap-1 border-b border-ink-100 overflow-x-auto">
                {tabs.map(tab => (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className="px-4 py-2.5 text-sm font-medium whitespace-nowrap text-ink-500 hover:text-ink-950 border-b-2 border-transparent hover:border-rust transition-colors"
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>

            <div className="mt-6">{children}</div>
        </div>
    );
}