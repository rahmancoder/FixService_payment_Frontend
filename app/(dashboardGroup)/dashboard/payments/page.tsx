import Link from 'next/link';
import { backendFetch } from '@/lib/backendFetch';
import { ApiResponse, Payment } from '@/lib/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import StatusBadge from '@/components/shared/status-badge';
import EmptyState from '@/components/shared/empty-state';

export const dynamic = 'force-dynamic';


async function getPayments() {
    return backendFetch<ApiResponse<Payment[]>>('/payments');
}


export default async function PaymentsHistoryPage() {
    const { data: payments } = await getPayments();

    if (payments.length === 0) {
        return (
            <EmptyState
                title="No payments yet"
                description="Once you pay for an accepted booking, the transaction will show up here."
            />
        );
    }


    return (
        <div className="docket overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-ink-50 text-left text-xs font-mono uppercase tracking-wide text-ink-400">
                        <th className="px-5 py-3">Transaction</th>
                        <th className="px-5 py-3">Service</th>
                        <th className="px-5 py-3">Amount</th>
                        <th className="px-5 py-3">Provider</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id} className="border-t border-ink-100">

                            <td className="px-5 py-3 font-mono text-xs text-ink-500">
                                {payment.transactionId.slice(0, 16)}…
                            </td>

                            <td className="px-5 py-3">
                                {payment.booking?.service ? (
                                    <Link
                                        href={`/dashboard/my-bookings/${payment.bookingId}`}
                                        className="text-ink-900 font-medium hover:text-rust-600"
                                    >
                                        {payment.booking.service.title}
                                    </Link>
                                ) : (
                                    <span className="text-ink-400">—</span>
                                )}
                            </td>

                            <td className="px-5 py-3 font-mono font-semibold text-rust-600">
                                {formatCurrency(payment.amount)}
                            </td>

                            <td className="px-5 py-3 text-ink-600">{payment.provider}</td>
                            <td className="px-5 py-3"><StatusBadge status={payment.status} /></td>
                            <td className="px-5 py-3 text-ink-500 text-xs">
                                {payment.paidAt ? formatDateTime(payment.paidAt) : '—'}
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
}