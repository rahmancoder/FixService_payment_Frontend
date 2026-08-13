import { Badge } from '@/components/ui/badge';

export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl px-5 py-16">
            <Badge variant="warning">Legal</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 dark:text-white">Privacy &amp; Terms</h1>
            <p className="mt-3 text-ink-500 dark:text-ink-400 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>

            <div className="mt-10 space-y-10">
                <section>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">What we collect</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        When you register, we store your name, email, phone number (optional), and a
                        hashed password — never your password in plain text. Technicians additionally
                        store a bio, skills, pricing, and availability, all of which are shown
                        publicly on their profile. Booking a service stores the jobs address, notes,
                        schedule, and payment status, visible only to you, the assigned technician,
                        and platform admins.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">Payments</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        Payments are processed by Stripe. FixItNow never sees or stores your card
                        details — we only receive a confirmation that a payment succeeded, along with
                        a transaction ID, for the booking it belongs to.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">Cookies</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        We use two <code className="text-xs">httpOnly</code> cookies to keep you
                        signed in — an access token and a refresh token. Neither is readable by
                        JavaScript in your browser. We also store your light/dark theme preference
                        locally on your device.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">Account status</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        Admins can suspend orban an account for platform abuse. A banned account
                        can not sign in or take new bookings until reinstated. You can request account
                        deletion at any time via the contact page.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">Terms of use</h2>
                    <p className="mt-2 text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        By booking a service you agree to pay the listed price once a technician
                        accepts your request. By listing a service as a technician, you agree to
                        honor accepted bookings or decline them promptly, and to keep your pricing
                        and availability accurate. FixItNow is a marketplace connecting customers and
                        independent technicians — jobs are performed by the technician, not by
                        FixService-Payment directly.
                    </p>
                </section>
            </div>
        </div>
    );
}
