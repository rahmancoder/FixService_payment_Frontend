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
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="docket p-6 space-y-4 h-fit bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm"
                noValidate
            >
                <h3 className="font-display font-semibold text-slate-900 dark:text-slate-100 text-lg">Add a category</h3>
                <div>
                    <Label htmlFor="name" className="dark:text-slate-200">Name</Label>
                    <Input
                        id="name"
                        {...register('name')}
                        className="bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 mt-1"
                    />
                    {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label htmlFor="description" className="dark:text-slate-200">Description</Label>
                    <Input
                        id="description"
                        {...register('description')}
                        className="bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 mt-1"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-rust hover:bg-rust/90 text-white dark:bg-rust dark:text-white mt-2"
                    disabled={isPending}
                >
                    {isPending ? 'Creating…' : 'Create category'}
                </Button>
            </form>

            <div className="space-y-3">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="docket p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm"
                    >
                        <p className="font-medium text-slate-900 dark:text-slate-100">{category.name}</p>
                        {category.description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{category.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}