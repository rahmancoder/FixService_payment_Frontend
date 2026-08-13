import { Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ContactForm from '../_components/contact/ContactForm';

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-4xl px-5 py-16">
            <Badge variant="warning">Get in touch</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 dark:text-white">Contact us</h1>
            <p className="mt-3 text-ink-600 dark:text-ink-300 max-w-lg">
                Questions about a booking, a technician application, or the platform itself —
                send us a note and we will follow up by email.
            </p>

            <div className="mt-10 grid md:grid-cols-[1fr_1.3fr] gap-8">
                <div className="space-y-4">
                    <div className="docket p-5 flex items-start gap-3">
                        <Mail className="h-5 w-5 text-rust-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-ink-900 dark:text-white">Email</p>
                            <p className="text-sm text-ink-500 dark:text-ink-400">support@fixitnow.example</p>
                        </div>
                    </div>
                    <div className="docket p-5 flex items-start gap-3">
                        <Phone className="h-5 w-5 text-rust-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-ink-900 dark:text-white">Phone</p>
                            <p className="text-sm text-ink-500 dark:text-ink-400">+880 1XXX-XXXXXX</p>
                        </div>
                    </div>
                    <div className="docket p-5 flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-rust-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-ink-900 dark:text-white">Based in</p>
                            <p className="text-sm text-ink-500 dark:text-ink-400">Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </div>

                <ContactForm />
            </div>
        </div>
    );
}
