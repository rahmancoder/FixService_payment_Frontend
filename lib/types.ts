export type Role = 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'BANNED';

export type BookingStatus =
    | 'REQUESTED'
    | 'ACCEPTED'
    | 'DECLINED'
    | 'PAID'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

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



export interface Availability {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
}


export interface Category {
    id: string;
    name: string;
    description?: string | null;
}


export interface Service {
    id: string;
    title: string;
    description?: string | null;
    price: number;
    categoryId: string;
    category?: Category;
    technicianId: string;
    technician?: TechnicianProfile;
    location?: string | null;
    isActive: boolean;
}

export interface Booking {
    id: string;
    customerId: string;
    technicianId: string;
    serviceId: string;
    scheduledAt: string;
    address?: string | null;
    notes?: string | null;
    status: BookingStatus;
    createdAt: string;
    service?: Service;
    technician?: TechnicianProfile;
    customer?:
    {
        id: string;
        name: string;
    };
    payment?: Payment | null;
    review?: Review | null;
}


export interface Payment {
    id: string;
    transactionId: string;
    bookingId: string;
    amount: number;
    method?: string | null;
    provider: 'STRIPE' | 'SSLCOMMERZ';
    status: PaymentStatus;
    paidAt?: string | null;
    booking?: Booking;
}

export interface Review {
    id: string;
    bookingId: string;
    customerId: string;
    technicianId: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    customer?:
    {
        id: string;
        name: string
    };
}



export interface ApiResponse<T> {
    success: boolean;
    message: string | null;
    meta?:
    {
        page: number;
        limit: number;
        total: number
    } | null;
    data: T;
}

export interface ApiErrorShape {
    success: false;
    message: string;
    errorDetails?:
    {
        path: string | number;
        message: string
    }[] | unknown;
}


export interface ActionState {
    error?: string;
    fieldErrors?: Record<string, string>;
    success?: boolean;
}