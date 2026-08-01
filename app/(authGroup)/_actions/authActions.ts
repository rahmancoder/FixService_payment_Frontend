'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { API_URL, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/backendFetch';

import { ActionState } from '@/lib/types';
import { LoginFormValues, RegisterFormValues } from '@/lib/schemas';

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







export async function registerAction(data: RegisterFormValues): Promise<ActionState> {
    let res: Response;
    try {
        res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    } catch {
        return { error: 'Could not reach the server. Please try again.' };
    }

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
        return { error: json?.message || 'Registration failed' };
    }

    return { success: true || 'Registration successful!' };
}
