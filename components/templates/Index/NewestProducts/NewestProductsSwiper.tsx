"use client";

import ProductCard from "@/components/modules/ProductCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function NewestProductsSwiper() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <ProductCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
