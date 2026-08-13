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
                <Button variant="outline" className="dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-200">
                    + Add service
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-slate-900 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="dark:text-slate-100">List a new service</DialogTitle>
                    <DialogDescription className="dark:text-slate-400">
                        Customers will be able to find and book this immediately.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <Label htmlFor="title" className="dark:text-slate-200">Title</Label>
                        <Input
                            id="title"
                            {...register('title')}
                            className="bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                        />
                        {errors.title && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description" className="dark:text-slate-200">Description</Label>
                        <Textarea
                            id="description"
                            rows={2}
                            {...register('description')}
                            className="bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price" className="dark:text-slate-200">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                min={0}
                                step="0.01"
                                {...register('price', { valueAsNumber: true })}
                                className="bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                            />
                            {errors.price && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="categoryId" className="dark:text-slate-200">Category</Label>
                            <select
                                id="categoryId"
                                {...register('categoryId', { valueAsNumber: true })}
                                className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-950 dark:border-slate-700 px-3.5 py-2.5 text-sm text-foreground dark:text-slate-100 focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Select…</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.categoryId.message}</p>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-rust hover:bg-rust/90 text-white dark:bg-rust dark:text-white mt-2"
                        disabled={isPending}
                    >
                        {isPending ? 'Creating…' : 'Create service'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}