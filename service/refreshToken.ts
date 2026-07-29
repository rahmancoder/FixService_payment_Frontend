import { API_URL } from '@/lib/backendFetch';

type RefreshResult =
    | { success: true; data: { accessToken: string } }
    | { success: false; data?: undefined };

/**
 * Called from `proxy.ts` (Next.js middleware) when the access token has
 * expired but the refresh token is still valid. Takes the refresh token
 * directly (already read from the request's cookies by the caller) rather
 * than reading cookies itself, since this needs to work from the proxy/
 * middleware execution context.
 */
export async function getNewAccessToken(refreshToken: string): Promise<RefreshResult> {
    try {
        const res = await fetch(`${API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
            cache: 'no-store',
        });

        if (!res.ok) return { success: false };

        const json = await res.json();
        return { success: true, data: json.data };
    } catch {
        return { success: false };
    }
}