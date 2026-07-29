import Link from 'next/link';

import { Button } from '@/components/ui/button';

// export const dynamic = 'force-dynamic';



export default async function DashboardOverviewPage() {


    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h2 className="font-display text-xl font-semibold text-ink-950">Recent activity</h2>
                <Button asChild variant="outline">
                    <Link href="/services">Book a new service →</Link>
                </Button>
            </div>


        </div>
    );
}