import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, SquarePen } from "lucide-react";
import { Noto_Sans } from "next/font/google";
import Image from "next/image";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Product() {
  return (
    <div className="grid grid-cols-3 gap-x-6 rounded-lg border border-secondry p-3 dark:border-secondry-dark md:grid-cols-4 xl:grid-cols-5">
      <div className="flex-center col-span-3 mb-2 max-h-56 overflow-hidden rounded-md sm:col-span-1 sm:mb-0 sm:max-h-none">
        <AspectRatio ratio={16 / 16} className={cn("flex-center")}>
          <Image
            className={cn("h-full w-full rounded-md object-cover")}
            src="/images/products/product-4.jpg"
            alt="product"
            width={400}
            height={400}
          />
        </AspectRatio>
      </div>
      <div className="col-span-3 flex h-full w-full justify-between pt-2 sm:col-span-2 md:col-span-3 xl:col-span-4">
        <div>
          <h2 className="line-clamp-1 text-2xl font-medium">
            Adidas Ultraboost 21
          </h2>
          <span
            className={cn(
              "block pt-2 text-xl text-gray-700 opacity-70 dark:text-gray-300",
              notoSans.className,
            )}>
            $128.2
          </span>
          <div className="space-y-2 pt-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-x-2">
              <span className="font-medium">Color :</span>
              <div className="flex items-center gap-x-2">
                <div className="size-5 rounded-full border-2 border-neutral-400 bg-red-500 dark:border-secondry-dark"></div>
                <SquarePen className="size-5 cursor-pointer text-gray-700/70 hover:text-gray-700/90 dark:text-gray-300 dark:hover:text-gray-300" />
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="font-medium">Size :</span>
              <div className="flex items-center gap-x-2">
                <span>41</span>
                <SquarePen className="size-5 cursor-pointer text-gray-700/70 hover:text-gray-700/90 dark:text-gray-300 dark:hover:text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex h-24 w-9 flex-col items-center justify-between rounded-md border border-secondry p-1 dark:border-secondry-dark">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-full text-gray-700 dark:text-gray-300">
            <Plus className="size-5" />
          </Button>
          <span
            className={cn(
              "text-gray-900 dark:text-gray-200",
              notoSans.className,
            )}>
            1
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-full text-gray-700 dark:text-gray-300">
            <Minus className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
