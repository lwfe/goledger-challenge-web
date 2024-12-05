import { Skeleton } from "@/components/ui/skeleton";

export function AlbumSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-[300px] h-[300px] rounded-md" />

      <div className="space-y-1 text-sm">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
