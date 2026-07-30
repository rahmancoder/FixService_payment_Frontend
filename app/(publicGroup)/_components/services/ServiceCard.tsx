import Link from 'next/link';
import { Service } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import RatingStars from '@/components/shared/rating-stars';

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <Link href={`/services/${service.id}`} className="docket group flex flex-col p-5 hover:-translate-y-0.5 transition-transform">

            <div className="flex items-start justify-between gap-3">
                <Badge>{service.category?.name || 'Service'}</Badge>
                <span className="font-mono text-sm font-semibold text-rust-600">
                    {formatCurrency(service.price)}
                </span>
            </div>

            <h3 className="mt-3 font-display text-lg font-semibold text-ink-950 group-hover:text-rust-600 transition-colors">
                {service.title}
            </h3>

            {service.description && (
                <p className="mt-1.5 text-sm text-ink-500 line-clamp-2">{service.description}</p>
            )}


            <div className="mt-4 pt-4 border-t border-dashed border-ink-100 flex items-center justify-between text-sm">
                <span className="text-ink-700 font-medium">{service.technician?.user?.name || 'Technician'}</span>
                {service.technician && (
                    <RatingStars rating={service.technician.avgRating} count={service.technician.totalReviews} />
                )}
            </div>

        </Link>
    );
}