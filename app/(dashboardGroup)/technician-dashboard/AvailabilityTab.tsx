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
        <div className="docket p-6 max-w-2xl">
            <div className="space-y-3">
                {slots.map(slot => (
                    <div key={slot.dayOfWeek} className="flex items-center gap-4 py-2 border-b border-dashed border-ink-100 last:border-none">
                        <label className="flex items-center gap-2 w-32 shrink-0">
                            <Checkbox
                                checked={slot.isActive}
                                onCheckedChange={checked => updateSlot(slot.dayOfWeek, { isActive: checked === true })}
                            />
                            <span className="text-sm font-medium text-ink-900">{slot.dayOfWeek.slice(0, 3)}</span>
                        </label>
                        <input
                            type="time"
                            value={slot.startTime}
                            disabled={!slot.isActive}
                            onChange={e => updateSlot(slot.dayOfWeek, { startTime: e.target.value })}
                            className="flex h-10 rounded-md border border-input bg-white px-3 text-sm disabled:opacity-40"
                        />
                        <span className="text-ink-400 text-sm">to</span>
                        <input
                            type="time"
                            value={slot.endTime}
                            disabled={!slot.isActive}
                            onChange={e => updateSlot(slot.dayOfWeek, { endTime: e.target.value })}
                            className="flex h-10 rounded-md border border-input bg-white px-3 text-sm disabled:opacity-40"
                        />
                    </div>
                ))}
            </div>

            <Button variant="accent" className="w-full mt-6" onClick={handleSave} disabled={isPending}>
                {isPending ? 'Saving…' : 'Save availability'}
            </Button>
        </div>
    );
}