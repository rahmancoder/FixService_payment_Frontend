'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { logout } from '@/service/logout';
import type { SessionPayload } from '@/utils/jwt';
import ThemeToggle from './theme-toggle';

const dashboardHref: Record<string, string> = {
    CUSTOMER: '/dashboard',
    TECHNICIAN: '/technician-dashboard',
    ADMIN: '/admin-dashboard',
};

export default function Navbar({ session }: { session: SessionPayload | null }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/services', label: 'Want Services!' },
        { href: '/technicians', label: 'Looking Technicians?' },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-ink-100 bg-paper/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
                    <span className="flex h-8 w-8 items-center justify-center rounded bg-ink-900 text-rust font-mono text-sm">
                        FSP
                    </span>
                    FixService-Payment
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium text-ink-700 hover:text-ink-950 transition-colors',
                                pathname.startsWith(link.href) && 'text-ink-950'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">

                    {/* <ThemeToggle /> */}

                    {session ? (
                        <>
                            <Button asChild variant="outline">
                                <Link href={dashboardHref[session.role] || '/'}>My dashboard</Link>
                            </Button>
                            <form action={logout}>
                                <Button variant="ghost" type="submit">
                                    Sign out
                                </Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost">
                                <Link href="/login">Sign in</Link>
                            </Button>
                            <Button asChild variant="accent">
                                <Link href="/register">Get started</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* <ThemeToggle /> */}

                <button
                    className="md:hidden flex h-9 w-9 items-center justify-center rounded border border-ink-100"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <span className="font-mono text-lg">{open ? '×' : '≡'}</span>
                </button>
            </nav>

            {open && (
                <div className="md:hidden border-t border-ink-100 bg-paper px-5 py-4 flex flex-col gap-4">
                    {links.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-2 pt-2 border-t border-ink-100">
                        {session ? (
                            <>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={dashboardHref[session.role] || '/'} onClick={() => setOpen(false)}>
                                        My dashboard
                                    </Link>
                                </Button>
                                <form action={logout}>
                                    <Button variant="ghost" type="submit" className="w-full">
                                        Sign out
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Button asChild variant="ghost" className="w-full">
                                    <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                                </Button>
                                <Button asChild variant="accent" className="w-full">
                                    <Link href="/register" onClick={() => setOpen(false)}>Get started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}