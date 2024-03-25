"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const fakeContent = [
  // "/images/products/product-4.jpg",
  "/images/products/product-5.webp",
  "/images/products/product-6.jpg",
  "/images/products/product-7.jfif",
  "/images/products/product-8.jpg",
];

export default function ProductGallery() {
  const [mainImage, setMainImage] = useState<string>(fakeContent[0]);

  function imageClickHandler(image: string): void {
    setMainImage(image);
  }

  return (
    <>
      <div className="w-full rounded-sm border border-secondry dark:border-secondry-dark lg:rounded-md">
        <AspectRatio
          ratio={16 / 13}
          className={cn(
            "flex-center overflow-hidden rounded-sm lg:rounded-md",
          )}>
          <Image
            className={cn("h-full w-full object-cover")}
            src={mainImage}
            alt="none"
            width={500}
            height={500}
          />
        </AspectRatio>
      </div>
      <div className="mt-2 grid w-full grid-cols-4 gap-2 sm:mt-3 sm:gap-3">
        {fakeContent.map((image) => (
          <div
            key={image}
            className={cn(
              "w-full cursor-pointer overflow-hidden rounded-sm opacity-70 hover:opacity-100 lg:rounded-md",
              mainImage === image && "opacity-100",
            )}>
            <AspectRatio
              ratio={16 / 16}
              className={cn(
                "flex-center overflow-hidden rounded-sm lg:rounded-md",
              )}>
              <Image
                onClick={() => imageClickHandler(image)}
                className={cn("h-full w-full object-cover")}
                src={image}
                alt=""
                width={100}
                height={100}
                quality={60}
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </>
  );
}
