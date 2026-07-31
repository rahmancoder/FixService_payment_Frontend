
import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, Service } from '@/lib/types';

export async function getServices(
    searchParams: Promise<Record<string, string | undefined>> | Record<string, string | undefined>
): Promise<ApiResponse<Service[]>> {
    // Await searchParams before accessing keys
    const resolvedParams = await searchParams;

    const params = new URLSearchParams();

    if (resolvedParams) {
        Object.entries(resolvedParams).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
    }

    if (!params.get('limit')) params.set('limit', '9');

    const res = await fetch(`${API_URL}/services?${params.toString()}`,
        {
            cache: 'no-store'
        });

    return res.json();
}



export async function getServiceById(id: number): Promise<Service | null> {

    const res = await fetch(`${API_URL}/users/services/${id}`,
        {
            cache: 'no-store'
        });

    if (res.status === 404) return null;

    const json: ApiResponse<Service> = await res.json();

    return json.data;
}