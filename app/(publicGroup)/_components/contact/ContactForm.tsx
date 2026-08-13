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
        <form onSubmit={handleSubmit(onSubmit)} className="docket p-6 space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <Label htmlFor="name">Your name</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-xs text-brick mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register('email')} />
                    {errors.email && <p className="text-xs text-brick mt-1">{errors.email.message}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" {...register('subject')} />
                {errors.subject && <p className="text-xs text-brick mt-1">{errors.subject.message}</p>}
            </div>
            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Tell us what's up…" {...register('message')} />
                {errors.message && <p className="text-xs text-brick mt-1">{errors.message.message}</p>}
            </div>
            <Button type="submit" variant="accent" className="w-full sm:w-auto" disabled={isPending}>
                {isPending ? 'Sending…' : 'Send message'}
            </Button>
        </form>
    );
}
