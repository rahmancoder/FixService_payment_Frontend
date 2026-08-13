'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { subscribeNewsletter } from '../_actions/subscribeNewsletter';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        startTransition(async () => {
            const res = await subscribeNewsletter(email);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("You're on the list!");
                setEmail('');
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-white dark:bg-ink-900"
            />
            <Button type="submit" variant="accent" disabled={isPending} className="whitespace-nowrap">
                {isPending ? 'Joining…' : 'Notify me'}
            </Button>
        </form>
    );
}
