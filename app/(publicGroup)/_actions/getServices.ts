import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, Service } from '@/lib/types';

export async function getServices(
    searchParams: Record<string, string | undefined>,
    opts: { cache?: RequestCache } = {}
): Promise<ApiResponse<Service[]>> {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });

    if (!params.get('limit')) params.set('limit', '9');

    const res = await fetch(`${API_URL}/services?${params.toString()}`, {
        cache: opts.cache ?? 'no-store',
    });

    return res.json();
}