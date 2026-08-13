'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cancelBooking, payForBooking, submitReview } from '../../../_actions/bookingActions';
import { reviewSchema, ReviewFormValues } from '@/lib/schemas';
import { Booking } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function BookingActions({ booking }: { booking: Booking }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ReviewFormValues>({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5 } });
    const rating = watch('rating');

    function handlePay() {
        startTransition(async () => {
            const res = await payForBooking(booking.id);
            if (res.error) {
                toast.error(res.error);
            } else if (res.sessionUrl) {
                toast.success('Redirecting to Stripe…');
                window.location.href = res.sessionUrl;
            }
        });
    }

    function handleCancel() {
        startTransition(async () => {
            const res = await cancelBooking(booking.id);
            if (res.error) toast.error(res.error);
            else {
                toast.success('Booking cancelled');
                router.refresh();
            }
        });
    }

    function onReviewSubmit(values: ReviewFormValues) {
        startTransition(async () => {
            const res = await submitReview(booking.id, values);
            if (res.error) toast.error(res.error);
            else {
                toast.success('Thanks for the feedback!');
                router.refresh();
            }
        });
    }

    const canCancel = !['IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DECLINED'].includes(booking.status);
    const canPay = booking.status === 'ACCEPTED';
    const canReview = booking.status === 'COMPLETED' && !booking.review;

    if (!canCancel && !canPay && !canReview && !booking.review) return null;

    return (
        <div className="mt-6 pt-6 border-t border-ink-100 dark:border-ink-800 space-y-4">
            {canPay && (
                <Button variant="accent" className="w-full" onClick={handlePay} disabled={isPending}>
                    {isPending ? 'Redirecting to Stripe…' : 'Pay now with Stripe →'}
                </Button>
            )}

            {canCancel && (
                <Button
                    variant="outline"
                    className="w-full border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 dark:bg-ink-800/50 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                    onClick={handleCancel}
                    disabled={isPending}
                >
                    {isPending ? 'Cancelling…' : 'Cancel booking'}
                </Button>
            )}

            {canReview && (
                <form
                    onSubmit={handleSubmit(onReviewSubmit)}
                    className="rounded border border-ink-100 dark:border-ink-800 bg-white/50 dark:bg-ink-900/50 p-4 space-y-3"
                    noValidate
                >
                    <p className="field-label text-ink-900 dark:text-ink-100 font-medium text-sm">Leave a review</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setValue('rating', star, { shouldValidate: true })}
                                className={`text-2xl transition-colors ${star <= rating ? 'text-rust' : 'text-ink-200 dark:text-ink-700 hover:text-ink-400'
                                    }`}
                                aria-label={`${star} stars`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {errors.rating && <p className="text-xs text-brick dark:text-red-400">{errors.rating.message}</p>}

                    <Textarea
                        {...register('comment')}
                        rows={3}
                        placeholder="How did the job go?"
                        className="dark:bg-ink-950 dark:border-ink-800 dark:text-ink-100 dark:placeholder:text-ink-500"
                    />
                    {errors.comment && <p className="text-xs text-brick dark:text-red-400">{errors.comment.message}</p>}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Submitting…' : 'Submit review'}
                    </Button>
                </form>
            )}

            {booking.review && (
                <div className="rounded bg-moss-50 dark:bg-moss-950/40 border border-moss-500/20 dark:border-moss-500/40 p-4 text-sm text-moss-600 dark:text-moss-400">
                    You rated this job {booking.review.rating}★. Thanks for the feedback!
                </div>
            )}
        </div>
    );
}