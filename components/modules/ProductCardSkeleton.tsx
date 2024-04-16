import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="p-3 xl:p-5 relative bg-neutral-100 shadow-none dark:bg-neutral-950 rounded-lg border border-secondry dark:border-secondry-dark">
      <AspectRatio ratio={16 / 11} className="mb-3 xl:mb-6">
        <Skeleton className="h-full w-full object-cover" />
      </AspectRatio>
      <div>
        <Skeleton className="mb-3 xl:mb-5 h-8 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[70%]" />
          <Skeleton className="size-8" />
        </div>
      </div>
    </div>
  );
}
