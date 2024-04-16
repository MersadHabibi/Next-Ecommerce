import { AspectRatio } from "@/components/ui/aspect-ratio";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Noto_Sans } from "next/font/google";
import ProductCardActions from "./ProductCardActions";
import { Product } from "@/types/Product";
import { Skeleton } from "@/components/ui/skeleton";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

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
        <Skeleton className="h-6 w-[70%] mt-2" />
      </CardFooter>
      <div className="flex flex-wrap gap-4 justify-end pt-4 mt-4">
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
      </div>
    </Card>
  );
}
