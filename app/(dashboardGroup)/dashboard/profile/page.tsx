import { getMe } from '@/service/getMe';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default async function CustomerProfilePage() {
    const user = await getMe();

    return (
        <div className="docket p-6 max-w-lg">
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Account details</h2>
            <dl className="space-y-4 text-sm">
                <div>
                    <dt className="text-ink-400 font-mono text-xs uppercase">Name</dt>
                    <dd className="mt-1 text-ink-900 font-medium">{user?.name}</dd>
                </div>
                <div>
                    <dt className="text-ink-400 font-mono text-xs uppercase">Email</dt>
                    <dd className="mt-1 text-ink-900">{user?.email}</dd>
                </div>

                <div>
                    <dt className="text-ink-400 font-mono text-xs uppercase">Member since</dt>
                    <dd className="mt-1 text-ink-900">{user && formatDate(user.createdAt)}</dd>
                </div>
                <div>
                    <dt className="text-ink-400 font-mono text-xs uppercase">Status</dt>
                    <dd className="mt-1">{user && <Badge variant="success">{user.status}</Badge>}</dd>
                </div>
            </dl>
            <p className="mt-6 text-xs text-ink-400">
                Profile editing isnt available yet — contact support if you need to update your details.
            </p>
        </div>
    );
}