'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch — theme isn't known until mounted client-side.
    // useEffect(() => setMounted(true), []);

    // if (!mounted) {
    //     return <div className={`h-9 w-9 rounded border border-ink-100 dark:border-ink-800 ${className || ''}`} />;
    // }


    useEffect(() => {
        // Defers state update to the next frame to prevent synchronous cascading render warning
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);


    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`flex h-9 w-9 items-center justify-center rounded border border-ink-100 dark:border-ink-800 text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors ${className || ''}`}
        >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}
