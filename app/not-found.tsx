import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="mx-auto max-w-lg px-5 py-24 text-center">
            <span className="font-mono text-5xl text-ink-200">404</span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink-950">This Page doesnot exist</h1>
            <p className="mt-2 text-ink-500">
                The page you are looking for may have been moved, completed, or never filed.
            </p>
            <Button asChild variant="accent" className="mt-6">
                <Link href="/">Back to home</Link>
            </Button>
        </div>
    );
}