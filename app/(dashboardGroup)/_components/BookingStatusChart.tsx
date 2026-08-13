'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function BookingStatusChart({
    data,
    title = 'Bookings by status',
    subtitle = 'Live counts from the current booking list.',
    emptyMessage = 'No bookings yet — this chart fills in automatically once bookings come in.',
    barColor = '#E2691E',
}: {
    data: { status: string; count: number }[];
    title?: string;
    subtitle?: string;
    emptyMessage?: string;
    barColor?: string;
}) {
    const hasData = data.length > 0;

    return (
        <div className="docket p-5">
            <h3 className="font-display font-semibold text-ink-950 dark:text-white mb-1">{title}</h3>
            <p className="text-xs text-ink-400 dark:text-ink-500 mb-4">{subtitle}</p>
            {hasData ? (
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={data} margin={{ left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-100 dark:text-ink-800" />
                        <XAxis dataKey="status" tick={{ fontSize: 11, fontFamily: 'monospace' }} stroke="currentColor" className="text-ink-400" />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="currentColor" className="text-ink-400" />
                        <Tooltip
                            contentStyle={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: 8,
                                fontSize: 12,
                                color: 'var(--card-foreground)',
                            }}
                        />
                        <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex h-[240px] items-center justify-center text-center px-6">
                    <p className="text-sm text-ink-400 dark:text-ink-500">{emptyMessage}</p>
                </div>
            )}
        </div>
    );
}
