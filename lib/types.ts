export type Role = 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'BANNED';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: UserStatus;
    createdAt: string;
    technicianProfile?: TechnicianProfile | null;
}

export interface MeApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        result: User;
    };
}

export interface TechnicianUser {
    id: string;
    name: string;
    email?: string;
}

export interface TechnicianProfile {
    id: string;
    userId: string;
    bio?: string | null;
    skills: string[];
    experience: number;
    pricingRate: number;
    location?: string | null;
    avgRating: number;
    totalReviews: number;
    user: TechnicianUser;
}






export interface ApiResponse<T> {
    success: boolean;
    message: string | null;
    meta?: { page: number; limit: number; total: number } | null;
    data: T;
}

export interface ApiErrorShape {
    success: false;
    message: string;
    errorDetails?: { path: string | number; message: string }[] | unknown;
}


export interface ActionState {
    error?: string;
    fieldErrors?: Record<string, string>;
    success?: boolean;
}