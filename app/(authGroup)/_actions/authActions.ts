'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/backendFetch';
import { ActionState } from '@/lib/types';
import { LoginFormValues } from '@/lib/schemas';

const dashboardByRole: Record<string, string> = {
    CUSTOMER: '/dashboard',
    TECHNICIAN: '/technician-dashboard',
    ADMIN: '/admin-dashboard',
};

async function setAuthCookies(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day — matches the backend's access token expiry
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days — matches the backend's refresh token expiry
    });
}

// export async function loginAction(data: LoginFormValues, next?: string): Promise<ActionState> {
//     let res: Response;

//     try {
//         res = await fetch(`${API_URL}/auth/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         });
//     }
//     catch {
//         return { error: 'Could not reach the server. Please try again.' };
//     }

//     const json = await res.json().catch(() => null);

//     if (!res.ok) {
//         return { error: json?.message || 'Invalid email or password' };
//     }

//     const { accessToken, refreshToken, user } = json.data;
//     await setAuthCookies(accessToken, refreshToken);


//     redirect(next || dashboardByRole[user.role] || '/');
// }



// export async function loginAction(data: LoginFormValues, next?: string): Promise<ActionState> {
//     let res: Response;

//     try {
//         res = await fetch(`${API_URL}/auth/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         });
//     } catch {
//         return { error: 'Could not reach the server. Please try again.' };
//     }

//     const json = await res.json().catch(() => null);

//     if (!res.ok) {
//         return { error: json?.message || 'Invalid email or password' };
//     }

//     // --- FIX 1: Safely extract response data ---
//     const responseData = json?.data || json;

//     // Support both nested user (json.data.user) OR flat user object (json.data)
//     const user = responseData?.user || responseData;
//     const accessToken = responseData?.accessToken || json?.accessToken;
//     const refreshToken = responseData?.refreshToken || json?.refreshToken;

//     // --- FIX 2: Validate user & role before accessing user.role ---
//     if (!user || !user.role) {
//         return { error: 'Invalid response from server: user data or role missing.' };
//     }

//     // Set cookies if tokens exist
//     if (accessToken && refreshToken) {
//         await setAuthCookies(accessToken, refreshToken);
//     }

//     // --- FIX 3: Safe redirect ---
//     const targetPath = next || dashboardByRole[user.role] || '/';
//     redirect(targetPath);
// }



export async function loginAction(data: LoginFormValues, next?: string): Promise<ActionState> {
    let res: Response;

    try {
        res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    } catch {
        return { error: 'Could not reach the server. Please try again.' };
    }

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
        return { error: json?.message || 'Invalid email or password' };
    }

    // ✅ FIX: Destructure `showUser` matching your backend response!
    const { accessToken, refreshToken, showUser } = json.data || {};

    if (!showUser || !showUser.role) {
        return { error: 'Invalid response from server: user data or role missing.' };
    }

    // Set both cookies
    if (accessToken && refreshToken) {
        await setAuthCookies(accessToken, refreshToken);
    }

    // Safe redirect based on showUser.role
    const targetPath = next || dashboardByRole[showUser.role] || '/';
    redirect(targetPath);
}