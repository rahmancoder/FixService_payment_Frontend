'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        'group toast bg-white border border-ink-100 text-ink-900 shadow-docket rounded-lg font-body',
                    description: 'text-ink-500',
                    actionButton: 'bg-ink-900 text-paper',
                    cancelButton: 'bg-ink-50 text-ink-500',
                    success: 'border-moss-500/30',
                    error: 'border-brick/30',
                },
            }}
            {...props}
        />
    );
};

export { Toaster };