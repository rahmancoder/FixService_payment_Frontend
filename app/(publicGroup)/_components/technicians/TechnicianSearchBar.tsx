import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TechnicianSearchBar({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    return (
        <form action="/technicians" method="GET" className="docket p-5 mb-8 grid sm:grid-cols-4 gap-4">
            <Input name="searchTerm" defaultValue={searchParams.searchTerm} placeholder="Search by name or bio" className="sm:col-span-2" />
            <Input name="location" defaultValue={searchParams.location} placeholder="Location" />
            <Input name="minRating" type="number" min={0} max={5} step={0.5} defaultValue={searchParams.minRating} placeholder="Min rating" />
            <Button type="submit" className="sm:col-span-4">Search</Button>
        </form>
    );
}