import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object(
    {
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.email('Enter a valid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z.enum(['CUSTOMER', 'TECHNICIAN']),
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;