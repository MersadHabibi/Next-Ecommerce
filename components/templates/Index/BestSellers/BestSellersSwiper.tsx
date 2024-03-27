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

export default function BestSellersSwiper() {
  return (
    <Carousel
      opts={{
        align: "start",
        active: true,
      }}
      className="mt-3 w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <ProductCard />
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
