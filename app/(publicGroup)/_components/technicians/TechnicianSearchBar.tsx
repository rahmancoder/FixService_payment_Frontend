// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// export default function TechnicianSearchBar({
//     searchParams,
// }: {
//     searchParams: Record<string, string | undefined>;
// }) {
//     return (
//         <form action="/technicians" method="GET" className="docket p-5 mb-8 grid sm:grid-cols-4 gap-4">
//             <Input name="searchTerm" defaultValue={searchParams.searchTerm} placeholder="Search by name or bio" className="sm:col-span-2" />
//             <Input name="location" defaultValue={searchParams.location} placeholder="Location" />
//             <Input name="minRating" type="number" min={0} max={5} step={0.5} defaultValue={searchParams.minRating} placeholder="Min rating" />
//             <Button type="submit" className="sm:col-span-4">Search</Button>
//         </form>
//     );
// }






import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TechnicianSearchBar({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <form action="/technicians" method="GET" className="docket p-5 mb-8 grid sm:grid-cols-5 gap-4">
            <Input name="searchTerm" defaultValue={searchParams.searchTerm} placeholder="Search by name or bio" className="sm:col-span-2" />
            <Input name="location" defaultValue={searchParams.location} placeholder="Location" />
            <Input name="minRating" type="number" min={0} max={5} step={0.5} defaultValue={searchParams.minRating} placeholder="Min rating" />
            <select
                name="sort"
                defaultValue={searchParams.sort || 'newest'}
                className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-ink-900 px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
            >
                <option value="newest">Newest first</option>
                <option value="rating-desc">Highest rated</option>
                <option value="experience-desc">Most experienced</option>
                <option value="price-asc">Lowest rate</option>
            </select>
            <Button type="submit" className="sm:col-span-5">Search</Button>
        </form>
    );
}
