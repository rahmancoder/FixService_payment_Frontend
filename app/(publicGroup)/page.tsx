import Link from 'next/link';
import { API_URL } from '@/lib/backendFetch';
import Image from 'next/image';
import { ApiResponse, Category, Service, TechnicianProfile } from '@/lib/types';
import ServiceCard from './_components/services/ServiceCard';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const revalidate = 300; // ISR: rebuild this page every 5 minutes

async function getHomeData() {
    const [categoriesRes, servicesRes, techniciansRes] = await Promise.all([

        fetch(`${API_URL}/categories`, { next: { revalidate: 300 } }),

        fetch(`${API_URL}/services?limit=6&sortBy=createdAt&sortOrder=desc`, {
            next: { revalidate: 300 },
        }),

        fetch(`${API_URL}/technician?limit=1`, { next: { revalidate: 300 } }),
    ]);

    const categories: ApiResponse<Category[]> = await categoriesRes.json();

    const services: ApiResponse<Service[]> = await servicesRes.json();

    const technicians: ApiResponse<TechnicianProfile[]> = await techniciansRes.json();

    return {
        categories: categories.data || [],
        services: services.data || [],
        technicianCount: technicians.meta?.total || 0,
        categoryCount: categories.data?.length || 0,
    };
}

const categoryIcons: Record<string, string> = {
    Plumbing: '🔧',
    Electrical: '⚡',
    Cleaning: '🧹',
    Painting: '🎨',
    Carpentry: '🪚',
    'AC Repair': '❄️',
};

export default async function HomePage() {
    const { categories, services, technicianCount, categoryCount } = await getHomeData();

    return (
        <>
            {/* ---------- Hero ---------- */}

            <section className="relative overflow-hidden border-b border-ink-100">
                <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28">
                    <div className="max-w-2xl">

                        <Badge variant="warning" className="mb-6">Job Services #001 — Open for work</Badge>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] text-ink-950">
                            Get it fixed, <span className="text-rust">tracked start to finish.</span>
                        </h1>

                        <p className="mt-5 text-lg text-ink-500 max-w-lg">
                            Book verified plumbers, electricians, cleaners and painters. Every job gets a
                            paper trail — request, accept, pay, complete — so you always know where things stand.
                        </p>

                        <form action="/services" className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="What needs fixing? e.g. leaky faucet"
                                className="flex h-11 flex-1 rounded-md border border-input bg-white px-3.5 text-sm text-foreground placeholder:text-ink-300 focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <Button type="submit" variant="accent" size="lg" className="whitespace-nowrap">
                                Find a Technician →
                            </Button>
                        </form>

                        <div className="mt-8 flex items-center gap-6 text-sm font-mono text-ink-500">
                            <span>{technicianCount}+ technicians</span>
                            <span className="w-1 h-1 rounded-full bg-ink-200" />

                            <span>{categoryCount} trade categories</span>

                            <span className="w-1 h-1 rounded-full bg-ink-200" />
                            <span>Stripe-secured payments</span>
                        </div>
                    </div>
                </div>


                {/* Hero Image Container */}
                <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-12 hidden lg:block w-[420px] xl:w-[480px]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl border border-ink-100 rotate-2 transition-transform hover:rotate-0 duration-300">
                        <Image

                            src="/hero-technician.png"
                            alt="Verified Technician at work"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1200px) 420px, 480px"
                        />
                    </div>
                </div>






            </section>

            {/* ---------- How it works ---------- */}
            <section className="mx-auto max-w-6xl px-5 py-20">

                <h2 className="font-display text-3xl font-bold text-ink-950">How a job moves through the docket</h2>
                <p className="mt-2 text-ink-500 max-w-xl">
                    Four stages, always visible, from the moment you request work to the moment it is signed off.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    {[
                        { step: '01', title: 'Request', desc: 'Pick a service, choose a time, describe the job.' },
                        { step: '02', title: 'Accepted', desc: 'A technician accepts and locks in the schedule.' },
                        { step: '03', title: 'Paid', desc: 'Pay securely through Stripe once work is confirmed.' },
                        { step: '04', title: 'Completed', desc: 'Job finishes, you leave a review for the trade.' },
                    ].map(item => (
                        <div key={item.step} className="docket p-5">
                            <span className="font-mono text-xs text-rust-600">{item.step}</span>
                            <h3 className="mt-2 font-display font-semibold text-lg text-ink-950">{item.title}</h3>
                            <p className="mt-1.5 text-sm text-ink-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- Categories ---------- */}

            <section className="border-y border-ink-100 bg-ink-950">
                <div className="mx-auto max-w-6xl px-5 py-20">
                    <div className="flex items-end justify-between flex-wrap gap-4">

                        <div>
                            <h2 className="font-display text-3xl font-bold text-white">Popular trades</h2>
                            <p className="mt-2 text-ink-300">Jump straight to the category you need.</p>
                        </div>

                        <Link href="/services" className="text-sm font-medium text-rust hover:text-rust-400 transition-colors">
                            View all services →
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={`/services?categoryId=${category.id}`}
                                className="group flex items-center gap-4 rounded-lg border border-ink-800 bg-ink-900 p-5 hover:border-rust/50 transition-colors"
                            >
                                <span className="text-2xl">{categoryIcons[category.name] || '🛠️'}</span>
                                <div>
                                    <h3 className="font-display font-semibold text-white group-hover:text-rust transition-colors">
                                        {category.name}
                                    </h3>
                                    {category.description && (
                                        <p className="text-xs text-ink-300 mt-0.5">{category.description}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Recent services ---------- */}
            {services.length > 0 && (
                <section className="mx-auto max-w-6xl px-5 py-20">
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <div>
                            <h2 className="font-display text-3xl font-bold text-ink-950">Fresh on the docket</h2>
                            <p className="mt-2 text-ink-500">Recently listed services from our technicians.</p>
                        </div>
                        <Link href="/services" className="text-sm font-medium text-rust-600 hover:text-rust-700 transition-colors">
                            Browse all →
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </section>
            )}

            {/* ---------- CTA ---------- */}
            <section className="mx-auto max-w-6xl px-5 pb-24">

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="docket p-8 bg-rust-50 border-rust/20">
                        <h3 className="font-display text-2xl font-bold text-ink-950">Need something fixed?</h3>
                        <p className="mt-2 text-ink-600 text-sm max-w-sm">
                            Create an account, browse trusted technicians, and book your first job in minutes.
                        </p>
                        <Button asChild variant="accent" className="mt-6">
                            <Link href="/register">Book a service →</Link>
                        </Button>
                    </div>
                    <div className="docket p-8 bg-ink-900 border-ink-800">
                        <h3 className="font-display text-2xl font-bold text-white">Are you a technician?</h3>
                        <p className="mt-2 text-ink-300 text-sm max-w-sm">
                            List your services, set your availability, and get booked directly by customers near you.
                        </p>
                        <Button asChild variant="accent" className="mt-6">
                            <Link href="/register">Join as a Technician →</Link>
                        </Button>
                    </div>
                </div>

            </section>
        </>
    );
}