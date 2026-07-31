'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ActionState } from '@/lib/types';
import { TechnicianProfileFormValues } from '@/lib/schemas';

export async function updateProfile(data: TechnicianProfileFormValues): Promise<ActionState> {
    try {
        await backendFetch('/technician/profile', {
            method: 'PUT',
            body: JSON.stringify({
                bio: data.bio || undefined,
                skills: (data.skills || '')
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean),
                experience: data.experience,
                serviceRate: data.serviceRate,
                location: data.location || undefined,
            }),
        });
    } catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not update profile' };
    }

    revalidatePath('/technician-dashboard');
    return { success: true };
}

type Slot = { dayOfWeek: string; startTime: string; endTime: string; isActive: boolean };

export async function updateAvailability(slots: Slot[]): Promise<ActionState> {
    const activeSlots = slots.filter(s => s.isActive);

    if (activeSlots.length === 0) {
        return { error: 'Turn on at least one day to set your availability.' };
    }

    try {
        await backendFetch('/technician/availability', {
            method: 'PUT',
            body: JSON.stringify({ slots: activeSlots }),
        });
    } catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not update availability' };
    }

    revalidatePath('/technician-dashboard');
    return { success: true };
}