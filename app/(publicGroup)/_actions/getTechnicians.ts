import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, TechnicianProfile } from '@/lib/types';

export async function getTechnicians(
    searchParams: Record<string, string | undefined>
): Promise<ApiResponse<TechnicianProfile[]>> {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });

    if (!params.get('limit')) params.set('limit', '9');

    const res = await fetch(`${API_URL}/technicians?${params.toString()}`, { cache: 'no-store' });

    return res.json();
}