import { Category } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import Link from 'next/link';



export default function ServiceSearchBar({
    categories,
    searchParams,
}: {
    categories: Category[];
    searchParams?: Record<string, string | undefined>;
}) {
    return (
        <form action="/services" method="GET" className="docket p-5 space-y-5 lg:sticky lg:top-24">
            <div>
                <Label htmlFor="searchTerm">Search</Label>
                <Input
                    id="searchTerm"
                    name="searchTerm"
                    // defaultValue={searchParams.searchTerm}
                    defaultValue={searchParams?.searchTerm ?? ''}
                    placeholder=" plumbing, cleaning"
                />
            </div>

            <div>
                <Label htmlFor="categoryId">Category</Label>
                <select
                    id="categoryId"
                    name="categoryId"
                    defaultValue={searchParams?.categoryId || ''}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <option value="">All categories</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={searchParams?.location} placeholder="Dhaka " />
            </div> */}

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Label htmlFor="minPrice">Min $</Label>
                    <Input id="minPrice" name="minPrice" type="number" min={0} defaultValue={searchParams?.minPrice} />
                </div>
                <div>
                    <Label htmlFor="maxPrice">Max $</Label>
                    <Input id="maxPrice" name="maxPrice" type="number" min={0} defaultValue={searchParams?.maxPrice} />
                </div>
            </div>

            <Button type="submit" className="w-full">Apply filters</Button>
            {(searchParams?.searchTerm || searchParams?.categoryId || searchParams?.location || searchParams?.minPrice) && (


                <Link
                    href="/services"
                    className="block text-center text-xs text-ink-500 hover:text-rust-600 font-mono uppercase tracking-wide"
                >
                    Clear all
                </Link>
            )}
        </form>
    );
}