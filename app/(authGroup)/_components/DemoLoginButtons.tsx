'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { loginAction } from '../_actions/authActions';
import { Button } from '@/components/ui/button';

const DEMO_ACCOUNTS = [
    { label: 'Customer', email: 'video@customer.com', password: 'password12345' },
    { label: 'Technician', email: 'frontend@technician11.com', password: 'password12345' },
    { label: 'Admin', email: 'mustafiz@admin.com', password: 'mustafiz12345' },
] as const;


export default function DemoLoginButtons({ next }: { next?: string }) {
    const [isPending, startTransition] = useTransition();

    function handleDemoLogin(email: string, password: string) {
        startTransition(async () => {
            const result = await loginAction({ email, password }, next);
            if (result?.error) toast.error(result.error);
        });
    }

    return (
        <div className="rounded border border-dashed border-ink-200 dark:border-ink-700 p-4">
            <p className="field-label">Quick demo login</p>
            <div className="grid grid-cols-3 gap-2">
                {DEMO_ACCOUNTS.map(account => (
                    <Button
                        key={account.label}
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleDemoLogin(account.email, account.password)}
                    >
                        {account.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
