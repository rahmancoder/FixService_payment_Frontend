'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch, BackendFetchError } from '@/lib/backendFetch';
import { ActionState, UserStatus } from '@/lib/types';
import { CategoryFormValues } from '@/lib/schemas';

export async function toggleUserStatus(userId: string, nextStatus: UserStatus): Promise<ActionState> {
    try {
        await backendFetch(`/admin/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: nextStatus }),
        });
    } catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not update user status' };
    }
    revalidatePath('/admin-dashboard');
    return { success: true };
}



export async function createCategory(data: CategoryFormValues): Promise<ActionState> {
    try {
        await backendFetch('/admin/categories', {
            method: 'POST',
            body: JSON.stringify({ name: data.name, description: data.description || undefined }),
        });
    }
    catch (err) {
        return { error: err instanceof BackendFetchError ? err.message : 'Could not create category' };
    }

    revalidatePath('/admin-dashboard');
    return { success: true };
}