'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0F1830', '#E2691E', '#2F6E5E', '#8C99B8'];

export default function DistributionPieChart({
    title,
    subtitle,
    data,
    emptyMessage = 'Nothing to show yet.',
}: {
    title: string;
    subtitle: string;
    data: { name: string; value: number }[];
    emptyMessage?: string;
}) {
    const hasData = data.length > 0;

    return (
        <div className="docket p-5">
            <h3 className="font-display font-semibold text-ink-950 dark:text-white mb-1">{title}</h3>
            <p className="text-xs text-ink-400 dark:text-ink-500 mb-4">{subtitle}</p>
            {hasData ? (
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                            {data.map((entry, index) => (
                                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: 8,
                                fontSize: 12,
                                color: 'var(--card-foreground)',
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex h-[240px] items-center justify-center text-center px-6">
                    <p className="text-sm text-ink-400 dark:text-ink-500">{emptyMessage}</p>
                </div>
            )}
        </div>
    );
}
