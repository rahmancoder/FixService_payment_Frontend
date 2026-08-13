
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="docket overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open}
            >
                <span className="font-display font-semibold text-slate-900 dark:text-slate-100">{question}</span>
                <ChevronDown className={cn('h-4 w-4 shrink-0 text-slate-400 dark:text-slate-400 transition-transform', open && 'rotate-180')} />
            </button>
            {open && (
                <p className="px-5 pb-5 -mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {answer}
                </p>
            )}
        </div>
    );
}