
import { API_URL } from '@/lib/backendFetch';
import Image from 'next/image';
import { ApiResponse, Category, Service, TechnicianProfile } from '@/lib/types';


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



export default async function HomePage() {
    const { technicianCount, categoryCount } = await getHomeData();

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


            </section>

            {/* ---------- Categories ---------- */}

            <section className="border-y border-ink-100 bg-ink-950">

            </section>

            {/* ---------- Recent services ---------- */}

            <section className="mx-auto max-w-6xl px-5 py-20">


            </section>


            {/* ---------- CTA ---------- */}
            <section className="mx-auto max-w-6xl px-5 pb-24">

            </section>
        </>
    );
}