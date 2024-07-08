"use client";

import ProductCard from "@/components/modules/ProductCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";

export default function NewestProductsSwiper({
  products,
}: {
  products: TProduct[];
}) {
  const sortedProducts = products.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0;
  });

  return (
    <Carousel
      opts={{
        align: "start",
        active: true,
      }}
      className="w-full">
      <CarouselContent>
        {sortedProducts.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-x-2 pt-6 md:justify-end">
        <CarouselPrevious className={cn("static translate-y-0")} />
        <CarouselNext className={cn("static translate-y-0")} />
      </div>
    </Carousel>
  );
}
