import BookingSkeleton from "../../_components/BookingSkeleton";

export default function Loading() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <BookingSkeleton key={i} />
            ))}
        </div>
    );
}