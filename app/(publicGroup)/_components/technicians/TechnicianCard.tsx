import Link from 'next/link';
import { TechnicianProfile } from '@/lib/types';

import { initials } from '@/lib/utils';
import RatingStars from '@/components/shared/rating-stars';

import { Badge } from '@/components/ui/badge';

export default function TechnicianCard({ technician }: { technician: TechnicianProfile }) {
    return (
        <Link
            href={`/technicians/${technician.id}`}
            className="docket group flex flex-col p-5 hover:-translate-y-0.5 transition-transform"
        >
            <div className="flex items-center gap-3">

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-900 text-paper font-mono text-sm font-semibold">
                    {initials(technician.user.name)}
                </span>

                <div className="min-w-0">
                    <h3 className="font-display font-semibold text-ink-950 group-hover:text-rust-600 transition-colors truncate">
                        {technician.user.name}
                    </h3>
                    <RatingStars rating={technician.avgRating} count={technician.totalReviews} />
                </div>

            </div>

            {technician.bio && <p className="mt-3 text-sm text-ink-500 line-clamp-2">{technician.bio}</p>}

            <div className="mt-4 pt-4 border-t border-dashed border-ink-100 flex flex-wrap gap-1.5">
                {technician.skills.slice(0, 3).map(skill => (
                    <Badge key={skill}>{skill}</Badge>
                ))}
                {technician.location && (
                    <Badge variant="warning" className="ml-auto">{technician.location}</Badge>
                )}
            </div>

        </Link>
    );
}