"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import ProductCardActions from "./ProductCardActions";
import { TProduct } from "@/types";

export default function ProductCard(product: TProduct) {
  const [isImageError, setImageError] = useState(false);

  return (
    <Card className="relative bg-neutral-100 p-4 shadow-none dark:bg-neutral-950">
      <CardHeader className="relative bg-transparent p-0">
        {/* <Heart className="absolute right-3 top-3 cursor-pointer text-red-600 transition-all hover:fill-red-600" /> */}

        <AspectRatio ratio={16 / 11}>
          <Image
            className="size-full rounded-md object-cover"
            src={`/${isImageError ? "images/no-image.jpg" : product.mainImage}`}
            width={300}
            height={300}
            alt="product"
            onError={(event) => {
              setImageError(true);
            }}
          />
        </AspectRatio>

        <CardTitle className="line-clamp-1 px-2 pt-2 text-2xl md:text-2xl lg:text-xl xl:text-2xl">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex items-center justify-between p-0 px-2 pt-2">
        <span
          className={cn(
            "text-2xl font-bold text-gray-700 opacity-70 dark:text-gray-300",
            notoSans.className,
          )}>
          ${product.price}
        </span>
      </CardFooter>
      <ProductCardActions {...product} />
    </Card>
  );
}
