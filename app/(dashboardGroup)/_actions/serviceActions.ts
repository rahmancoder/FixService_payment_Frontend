'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ActionState } from '@/lib/types';
import { ServiceFormValues } from '@/lib/schemas';

export async function createService(data: ServiceFormValues): Promise<ActionState> {
    try {
        await backendFetch('/services', {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                description: data.description || undefined,
                price: data.price,
                categoryId: data.categoryId,
                location: data.location || undefined,
            }),
        });
    } catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not create service' };
    }

    revalidatePath('/technician-dashboard');
    return { success: true };
}

export async function deleteService(serviceId: number): Promise<ActionState> {
    try {
        await backendFetch(`/services/${serviceId}`, { method: 'DELETE' });
    } catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not delete service' };
    }
    revalidatePath('/technician-dashboard');
    return { success: true };
}