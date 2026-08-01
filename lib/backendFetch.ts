import 'server-only';
import { cookies } from 'next/headers';


export const API_URL = process.env.API_URL || 'https://fix-service-payment.vercel.app/api';

export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export class BackendFetchError extends Error {
    status: number;
    errorDetails?: unknown;

    constructor(status: number, message: string, errorDetails?: unknown) {
        super(message);
        this.status = status;
        this.errorDetails = errorDetails;
    }
}


export async function backendFetch<T>(
    path: string,
    options: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {}
): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
        throw new BackendFetchError(res.status, json?.message || 'Something went wrong', json?.errorDetails);
    }

    return json as T;
}

export async function getAccessToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}