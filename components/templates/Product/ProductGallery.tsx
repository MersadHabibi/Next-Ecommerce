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
    <div>
      <div className="w-full rounded-lg border border-secondry dark:border-secondry-dark">
        <AspectRatio
          ratio={16 / 13}
          className={cn("flex-center overflow-hidden rounded-lg")}>
          <Image
            className={cn("h-full w-full object-cover ")}
            src={mainImage}
            alt="none"
            width={500}
            height={500}
          />
        </AspectRatio>
      </div>
      <div className="mt-3 grid w-full grid-cols-4 gap-3">
        {fakeContent.map((image) => (
          <div
            key={image}
            className={cn(
              "h-28 w-full cursor-pointer overflow-hidden rounded-lg opacity-70 hover:opacity-100",
              mainImage === image && "opacity-100",
            )}>
            <Image
              onClick={() => imageClickHandler(image)}
              className={cn("h-full w-full object-cover")}
              src={image}
              alt=""
              width={100}
              height={50}
              quality={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
