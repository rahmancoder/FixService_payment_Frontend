
'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './theme-toggle';
import { logout } from '@/service/logout';
import type { SessionPayload } from '@/utils/jwt';

const dashboardHref: Record<string, string> = {
    CUSTOMER: '/dashboard',
    TECHNICIAN: '/technician-dashboard',
    ADMIN: '/admin-dashboard',
};

const profileHref: Record<string, string> = {
    CUSTOMER: '/dashboard/profile',
    TECHNICIAN: '/technician-dashboard',
    ADMIN: '/admin-dashboard',
};

const baseLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/technicians', label: 'Technicians' },
    { href: '/about', label: 'About' },
];

export default function Navbar({ session }: { session: SessionPayload | null }) {
    const [open, setOpen] = useState(false);
    const [isLoggingOut, startLogoutTransition] = useTransition();
    const pathname = usePathname();

    function handleLogout() {
        startLogoutTransition(() => {
            logout();
        });
    }

    const links = session
        ? [...baseLinks, { href: '/contact', label: 'Contact' }, { href: dashboardHref[session.role] || '/', label: 'Dashboard' }]
        : [...baseLinks, { href: '/contact', label: 'Contact' }];

    return (
        <header className="sticky top-0 z-40 w-full border-b border-ink-100 dark:border-ink-800 bg-paper/90 dark:bg-ink-950/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink-950 dark:text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded bg-ink-900 text-rust font-mono text-sm">
                        FSP
                    </span>
                    FixService-Payment
                </Link>

                <div className="hidden md:flex items-center gap-7">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium text-ink-700 dark:text-ink-200 hover:text-ink-950 dark:hover:text-white transition-colors',
                                (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) && 'text-ink-950 dark:text-white'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-ink-100 dark:border-ink-800 pl-1 pr-2.5 py-1 hover:bg-ink-50 dark:hover:bg-ink-800/60 transition-colors outline-none">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 dark:bg-white text-paper dark:text-ink-900 font-mono text-xs font-semibold">
                                    {session.email.slice(0, 2).toUpperCase()}
                                </span>
                                <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    Signed in as
                                    <div className="font-sans font-medium text-ink-900 dark:text-white normal-case tracking-normal text-sm truncate">
                                        {session.email}
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={dashboardHref[session.role] || '/'} className="cursor-pointer">
                                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={profileHref[session.role] || '/'} className="cursor-pointer">
                                        <UserIcon className="h-4 w-4" /> Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-brick cursor-pointer"
                                    onSelect={handleLogout}
                                    disabled={isLoggingOut}
                                >
                                    <LogOut className="h-4 w-4" /> {isLoggingOut ? 'Signing out…' : 'Sign out'}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button asChild variant="accent">
                                <Link href="/login">Sign in</Link>
                            </Button>
                            <Button asChild variant="accent">
                                <Link href="/register">Get started</Link>
                            </Button>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded border border-ink-100 dark:border-ink-800"
                        onClick={() => setOpen(o => !o)}
                        aria-label="Toggle menu"
                    >
                        <span className="font-mono text-lg">{open ? '×' : '≡'}</span>
                    </button>
                </div>
            </nav>

            {open && (
                <div className="md:hidden border-t border-ink-100 dark:border-ink-800 bg-paper dark:bg-ink-950 px-5 py-4 flex flex-col gap-4">
                    {links.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700 dark:text-ink-200">
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-2 pt-2 border-t border-ink-100 dark:border-ink-800">
                        {session ? (
                            <>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={profileHref[session.role] || '/'} onClick={() => setOpen(false)}>
                                        Profile
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
