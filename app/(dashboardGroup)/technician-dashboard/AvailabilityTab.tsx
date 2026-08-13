'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateAvailability } from '../_actions/profileActions';
import { Availability } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

type Slot = { dayOfWeek: string; startTime: string; endTime: string; isActive: boolean };

export default function AvailabilityTab({ availability }: { availability: Availability[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [slots, setSlots] = useState<Slot[]>(() =>
        DAYS.map(day => {
            const existing = availability.find(a => a.dayOfWeek === day);
            return existing
                ? { dayOfWeek: day, startTime: existing.startTime, endTime: existing.endTime, isActive: existing.isActive }
                : { dayOfWeek: day, startTime: '09:00', endTime: '17:00', isActive: false };
        })
    );

    function updateSlot(day: string, patch: Partial<Slot>) {
        setSlots(prev => prev.map(s => (s.dayOfWeek === day ? { ...s, ...patch } : s)));
    }

    function handleSave() {
        startTransition(async () => {
            const res = await updateAvailability(slots);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Availability updated');
                router.refresh();
            }
        });
    }

    return (
        <div className="docket p-6 max-w-2xl rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm">
            <div className="space-y-3">
                {slots.map(slot => (
                    <div key={slot.dayOfWeek} className="flex items-center gap-4 py-2 border-b border-dashed border-slate-200 dark:border-slate-800 last:border-none">
                        <label className="flex items-center gap-2 w-32 shrink-0 cursor-pointer">
                            <Checkbox
                                checked={slot.isActive}
                                onCheckedChange={checked => updateSlot(slot.dayOfWeek, { isActive: checked === true })}
                            />
                            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{slot.dayOfWeek.slice(0, 3)}</span>
                        </label>
                        <input
                            type="time"
                            value={slot.startTime}
                            disabled={!slot.isActive}
                            onChange={e => updateSlot(slot.dayOfWeek, { startTime: e.target.value })}
                            className="flex h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 text-sm disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 dark:color-scheme-dark"
                        />
                        <span className="text-slate-500 dark:text-slate-400 text-sm">to</span>
                        <input
                            type="time"
                            value={slot.endTime}
                            disabled={!slot.isActive}
                            onChange={e => updateSlot(slot.dayOfWeek, { endTime: e.target.value })}
                            className="flex h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 text-sm disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 dark:color-scheme-dark"
                        />
                    </div>
                ))}
            </div>

            <Button
                className="w-full mt-6 bg-rust hover:bg-rust/90 text-white dark:bg-rust dark:text-white"
                onClick={handleSave}
                disabled={isPending}
            >
                {isPending ? 'Saving…' : 'Save availability'}
            </Button>
        </div>
    );
}