'use client';

import { useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createBooking } from '../../_actions/createBooking';
import { bookingSchema, BookingFormValues } from '@/lib/schemas';
import { Availability, Service } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DAY_NAMES = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

function slotsForDay(availability: Availability[], date: string): string[] {
    if (!date) return [];

    const dayOfWeek = DAY_NAMES[new Date(`${date}T00:00:00`).getDay()];

    const day = availability.find(a => a.dayOfWeek === dayOfWeek && a.isActive);
    if (!day) return [];

    const [startH] = day.startTime.split(':').map(Number);
    const [endH] = day.endTime.split(':').map(Number);
    const slots: string[] = [];

    for (let h = startH; h < endH; h++) {
        slots.push(`${String(h).padStart(2, '0')}:00`);
    }
    return slots;
}

export default function BookingForm({
    service,
    availability,
}: {
    service: Service;
    availability: Availability[];
}) {
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState('');
    const today = new Date().toISOString().split('T')[0];

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: { scheduledDate: '', scheduledTime: '', address: '', notes: '' },
    });

    const selectedDate = watch('scheduledDate');
    const selectedTime = watch('scheduledTime');
    const daySlots = useMemo(() => slotsForDay(availability, selectedDate), [availability, selectedDate]);
    const hasAvailability = availability.length > 0;

    function onSubmit(values: BookingFormValues) {
        setServerError('');
        startTransition(async () => {
            const result = await createBooking(service.id, values);
            if (result?.error) {
                setServerError(result.error);
                toast.error(result.error);
            }
            // On success, createBooking redirects server-side.
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="docket mt-6 p-6 space-y-5" noValidate>
            {serverError && (
                <div className="rounded border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick" role="alert">
                    {serverError}
                </div>
            )}

            <div className="flex items-center justify-between rounded bg-ink-50 px-4 py-3">
                <span className="text-sm text-ink-500">Estimated price</span>
                <span className="font-mono font-semibold text-rust-600">{formatCurrency(service.price)}</span>
            </div>

            <div>
                <Label htmlFor="scheduledDate">Preferred date</Label>
                <Input
                    id="scheduledDate"
                    type="date"
                    min={today}
                    {...register('scheduledDate')}
                    onChange={e => {
                        setValue('scheduledDate', e.target.value);
                        setValue('scheduledTime', '');
                    }}
                />
                {errors.scheduledDate && <p className="text-xs text-brick mt-1">{errors.scheduledDate.message}</p>}
            </div>

            {selectedDate && (
                <div>
                    <Label>Available time slots</Label>
                    {!hasAvailability ? (
                        <p className="text-xs text-ink-400">
                            This technician has not published working hours yet — pick a time and they will confirm it when accepting.
                        </p>
                    ) : daySlots.length === 0 ? (
                        <p className="text-xs text-ink-400">
                            Not available on that day. Try another date.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {daySlots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setValue('scheduledTime', slot, { shouldValidate: true })}
                                    className={cn(
                                        'rounded-md border px-3 py-1.5 text-sm font-mono transition-colors',
                                        selectedTime === slot
                                            ? 'border-rust bg-rust text-white'
                                            : 'border-ink-100 text-ink-700 hover:border-rust/50'
                                    )}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    )}
                    {(!hasAvailability || daySlots.length === 0) && (
                        <Input type="time" className="mt-2" {...register('scheduledTime')} />
                    )}
                    {errors.scheduledTime && <p className="text-xs text-brick mt-1">{errors.scheduledTime.message}</p>}
                </div>
            )}

            <div>
                <Label htmlFor="address">Job address (optional)</Label>
                <Input id="address" placeholder="House, road, area" {...register('address')} />
            </div>

            <div>
                <Label htmlFor="notes">Notes for the technician (optional)</Label>
                <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Describe the issue, access details, anything helpful"
                    {...register('notes')}
                />
            </div>

            <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
                {isPending ? 'Submitting request…' : 'Submit booking request'}
            </Button>
            <p className="text-xs text-ink-400 text-center">
                You will pay once the technician accepts the job.
            </p>
        </form>
    );
}