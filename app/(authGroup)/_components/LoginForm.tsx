'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { loginSchema, LoginFormValues } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loginAction } from '../_actions/authActions';
import DemoLoginButtons from './DemoLoginButtons';
import SocialLoginButtons from './SocialLoginButtons';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const next = searchParams.get('next') || undefined;
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

    function onSubmit(values: LoginFormValues) {
        setServerError('');
        startTransition(async () => {
            const result = await loginAction(values, next);
            if (result?.error) {
                setServerError(result.error);
                toast.error(result.error);
            }
        });
    }

    return (
        <div className="mx-auto max-w-md px-5 py-20">

            <Badge variant="warning">Sign in</Badge>

            <h1 className="mt-4 font-display text-3xl font-bold text-ink-950">Welcome back</h1>

            <p className="mt-2 text-ink-500 text-sm">Sign in to track your bookings and jobs.</p>

            {/* Demo Login <Buttons></Buttons> */}

            <div className="mt-6">
                <DemoLoginButtons next={next} />
            </div>


            <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
                <span className="text-xs font-mono uppercase text-ink-400">or sign in manually</span>
                <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>

                {serverError && (
                    <div className="rounded border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick" role="alert">
                        {serverError}
                    </div>
                )}

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" {...register('email')} />

                    {errors.email && <p className="text-xs text-brick mt-1">{errors.email.message}</p>}

                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" autoComplete="current-password" {...register('password')} />

                    {errors.password && <p className="text-xs text-brick mt-1">{errors.password.message}</p>}
                </div>


                <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
                    {isPending ? 'Signing in…' : 'Sign in'}
                </Button>


            </form>


            <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
                <span className="text-xs font-mono uppercase text-ink-400">or continue with</span>
                <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
            </div>
            <SocialLoginButtons />

            {/* <SocialLoginButtons /> */}





            <p className="mt-6 text-sm text-ink-500 text-center">
                New to FixService-Payment? {' '}
                <Link href="/register" className="text-rust-600 font-medium hover:text-rust-700">
                    Create an account
                </Link>
            </p>
        </div>
    );
}