import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-ink-300 transition-colors',
                    'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };