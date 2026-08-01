
import { API_URL } from '@/lib/backendFetch';
import { ApiResponse, TechnicianProfile } from '@/lib/types';

export async function getTechnicians(
    searchParams: Promise<Record<string, string | undefined>> | Record<string, string | undefined>
): Promise<ApiResponse<TechnicianProfile[]>> {

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



export async function getTechnicianById(id: string): Promise<TechnicianProfile | null> {

    const res = await fetch(`${API_URL}/technician/single/${id}`,
        {
            cache: 'no-store'
        });

    if (res.status === 404) return null;

    const json: ApiResponse<TechnicianProfile> = await res.json();

    return json.data;



}


