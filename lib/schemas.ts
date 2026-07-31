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





export const bookingSchema = z.object({
    scheduledDate: z.string().min(1, { error: 'Please choose a date', }),
    scheduledTime: z.string().min(1, { error: 'Please choose a time', }),
    address: z.string().optional(),
    notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const reviewSchema = z.object({

    rating: z.number().min(1, { error: 'Please select a rating', }).max(5, { error: 'Rating cannot be greater than 5', }),

    comment: z.string().max(1000, { error: 'Keep it under 1000 characters', }).optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;



export const serviceSchema = z.object({

    title: z.string().min(2, { error: 'Title must be at least 2 characters', }),

    description: z.string().optional(),

    // price: z.coerce.number().positive({ error: 'Price must be greater than 0', }),

    // categoryId: z.number(),

    price: z.number().positive({ error: 'Price must be greater than 0', }),

    categoryId: z.number(),

    location: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;



export const technicianProfileSchema = z.object({

    bio: z.string().max(500, { error: 'Keep your bio under 500 characters', }).optional(),

    skills: z.string().optional(),

    // experience: z.coerce.number().min(0, { error: 'Experience cannot be negative', }),

    // serviceRate: z.coerce.number().min(0, { error: 'Rate cannot be negative', }),

    experience: z.number().min(0, { error: 'Experience cannot be negative', }),

    serviceRate: z.number().min(0, { error: 'Rate cannot be negative', }),

    location: z.string().optional(),
});

export type TechnicianProfileFormValues = z.infer<typeof technicianProfileSchema>;



// export const technicianProfileSchema = z.object({
//     bio: z.string().max(500, 'Keep your bio under 500 characters').optional(),
//     skills: z.string().optional(),
//     experience: z.coerce.number().min(0, 'Experience cannot be negative'),
//     serviceRate: z.coerce.number().min(0, 'Rate cannot be negative'),
//     location: z.string().optional(),
// });
// export type TechnicianProfileFormValues = z.infer<typeof technicianProfileSchema>;










export const categorySchema = z.object({

    name: z.string().min(2, { error: 'Category name must be at least 2 characters', }),

    description: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;