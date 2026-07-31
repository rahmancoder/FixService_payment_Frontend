import { Badge } from '@/components/ui/badge';
import { BookingStatus, PaymentStatus, UserStatus } from '@/lib/types';

const variantMap: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'muted'> = {
    REQUESTED: 'default',
    ACCEPTED: 'success',
    DECLINED: 'destructive',
    PAID: 'warning',
    IN_PROGRESS: 'default',
    COMPLETED: 'success',
    CANCELLED: 'muted',
    PENDING: 'default',
    FAILED: 'destructive',
    ACTIVE: 'success',
    BANNED: 'destructive',
};

export default function StatusBadge({
    status,
}: {
    status: BookingStatus | PaymentStatus | UserStatus | string;
}) {
    return <Badge variant={variantMap[status] || 'default'}>{status.replace('_', ' ')}</Badge>;
}