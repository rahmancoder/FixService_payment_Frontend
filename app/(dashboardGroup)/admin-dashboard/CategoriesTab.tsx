'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createCategory } from '../_actions/adminActions';
import { categorySchema, CategoryFormValues } from '@/lib/schemas';
import { Category } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CategoriesTab({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormValues>({ resolver: zodResolver(categorySchema) });

    function onSubmit(values: CategoryFormValues) {
        startTransition(async () => {
            const res = await createCategory(values);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Category created');
                reset();
                router.refresh();
            }
        });
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="docket p-6 space-y-4 h-fit" noValidate>
                <h3 className="font-display font-semibold text-ink-950">Add a category</h3>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-xs text-brick mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" {...register('description')} />
                </div>
                <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
                    {isPending ? 'Creating…' : 'Create category'}
                </Button>
            </form>

            <div className="space-y-2">
                {categories.map(category => (
                    <div key={category.id} className="docket p-4">
                        <p className="font-medium text-ink-900">{category.name}</p>
                        {category.description && <p className="text-sm text-ink-500 mt-0.5">{category.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}