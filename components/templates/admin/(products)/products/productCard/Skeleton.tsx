import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="relative bg-neutral-100 p-4 shadow-none dark:bg-neutral-950">
      <CardHeader className="relative bg-transparent p-0">
        <AspectRatio ratio={16 / 11}>
          <Skeleton className="h-full w-full object-cover" />
        </AspectRatio>

        <CardTitle className="line-clamp-1 px-2 pt-2">
          <Skeleton className="h-8 w-full" />
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex items-center justify-between p-0 px-2 pt-2">
        <Skeleton className="mt-2 h-6 w-[70%]" />
      </CardFooter>
      <div className="mt-4 flex flex-wrap justify-end gap-4 pt-4">
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
      </div>
    </Card>
  );
}
