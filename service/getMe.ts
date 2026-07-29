// import 'server-only';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE, backendFetch } from '@/lib/backendFetch';
import { verifyJwt, type SessionPayload } from '@/utils/jwt';
import { ApiResponse, MeApiResponse, User } from '@/lib/types';


export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifyJwt(token);
}




export async function getMe(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;

  try {
    // const res = await backendFetch<any>('/auth/me', { cache: 'no-store' });

    const res = await backendFetch<MeApiResponse>('/auth/me', { cache: 'no-store' });
    // Handles: res.data.result | res.data.showUser | res.data.user | res.data
    // const user = res?.data?.result || res?.data?.showUser || res?.data?.user || res?.data;
    const user = res?.data?.result || res?.data || null;

    return (user as User) || null;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
}