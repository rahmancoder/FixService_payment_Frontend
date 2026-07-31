import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-ink-100 bg-ink-950 text-ink-100">
            <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded bg-rust text-white font-mono text-sm">
                            FSP
                        </span>
                        FixService-Payment
                    </div>
                    <p className="mt-3 text-sm text-ink-300 max-w-xs">
                        Verified technicians, transparent pricing, and jobs tracked from request to
                        completion
                    </p>
                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-ink-300 mb-3">Customers</h4>
                    <ul className="space-y-2 text-sm">

                        <li><Link href="/services" className="hover:text-rust transition-colors">Browse services</Link></li>
                        <li><Link href="/technicians" className="hover:text-rust transition-colors">Find a technician</Link></li>
                        <li><Link href="/register" className="hover:text-rust transition-colors">Create an account</Link></li>
                    </ul>

                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-ink-300 mb-3">Technicians</h4>
                    <ul className="space-y-2 text-sm">

                        <li><Link href="/register" className="hover:text-rust transition-colors">Join as a Technician</Link></li>
                        <li><Link href="/login" className="hover:text-rust transition-colors">Technician sign in</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-ink-300 mb-3">Categories</h4>

                    <ul className="space-y-2 text-sm text-ink-300">
                        <li>Plumbing</li>
                        <li>Electrical</li>
                        <li>Cleaning</li>
                        <li>Painting</li>
                    </ul>

                </div>
            </div>

            <div className="border-t border-ink-800">

                <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-300 font-mono">

                    <span>© {new Date().getFullYear()} FixService-Payment. MD MUSTAFIZUR RAHMAN All rights reserved .</span>
                    <span>Built with Next.js</span>
                </div>
            </div>
        </footer>
    );
}