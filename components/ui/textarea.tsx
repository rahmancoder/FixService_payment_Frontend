import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    'flex min-h-20 w-full rounded-md border border-input bg-white dark:bg-ink-900 px-3.5 py-2.5 text-sm text-foreground placeholder:text-ink-300 dark:placeholder:text-ink-500 transition-colors resize-none',
                    'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
