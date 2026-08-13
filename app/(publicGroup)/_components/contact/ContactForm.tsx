'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { sendContactMessage } from '../../_actions/sendContactMessage';
import { contactSchema, ContactFormValues } from '@/lib/schemas';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

    function onSubmit(values: ContactFormValues) {
        startTransition(async () => {
            const res = await sendContactMessage(values);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Message sent — we'll get back to you soon.");
                reset();
            }
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="docket p-6 space-y-5 rounded-lg border border-transparent dark:border-ink-800 dark:bg-ink-900/50"
            noValidate
        >
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <Label htmlFor="name" className="dark:text-ink-200 dark:text-white">Your name</Label>
                    <Input
                        id="name"
                        {...register('name')}
                        className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                    />
                    {errors.name && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label htmlFor="email" className="dark:text-ink-200 dark:text-white">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                    />
                    {errors.email && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.email.message}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="subject" className="dark:text-ink-200 dark:text-white">Subject</Label>
                <Input
                    id="subject"
                    placeholder="What's this about?"
                    {...register('subject')}
                    className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                />
                {errors.subject && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.subject.message}</p>}
            </div>
            <div>
                <Label htmlFor="message" className="dark:text-ink-200 dark:text-white">Message</Label>
                <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us what's up…"
                    {...register('message')}
                    className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                />
                {errors.message && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.message.message}</p>}
            </div>
            {/* <Button type="submit" variant="accent" className="w-full sm:w-auto" disabled={isPending}>
                {isPending ? 'Sending…' : 'Send message'}
            </Button> */}


            <Button
                type="submit"
                variant="accent"
                className="w-full sm:w-auto transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-95 disabled:hover:brightness-100 disabled:hover:shadow-none"
                disabled={isPending}
            >
                {isPending ? 'Sending…' : 'Send message'}
            </Button>
        </form>
    );
}