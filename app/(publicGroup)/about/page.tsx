import Link from 'next/link';
import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const revalidate = 300;

async function getStats() {
    const [categoriesRes, techniciansRes, servicesRes] = await Promise.all([
        fetch(`${API_URL}/categories`, { next: { revalidate: 300 } }),
        fetch(`${API_URL}/technician?limit=1`, { next: { revalidate: 300 } }),
        fetch(`${API_URL}/services?limit=1`, { next: { revalidate: 300 } }),
    ]);
    const categories: ApiResponse<Category[]> = await categoriesRes.json();
    const technicians: ApiResponse<unknown[]> = await techniciansRes.json();
    const services: ApiResponse<unknown[]> = await servicesRes.json();

    return {
        categoryCount: categories.data?.length || 0,
        technicianCount: technicians.meta?.total || 0,
        serviceCount: services.meta?.total || 0,
    };
}

export default async function AboutPage() {
    const stats = await getStats();

    return (
        <div className="mx-auto max-w-4xl px-5 py-16">
            <Badge variant="warning">About FixService-Payment</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 dark:text-white">
                Every job gets a paper trail.
            </h1>
            <p className="mt-4 text-lg text-ink-600 dark:text-ink-300 max-w-2xl">
                FixService-Payment started from a simple frustration: hiring a plumber or electrician
                usually means a phone call, a vague promise, and no idea whether the price you
                agreed on is the price you will pay. We built a platform where every step of a
                job — request, acceptance, payment, completion — is logged and visible to both
                sides, like a work order that can not get lost.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="docket p-5">
                    <p className="font-mono text-3xl font-bold text-rust-600">{stats.categoryCount}</p>
                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Trade categories covered</p>
                </div>
                <div className="docket p-5">
                    <p className="font-mono text-3xl font-bold text-rust-600">{stats.technicianCount}+</p>
                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Verified technicians</p>
                </div>
                <div className="docket p-5">
                    <p className="font-mono text-3xl font-bold text-rust-600">{stats.serviceCount}+</p>
                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Services listed</p>
                </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">How we vet technicians</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        Technicians register with a verified profile, list their real skills and
                        pricing, and build a public rating from completed jobs only — reviews can not
                        be left until a booking is marked <code className="text-xs">COMPLETED</code>,
                        so every star on a profile maps to an actual finished job.
                    </p>
                </div>
                <div>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">How payment protection works</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        You never pay upfront. A technician has to accept your booking first — only
                        then does the Pay now button appear, and payment runs through Stripe
                        Checkout. If a technician never accepts, you are never charged.
                    </p>
                </div>
            </div>

            <div className="mt-12 docket p-8 bg-ink-950 dark:bg-ink-900 border-ink-800">
                <h2 className="font-display text-2xl font-bold text-white">Want to see it in action?</h2>
                <p className="mt-2 text-ink-300 text-sm max-w-lg">
                    Browse live services and technicians, or create an account to book your first job.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                    <Button asChild variant="accent">
                        <Link href="/services">Browse services →</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-ink-700 text-white hover:bg-ink-800">
                        <Link href="/register">Create an account</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
