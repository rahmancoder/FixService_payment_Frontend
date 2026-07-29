import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-sm border w-fit whitespace-nowrap',
    {
        variants: {
            variant: {
                default: 'border-ink-100 text-ink-500 bg-ink-50',
                success: 'border-moss-500/30 text-moss-600 bg-moss-50',
                warning: 'border-rust/30 text-rust-600 bg-rust-50',
                destructive: 'border-brick/30 text-brick bg-brick/5',
                muted: 'border-ink-100 text-ink-300 bg-ink-50 line-through',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
}

function Badge({ className, variant, dot = true, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props}>
            {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
            {children}
        </span>
    );
}

export { Badge, badgeVariants };