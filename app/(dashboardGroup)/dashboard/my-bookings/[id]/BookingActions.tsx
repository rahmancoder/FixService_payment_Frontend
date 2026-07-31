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
        <div className="mt-6 pt-6 border-t border-ink-100 space-y-4">
            {canPay && (

                <Button variant="accent" className="w-full" onClick={handlePay} disabled={isPending}>
                    {isPending ? 'Redirecting to Stripe…' : 'Pay now with Stripe →'}
                </Button>
            )}

            {canCancel && (

                <Button variant="outline" className="w-full" onClick={handleCancel} disabled={isPending}>
                    {isPending ? 'Cancelling…' : 'Cancel booking'}
                </Button>
            )}

            {canReview && (
                <form onSubmit={handleSubmit(onReviewSubmit)} className="rounded border border-ink-100 p-4 space-y-3" noValidate>

                    <p className="field-label">Leave a review</p>

                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setValue('rating', star, { shouldValidate: true })}
                                className={`text-2xl ${star <= rating ? 'text-rust' : 'text-ink-100'}`}
                                aria-label={`${star} stars`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    {errors.rating && <p className="text-xs text-brick">{errors.rating.message}</p>}

                    <Textarea {...register('comment')} rows={3} placeholder="How did the job go?" />

                    {errors.comment && <p className="text-xs text-brick">{errors.comment.message}</p>}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Submitting…' : 'Submit review'}
                    </Button>

                </form>
            )}

            {booking.review && (

                <div className="rounded bg-moss-50 border border-moss-500/20 p-4 text-sm text-moss-600">
                    You rated this job {booking.review.rating}★. Thanks for the feedback!
                </div>
            )}
        </div>
    );
}