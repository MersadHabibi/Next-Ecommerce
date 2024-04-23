import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCartSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-x-6 rounded-lg border border-secondry p-3 dark:border-secondry-dark md:grid-cols-4 xl:grid-cols-5">
      <div className="flex-center col-span-3 mb-2 max-h-56 overflow-hidden rounded-md sm:col-span-1 sm:mb-0 sm:max-h-none">
        <AspectRatio ratio={16 / 16} className="flex-center">
          <Skeleton className="size-full object-cover" />
        </AspectRatio>
      </div>
      <div className="col-span-3 flex h-full w-full justify-between pt-2 sm:col-span-2 md:col-span-3 xl:col-span-4">
        <div>
          <Skeleton className="mb-3 h-8 w-44 sm:w-64" />
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2 pt-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-x-2">
              <Skeleton className="block h-5 w-10" />
              <div className="flex items-center gap-x-2">
                <Skeleton className="size-5 rounded-full" />
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-2 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-x-2">
              <Skeleton className="block h-5 w-10" />
              <div className="flex items-center gap-x-2">
                <Skeleton className="size-5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="w-9 h-24 mt-auto" />
      </div>
    </div>
  );
}
