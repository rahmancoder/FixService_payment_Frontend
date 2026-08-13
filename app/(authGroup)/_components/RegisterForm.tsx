// 'use client';

// import { useState, useTransition } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Link from 'next/link';
// import { toast } from 'sonner';

// import { registerAction } from '../_actions/authActions';
// import { registerSchema, RegisterFormValues } from '@/lib/schemas';

// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { cn } from '@/lib/utils';
// import SocialLoginButtons from './SocialLoginButtons';

// export default function RegisterForm() {
//     const [isPending, startTransition] = useTransition();
//     const [serverError, setServerError] = useState('');

//     const [isSuccess, setIsSuccess] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         watch,
//         setValue,
//         formState: { errors },
//     } = useForm<RegisterFormValues>({
//         resolver: zodResolver(registerSchema),
//         defaultValues: { role: 'CUSTOMER' },
//     });

//     const role = watch('role');

//     function onSubmit(values: RegisterFormValues) {
//         setServerError('');

//         startTransition(async () => {
//             const result = await registerAction(values);

//             if (result?.error) {
//                 setServerError(result.error);
//                 toast.error(result.error);
//             } else {
//                 // show toast notification
//                 setIsSuccess(true);
//                 toast.success('Registration successful! Please sign in with your email and password.');
//             }
//         });
//     }

//     if (isSuccess) {
//         return (
//             <div className="mx-auto max-w-md px-5 py-20 text-center">
//                 <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
//                     <Badge variant="default" className="bg-emerald-100 text-emerald-800 border-emerald-300">
//                         Success
//                     </Badge>
//                     <h2 className="mt-4 text-2xl font-bold text-emerald-950">Registration Successful!</h2>
//                     <p className="mt-2 text-sm text-emerald-800">
//                         Your account has been created. Please log in with your email and password to continue.
//                     </p>
//                     <Link href="/login" className="mt-6 inline-block w-full">
//                         <Button variant="accent" className="w-full">
//                             Go to Login
//                         </Button>
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="mx-auto max-w-md dark:text-ink-200 px-5 py-20">
//             <Badge variant="warning">New User</Badge>
//             <h1 className="mt-4 font-display text-3xl font-bold text-ink-950 dark:text-ink-200">Create your account</h1>

//             <p className="mt-2 text-ink-500 text-sm dark:text-ink-200">Book a service as Customer, or Be as a Technician.</p>

//             <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg border border-ink-100 bg-white p-1">
//                 {(['CUSTOMER', 'TECHNICIAN'] as const).map(r => (
//                     <button
//                         key={r}
//                         type="button"
//                         onClick={() => setValue('role', r)}
//                         className={cn(
//                             'rounded py-2 text-sm font-medium transition-colors',
//                             role === r ? 'bg-ink-900 text-paper' : 'text-ink-500 hover:text-ink-900'
//                         )}
//                     >
//                         {r === 'CUSTOMER' ? "I'm a Customer" : "I'm a Technician"}
//                     </button>

//                 ))}
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
//                 {serverError && (

//                     <div className="rounded border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick" role="alert">
//                         {serverError}
//                     </div>
//                 )}

//                 <div>
//                     <Label htmlFor="name">Full name</Label>
//                     <Input id="name" {...register('name')} />
//                     {errors.name && <p className="text-xs text-brick mt-1">{errors.name.message}</p>}

//                 </div>

//                 <div>

//                     <Label htmlFor="email">Email</Label>
//                     <Input id="email" type="email" autoComplete="email" {...register('email')} />
//                     {errors.email && <p className="text-xs text-brick mt-1">{errors.email.message}</p>}

//                 </div>

//                 <div>
//                     <Label htmlFor="password">Password</Label>
//                     <Input id="password" type="password" autoComplete="new-password" {...register('password')} />
//                     {errors.password && <p className="text-xs text-brick mt-1">{errors.password.message}</p>}

//                 </div>

//                 <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
//                     {isPending ? 'Creating account…' : 'Create account'}
//                 </Button>

//             </form>

//             <div className="my-6 flex items-center gap-3">
//                 <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
//                 <span className="text-xs font-mono uppercase text-ink-400">or continue with</span>
//                 <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
//             </div>
//             <SocialLoginButtons />




//             <p className="mt-6 text-sm text-ink-500 text-center">
//                 Already registered?{' '}
//                 <Link href="/login" className="text-rust-600 font-medium hover:text-rust-700">
//                     Sign in
//                 </Link>

//             </p>
//         </div>
//     );
// }




'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { toast } from 'sonner';

import { registerAction } from '../_actions/authActions';
import { registerSchema, RegisterFormValues } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import SocialLoginButtons from './SocialLoginButtons';

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: 'CUSTOMER' },
    });

    const role = watch('role');

    function onSubmit(values: RegisterFormValues) {
        setServerError('');

        startTransition(async () => {
            const result = await registerAction(values);

            if (result?.error) {
                setServerError(result.error);
                toast.error(result.error);
            } else {
                setIsSuccess(true);
                toast.success('Registration successful! Please sign in with your email and password.');
            }
        });
    }

    if (isSuccess) {
        return (
            <div className="mx-auto max-w-md px-5 py-20 text-center">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40 p-6">
                    <Badge variant="default" className="bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700">
                        Success
                    </Badge>
                    <h2 className="mt-4 text-2xl font-bold text-emerald-950 dark:text-emerald-100">Registration Successful!</h2>
                    <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
                        Your account has been created. Please log in with your email and password to continue.
                    </p>
                    <Link href="/login" className="mt-6 inline-block w-full">
                        <Button variant="accent" className="w-full">
                            Go to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md px-5 py-20 text-foreground">
            <Badge variant="warning">New User</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Create your account</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Book a service as Customer, or Be as a Technician.
            </p>

            {/* Role Switcher Container */}
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg border border-ink-100 dark:border-ink-800 bg-card dark:bg-ink-900/50 p-1">
                {(['CUSTOMER', 'TECHNICIAN'] as const).map(r => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setValue('role', r)}
                        className={cn(
                            'rounded py-2 text-sm font-medium transition-colors',
                            role === r
                                ? 'bg-ink-900 text-paper dark:bg-primary dark:text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground dark:hover:bg-ink-800/60'
                        )}
                    >
                        {r === 'CUSTOMER' ? "I'm a Customer" : "I'm a Technician"}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
                {serverError && (
                    <div className="rounded border border-brick/30 bg-brick/5 dark:bg-brick/15 px-4 py-3 text-sm text-brick" role="alert">
                        {serverError}
                    </div>
                )}

                <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-xs text-brick mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" {...register('email')} />
                    {errors.email && <p className="text-xs text-brick mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" autoComplete="new-password" {...register('password')} />
                    {errors.password && <p className="text-xs text-brick mt-1">{errors.password.message}</p>}
                </div>

                <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
                    {isPending ? 'Creating account…' : 'Create account'}
                </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
                <span className="text-xs font-mono uppercase text-muted-foreground">or continue with</span>
                <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
            </div>

            <SocialLoginButtons />

            <p className="mt-6 text-sm text-muted-foreground text-center">
                Already registered?{' '}
                <Link href="/login" className="text-rust-600 dark:text-rust-400 font-medium hover:text-rust-700 dark:hover:text-rust-300 transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    );
}