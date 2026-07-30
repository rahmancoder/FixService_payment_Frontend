
import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, TechnicianProfile } from '@/lib/types';

export async function getTechnicians(
    searchParams: Promise<Record<string, string | undefined>> | Record<string, string | undefined>
): Promise<ApiResponse<TechnicianProfile[]>> {
    // FIX: Await searchParams 
    const resolvedParams = await searchParams;

    const params = new URLSearchParams();

    if (resolvedParams) {
        Object.entries(resolvedParams).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
    }

    if (!params.get('limit')) params.set('limit', '9');

    const res = await fetch(`${API_URL}/technician?${params.toString()}`, { cache: 'no-store' });

    return res.json();
}