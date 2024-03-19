"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";
import { Noto_Sans } from "next/font/google";
import { Button } from "../ui/button";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function ProductCard() {
  return (
    <Card
      className={cn(
        "card-inverted-border relative bg-neutral-100 shadow-none dark:bg-neutral-950",
      )}>
      <CardHeader className={cn("relative bg-transparent px-4 py-3")}>
        <Heart
          className={cn(
            "absolute right-4 top-4 transition-colors hover:text-red-600",
          )}
        />

        <div
          className={cn(
            "flex-center max-h-56 w-full overflow-hidden px-5 py-2 sm:h-72 sm:max-h-none md:h-60 lg:h-[145px] xl:h-44",
          )}>
          <Image
            className={cn("rounded-md object-cover")}
            src="/images/products/product-1.png"
            width={300}
            height={300}
            alt="product"
          />
        </div>
        <CardTitle
          className={cn(
            "mb-2 line-clamp-1 pt-2 text-2xl sm:text-xl md:text-2xl lg:text-xl xl:text-2xl",
          )}>
          Adidas Ultraboost 21
        </CardTitle>
      </CardHeader>
      <CardFooter className={cn("flex items-center justify-between px-4 py-3")}>
        <span
          className={cn(
            "text-2xl text-gray-700 opacity-70 dark:text-gray-300",
            notoSans.className,
          )}>
          $128.2
        </span>
      </CardFooter>
      <div
        className={cn(
          "absolute bottom-0 right-0 z-10 size-fit rounded-ss-xl bg-white outline outline-[1px] -outline-offset-0 outline-white dark:bg-black dark:outline-black",
        )}>
        <div
          className={cn(
            "w-full rounded-ss-xl border-l border-t border-secondry p-2 dark:border-secondry-dark",
          )}>
          <Button size="icon" className={cn("size-11 bg-black dark:bg-white")}>
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </Card>
  );
}
