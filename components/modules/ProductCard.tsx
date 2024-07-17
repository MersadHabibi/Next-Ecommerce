"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { TProduct } from "@/types";

export default function ProductCard({ id, title, mainImage, price }: TProduct) {
  const [isImageError, setImageError] = useState(false);

  return (
    <Card className="card-inverted-border relative grid h-full grid-rows-1 bg-neutral-100 shadow-none dark:bg-neutral-950">
      <CardHeader className="relative h-full !gap-0 bg-transparent p-4">
        {/* <Heart className="absolute right-3 top-3 cursor-pointer text-red-600 transition-all hover:fill-red-600" /> */}

        <div className="flex-center !h-full max-h-56 w-full overflow-hidden rounded-md py-2 sm:h-72 sm:max-h-none md:h-60 lg:h-[145px] xl:h-44">
          <Image
            className="size-full overflow-visible rounded-md object-contain p-2"
            src={`/${isImageError ? "images/no-image.jpg" : mainImage}`}
            width={300}
            height={300}
            alt={title}
            onError={(event) => {
              setImageError(true);
            }}
          />
        </div>
        <CardTitle className="mb-2 line-clamp-1 pt-2 text-2xl md:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="mt-auto flex !h-fit !min-h-0 items-center justify-between px-4 py-5 sm:py-3">
        <span
          className={cn(
            "text-2xl font-bold text-gray-700 opacity-70 dark:text-gray-300",
            notoSans.className,
          )}>
          ${price}
        </span>
      </CardFooter>
      <div className="absolute bottom-0 right-0 z-10 size-fit rounded-ss-xl bg-white outline outline-[2px]  outline-white dark:bg-black dark:outline-black">
        <div className="w-full rounded-ss-xl border-l border-t border-secondary p-2 dark:border-secondary-dark">
          <Link href={`/product/${id}`}>
            <Button size="icon" className="size-11 bg-black dark:bg-white">
              <ShoppingBag />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
