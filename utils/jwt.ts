import jwt, { JwtPayload } from 'jsonwebtoken';

export type SessionPayload =
    {
        id: string;
        email: string;
        role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
    };

export type VerifyResult =
    | { success: true; data: JwtPayload }
    | { success: false; data?: undefined };



function verifyToken(token: string, secret: string): VerifyResult {
    try {
        const data = jwt.verify(token, secret) as JwtPayload;
        return { success: true, data };
    }

    catch {
        return { success: false };
    }
}

export const jwtUtils = { verifyToken };

export async function verifyJwt(token: string): Promise<SessionPayload | null> {

    const result = jwtUtils.verifyToken(token, process.env.JWT_ACCESS_SECRET || 'jwt-secret');

    return result.success ? (result.data as unknown as SessionPayload) : null;
}