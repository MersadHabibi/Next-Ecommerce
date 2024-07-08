import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="border-secondary dark:border-secondary-dark relative rounded-lg border bg-neutral-100 p-3 shadow-none dark:bg-neutral-950 xl:p-5">
      <AspectRatio ratio={16 / 11} className="mb-3 xl:mb-6">
        <Skeleton className="h-full w-full object-cover" />
      </AspectRatio>
      <div>
        <Skeleton className="mb-3 h-8 w-full xl:mb-5" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[70%]" />
          <Skeleton className="size-8" />
        </div>
      </div>
    </div>
  );
}
