'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateProfile } from '../_actions/profileActions';
import { technicianProfileSchema, TechnicianProfileFormValues } from '@/lib/schemas';
import { TechnicianProfile } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ProfileTab({ profile }: { profile: TechnicianProfile }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TechnicianProfileFormValues>({
        resolver: zodResolver(technicianProfileSchema),
        defaultValues: {
            bio: profile?.bio || '',
            skills: profile?.skills?.join(', ') || '',
            experience: profile?.experience ?? 0,
            serviceRate: profile?.serviceRate ?? 0,
            location: profile?.location || '',
        },
    });

    function onSubmit(values: TechnicianProfileFormValues) {
        startTransition(async () => {
            const res = await updateProfile(values);
            if (res.error) toast.error(res.error);
            else {
                toast.success('Profile updated successfully');
                router.refresh();
            }
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="docket p-6 max-w-xl space-y-5 rounded-lg border border-transparent dark:border-ink-800 dark:bg-ink-900/50"
            noValidate
        >
            <div>
                <Label htmlFor="bio" className="dark:text-white">Bio</Label>
                <Textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell customers about your experience and specialties"
                    {...register('bio')}
                    className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                />
                {errors.bio && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.bio.message}</p>}
            </div>

            <div>
                <Label htmlFor="skills" className="dark:text-white">Skills (comma-separated)</Label>
                <Input
                    id="skills"
                    placeholder="Plumbing, Pipe Fitting, Water Heaters"
                    {...register('skills')}
                    className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="experience" className="dark:text-white">Years of experience</Label>
                    <Input
                        id="experience"
                        type="number"
                        min={0}
                        {...register('experience')}
                        className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                    />
                    {errors.experience && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.experience.message}</p>}
                </div>
                <div>
                    <Label htmlFor="serviceRate" className="dark:text-white">Hourly rate ($)</Label>
                    <Input
                        id="serviceRate"
                        type="number"
                        min={0}
                        {...register('serviceRate')}
                        className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                    />
                    {errors.serviceRate && <p className="text-xs text-brick dark:text-red-400 mt-1">{errors.serviceRate.message}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="location" className="dark:text-white">Location</Label>
                <Input
                    id="location"
                    placeholder="e.g. Dhaka"
                    {...register('location')}
                    className="dark:bg-ink-950 dark:border-ink-800 dark:text-white dark:placeholder:text-ink-500"
                />
            </div>

            <Button
                type="submit"
                variant="accent"
                className="w-full transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-95 disabled:hover:brightness-100 disabled:hover:shadow-none"
                disabled={isPending}
            >
                {isPending ? 'Saving…' : 'Save profile'}
            </Button>
        </form>
    );
}