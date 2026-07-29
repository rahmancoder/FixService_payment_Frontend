// import 'server-only';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE, backendFetch } from '@/lib/backendFetch';
import { verifyJwt, type SessionPayload } from '@/utils/jwt';
import { ApiResponse, User } from '@/lib/types';


export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifyJwt(token);
}

/**
 * Full session read — calls GET /auth/me on the backend to get the latest
 * user record (status, technicianProfile, etc). Use this when you need more
 * than just { id, email, role }.
 */
export async function getMe(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;

  try {
    const res = await backendFetch<ApiResponse<User>>('/auth/me', { cache: 'no-store' });
    return res.data;
  } catch {
    return null;
  }
}