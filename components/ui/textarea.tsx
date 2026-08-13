import * as React from 'react';
import { cn } from '@/lib/utils';

// Standard React declaration (or type alias) without triggering empty interface warnings
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    'flex min-h-20 w-full rounded-md border border-input dark:border-ink-800 bg-white dark:bg-ink-900/60 px-3.5 py-2.5 text-sm text-foreground dark:text-ink-100 placeholder:text-muted-foreground transition-colors resize-none',
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