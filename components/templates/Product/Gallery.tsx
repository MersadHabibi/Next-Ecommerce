"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useState } from "react";

const fakeContent = [
  // "/images/products/product-4.jpg",
  "/images/products/product-2.png",
  "/images/products/product-6.jpg",
  "/images/products/product-7.jfif",
  "/images/products/product-8.jpg",
];

export default function Gallery({ product }: { product: Product }) {
  const [isImageNotFound, setIsImageNotFound] = useState(false);
  const [mainImage, setMainImage] = useState(product.mainImage);
  const [images, setImages] = useState(product.images);

  function imageClickHandler(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    image: string,
  ): void {
    const newImages = images.map((prevImage) => {
      if (prevImage === image) {
        return mainImage;
      }

      return prevImage;
    });
    setImages(newImages);
    setMainImage(image);
  }

  return (
    <>
      <div className="w-full rounded-sm border border-secondry bg-neutral-200 dark:border-secondry-dark dark:bg-neutral-950/80 lg:rounded-md lg:border-none">
        <AspectRatio
          ratio={16 / 13}
          className={cn(
            "flex-center overflow-hidden rounded-sm lg:rounded-md",
          )}>
          <Image
            className={cn("h-full w-full object-cover")}
            src={`/${isImageNotFound ? "images/no-image.jpg" : mainImage}`}
            alt="none"
            width={500}
            height={500}
            onError={() => setIsImageNotFound(true)}
          />
        </AspectRatio>
      </div>
      <div className="mt-2 grid w-full grid-cols-4 gap-2 sm:mt-3 sm:gap-3">
        {images.map((image) => (
          <div
            key={image}
            className={cn(
              "w-full cursor-pointer overflow-hidden rounded-sm opacity-70 hover:opacity-100 lg:rounded-md",
              mainImage === image && "opacity-100",
            )}>
            <AspectRatio
              ratio={16 / 16}
              className={cn(
                "flex-center overflow-hidden rounded-sm border border-secondry dark:border-secondry-dark lg:rounded-md",
              )}>
              <Image
                onClick={(event) => imageClickHandler(event, image)}
                className={cn("h-full w-full object-cover")}
                src={`/${image}`}
                alt=""
                width={100}
                height={100}
                quality={60}
                onError={(event) => {
                  // event.currentTarget.src = "/images/no-image.jpg";
                  const newImages = images.map((prevImage) => {
                    if (prevImage === image) {
                      return "images/no-image.jpg";
                    }

                    return prevImage;
                  });

                  setImages(newImages);
                }}
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </>
  );
}
