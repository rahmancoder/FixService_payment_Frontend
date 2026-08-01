import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTechnicianById } from '../../_actions/getTechnicians';
import { formatCurrency, formatDate, initials } from '@/lib/utils';
import RatingStars from '@/components/shared/rating-stars';
import EmptyState from '@/components/shared/empty-state';
import { Badge } from '@/components/ui/badge';

export default async function TechnicianDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const technician = await getTechnicianById(id);

    if (!technician) notFound();

    return (
        <div className="mx-auto max-w-4xl px-5 py-12">

            <Link href="/technicians" className="text-sm text-ink-500 hover:text-rust-600 font-mono">
                ← Back to technicians
            </Link>

            <div className="docket mt-6 p-8">
                <div className="flex items-start gap-5 flex-wrap">

                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink-900 text-paper font-mono text-lg font-semibold">
                        {initials(technician.user.name)}
                    </span>

                    <div className="flex-1 min-w-[200px]">
                        <h1 className="font-display text-2xl font-bold text-ink-950">{technician.user.name}</h1>
                        <RatingStars rating={technician.avgRating} count={technician.totalReviews} size="md" />
                        {technician.location && <p className="mt-1 text-sm text-ink-500">📍 {technician.location}</p>}
                    </div>
                    <div className="text-right">

                        <p className="font-mono text-xl font-bold text-rust-600">{formatCurrency(technician.serviceRate)}/hr</p>
                        <p className="text-xs text-ink-400 font-mono uppercase">{technician.experience} yrs experience</p>
                    </div>
                </div>

                {technician.bio && (

                    <p className="mt-6 text-ink-700 leading-relaxed border-t border-dashed border-ink-100 pt-6">
                        {technician.bio}
                    </p>
                )}

                {technician.skills.length > 0 && (

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {technician.skills.map(skill => (
                            <Badge key={skill}>{skill}</Badge>
                        ))}
                    </div>
                )}
            </div>

            {technician.services && technician.services.length > 0 && (
                <div className="docket mt-6 p-6">
                    <h2 className="font-display font-semibold text-lg text-ink-950 mb-4">Services offered</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {technician.services.map(service => (

                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="flex items-center justify-between rounded border border-ink-100 px-4 py-3 hover:border-rust/40 transition-colors"
                            >

                                <span className="text-sm font-medium text-ink-900">{service.title}</span>
                                <span className="font-mono text-sm text-rust-600">{formatCurrency(service.price)}</span>
                            </Link>

                        ))}
                    </div>
                </div>
            )}

            {technician.availability && technician.availability.filter(a => a.isActive).length > 0 && (
                <div className="docket mt-6 p-6">
                    <h2 className="font-display font-semibold text-lg text-ink-950 mb-4">Weekly availability</h2>
                    <div className="flex flex-wrap gap-2">

                        {technician.availability.filter(a => a.isActive).map(slot => (
                            <Badge key={slot.id}>
                                {slot.dayOfWeek.slice(0, 3)} · {slot.startTime}–{slot.endTime}
                            </Badge>
                        ))}

                    </div>
                </div>
            )}

            <div className="docket mt-6 p-6">

                <h2 className="font-display font-semibold text-lg text-ink-950 mb-4">
                    Reviews ({technician.reviews?.length ?? 0})
                </h2>
                {!technician.reviews || technician.reviews.length === 0 ? (
                    <EmptyState title="No reviews yet" description="Be the first customer to leave feedback after a completed job." />
                ) : (
                    <div className="space-y-4">

                        {technician.reviews.map(review => (
                            <div key={review.id} className="border-t border-dashed border-ink-100 pt-4 first:border-none first:pt-0">
                                <div className="flex items-center justify-between">

                                    <span className="font-medium text-sm text-ink-900">{review.customer?.name || 'Customer'}</span>
                                    <span className="text-xs text-ink-400 font-mono">{formatDate(review.createdAt)}</span>
                                </div>

                                <RatingStars rating={review.rating} />

                                {review.comment && <p className="mt-1.5 text-sm text-ink-600">{review.comment}</p>}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}