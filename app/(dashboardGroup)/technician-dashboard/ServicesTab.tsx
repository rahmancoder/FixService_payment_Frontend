'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteService } from '../_actions/serviceActions';
import { Category, Service } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import ServiceFormDialog from '../_components/ServiceFormDialog';
import EmptyState from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';

export default function ServicesTab({ services, categories }: { services: Service[]; categories: Category[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete(id: number) {
        setDeletingId(id);
        startTransition(async () => {
            const res = await deleteService(id);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Service removed');
                router.refresh();
            }
            setDeletingId(null);
        });
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <ServiceFormDialog categories={categories} />
            </div>

            {services.length === 0 ? (
                <EmptyState title="No services listed" description="Add a service so customers can find and book you." />
            ) : (
                <div className="space-y-3">
                    {services.map(service => (
                        <div key={service.id} className="docket p-5 flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <h3 className="font-display font-semibold text-ink-950 dark:text-white">{service.title}</h3>
                                <p className="text-sm text-ink-500 dark:text-ink-400">{service.category?.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-semibold text-rust-600">{formatCurrency(service.price)}</span>
                                <Button
                                    variant="ghost"
                                    className="text-brick"
                                    disabled={isPending && deletingId === service.id}
                                    onClick={() => handleDelete(service.id)}
                                >
                                    {isPending && deletingId === service.id ? '…' : 'Delete'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
