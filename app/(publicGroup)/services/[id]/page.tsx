import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceById } from '../../_actions/getServices';
import { formatCurrency } from '@/lib/utils';
import RatingStars from '@/components/shared/rating-stars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) notFound();

    const technician = service.technician;

    return (
        <div className="mx-auto max-w-4xl px-5 py-12">


            <Link
                href="/services"
                className="text-sm font-mono text-slate-500 hover:text-rust-600 dark:text-slate-300 dark:hover:text-rust-400 transition-colors"
            >
                ← Back to services
            </Link>

            <div className="docket mt-6 p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <Badge>{service.category?.name}</Badge>

                        <h1 className="mt-3 font-display text-3xl font-bold text-ink-950">{service.title}</h1>
                        {service.location && <p className="mt-1 text-sm text-ink-500">📍 {service.location}</p>}

                    </div>
                    <div className="text-right">

                        <span className="font-mono text-3xl font-bold text-rust-600">
                            {formatCurrency(service.price)}
                        </span>

                        <p className="text-xs text-ink-400 mt-0.5 font-mono uppercase">estimated</p>
                    </div>
                </div>

                {service.description && (

                    <p className="mt-6 text-ink-700 leading-relaxed border-t border-dashed border-ink-100 pt-6">
                        {service.description}
                    </p>
                )}

                {/* <div className="mt-8 pt-6 border-t border-ink-100">

                    <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
                        <Link href={`/book/${service.id}`}>Request this job →</Link>
                    </Button>

                    <p className="mt-2 text-xs text-ink-400">
                        You will need to sign in as a customer to complete a booking.
                    </p>

                </div> */}

                <div className="mt-8 pt-6 border-t border-ink-100 dark:border-ink-800">
                    {/* <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
                        <Link href={`/book/${service.id}`}>Request this job →</Link>
                    </Button> */}

                    <Button
                        asChild
                        variant="accent"
                        size="lg"
                        className="w-full sm:w-auto bg-amber-500 text-slate-950 hover:bg-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
                    >
                        <Link href={`/book/${service.id}`}>Request this job →</Link>
                    </Button>


                    <p className="mt-2 text-xs text-ink-400 dark:text-ink-500">
                        You will need to sign in as a customer to complete a booking.
                    </p>
                </div>



            </div>

            {technician && (
                <div className="docket mt-6 p-6">
                    <h2 className="font-display font-semibold text-lg text-ink-950 mb-4">About the technician</h2>

                    <Link href={`/technicians/${technician.id}`} className="flex items-center gap-4 group">

                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 text-paper font-mono text-sm font-semibold">
                            {technician.user.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
                        </span>

                        <div>
                            <p className="font-display font-semibold text-ink-950 group-hover:text-rust-600 transition-colors">
                                {technician.user.name}
                            </p>
                            <RatingStars rating={technician.avgRating} count={technician.totalReviews} />
                        </div>

                    </Link>

                    {technician.bio && <p className="mt-4 text-sm text-ink-500">{technician.bio}</p>}
                </div>
            )}
        </div>
    );
}