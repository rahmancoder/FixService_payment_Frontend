// 'use client';

// import { useTransition } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { updateProfile } from '../_actions/profileActions';
// import { technicianProfileSchema, TechnicianProfileFormValues } from '@/lib/schemas';
// import { TechnicianProfile } from '@/lib/types';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';

// export default function ProfileTab({ profile }: { profile: TechnicianProfile }) {
//     const router = useRouter();
//     const [isPending, startTransition] = useTransition();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<TechnicianProfileFormValues>({
//         resolver: zodResolver(technicianProfileSchema),


//         // In ProfileTab.tsx

//         defaultValues: {
//             bio: profile?.bio || '',
//             skills: profile?.skills?.join(', ') || '',
//             experience: profile?.experience ?? 0,
//             serviceRate: profile?.serviceRate ?? 0,
//             location: profile?.location || '',
//         },
//     });






//     function onSubmit(values: TechnicianProfileFormValues) {
//         startTransition(async () => {
//             const res = await updateProfile(values);
//             if (res.error) toast.error(res.error);
//             else {
//                 toast.success('Profile updated successfully');
//                 router.refresh();
//             }
//         });
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="docket p-6 max-w-xl space-y-5" noValidate>
//             <div>
//                 <Label htmlFor="bio">Bio</Label>
//                 <Textarea
//                     id="bio"
//                     rows={3}
//                     placeholder="Tell customers about your experience and specialties"
//                     {...register('bio')}
//                 />
//                 {errors.bio && <p className="text-xs text-brick mt-1">{errors.bio.message}</p>}
//             </div>

//             <div>
//                 <Label htmlFor="skills">Skills (comma-separated)</Label>
//                 <Input id="skills" placeholder="Plumbing, Pipe Fitting, Water Heaters" {...register('skills')} />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//                 <div>
//                     <Label htmlFor="experience">Years of experience</Label>
//                     {/* <Input id="experience" type="number" min={0} {...register('experience')} /> */}
//                     <Input id="experience" type="number" min={0} {...register('experience', { valueAsNumber: true })} />


//                     {errors.experience && <p className="text-xs text-brick mt-1">{errors.experience.message}</p>}
//                 </div>
//                 <div>
//                     <Label htmlFor="serviceRate">Hourly rate ($)</Label>
//                     {/* <Input id="serviceRate" type="number" min={0} {...register('serviceRate')} /> */}

//                     <Input
//                         id="serviceRate"
//                         type="number"
//                         min={0}
//                         {...register('serviceRate', { valueAsNumber: true })}
//                     />
//                     {errors.serviceRate && <p className="text-xs text-brick mt-1">{errors.serviceRate.message}</p>}
//                 </div>
//             </div>

//             <div>
//                 <Label htmlFor="location">Location</Label>
//                 <Input id="location" placeholder="e.g. Dhaka" {...register('location')} />
//             </div>

//             <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
//                 {isPending ? 'Saving…' : 'Save profile'}
//             </Button>
//         </form>
//     );
// }




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
        // defaultValues: {
        //     bio: profile.bio || '',
        //     skills: profile.skills.join(', ') || '',
        //     experience: profile.experience,
        //     serviceRate: profile.serviceRate,
        //     location: profile.location || '',
        // },


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
        <form onSubmit={handleSubmit(onSubmit)} className="docket p-6 max-w-xl space-y-5" noValidate>
            <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell customers about your experience and specialties"
                    {...register('bio')}
                />
                {errors.bio && <p className="text-xs text-brick mt-1">{errors.bio.message}</p>}
            </div>

            <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" placeholder="Plumbing, Pipe Fitting, Water Heaters" {...register('skills')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="experience">Years of experience</Label>
                    <Input id="experience" type="number" min={0} {...register('experience')} />
                    {errors.experience && <p className="text-xs text-brick mt-1">{errors.experience.message}</p>}
                </div>
                <div>
                    <Label htmlFor="serviceRate">Hourly rate ($)</Label>
                    <Input id="serviceRate" type="number" min={0} {...register('serviceRate')} />
                    {errors.serviceRate && <p className="text-xs text-brick mt-1">{errors.serviceRate.message}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. Dhaka" {...register('location')} />
            </div>

            <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
                {isPending ? 'Saving…' : 'Save profile'}
            </Button>
        </form>
    );
}
