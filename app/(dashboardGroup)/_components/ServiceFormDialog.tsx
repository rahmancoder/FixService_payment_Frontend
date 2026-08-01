'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createService } from '../_actions/serviceActions';
import { serviceSchema, ServiceFormValues } from '@/lib/schemas';
import { Category } from '@/lib/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ServiceFormDialog({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ServiceFormValues>({ resolver: zodResolver(serviceSchema) });

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    function onSubmit(values: ServiceFormValues) {

        // console.log(values);
        // console.log(typeof values.categoryId);
        // console.log(typeof values.price);

        startTransition(async () => {
            const res = await createService(values);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Service created successfully');
                setOpen(false);
                router.refresh();
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">+ Add service</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>List a new service</DialogTitle>
                    <DialogDescription>Customers will be able to find and book this immediately.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register('title')} />
                        {errors.title && <p className="text-xs text-brick mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={2} {...register('description')} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">Price ($)</Label>
                            {/* <Input id="price" type="number" min={0} step="0.01" {...register('price')} /> */}
                            <Input id="price" type="number" min={0} step="0.01" {...register('price', { valueAsNumber: true })} />
                            {errors.price && <p className="text-xs text-brick mt-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="categoryId">Category</Label>
                            {/* <select
                                id="categoryId"
                                {...register('categoryId')}
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                            > */}


                            <select
                                id="categoryId"
                                {...register('categoryId', { valueAsNumber: true })}
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">Select…</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-xs text-brick mt-1">{errors.categoryId.message}</p>}
                        </div>
                    </div>
                    {/* <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" {...register('location')} />
                    </div> */}
                    <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
                        {isPending ? 'Creating…' : 'Create service'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}