// import * as React from 'react';
// import { cn } from '@/lib/utils';

// const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
//     ({ className, type, ...props }, ref) => {
//         return (
//             <input
//                 type={type}
//                 ref={ref}
//                 className={cn(
//                     'flex h-10 w-full rounded-md border border-input bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-ink-300 transition-colors',
//                     'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring',
//                     'disabled:cursor-not-allowed disabled:opacity-50',
//                     className
//                 )}
//                 {...props}
//             />
//         );
//     }
// );
// Input.displayName = 'Input';

// export { Input };


import * as React from "react"
import { cn } from "@/lib/utils"

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900/60 px-3 py-2 text-sm text-foreground dark:text-ink-100 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }