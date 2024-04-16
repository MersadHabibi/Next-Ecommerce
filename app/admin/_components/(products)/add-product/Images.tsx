"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FolderSync, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FileInput from "../../FileInput";
import { useNewProduct } from "@/stores/newProduct";

export type imageType = {
  sortId: number;
  image: File;
};

export default function AddProductImages() {
  const mainImage = useNewProduct((state) => state.mainImage);
  const setMainImage = useNewProduct((state) => state.setMainImage);
  const images = useNewProduct((state) => state.images);
  const setImages = useNewProduct((state) => state.setImages);

  return (
    <>
      <div className="w-full rounded-md border border-secondry bg-neutral-200 dark:border-secondry-dark dark:bg-neutral-950 lg:rounded-md">
        {mainImage ? (
          <AspectRatio
            ratio={16 / 14}
            className={cn("flex-center relative overflow-hidden rounded-md")}>
            <FileInput
              id="mainImage-2"
              classname="absolute top-3 right-3 size-12 bg-neutral-100/50 hover:bg-neutral-100/80 dark:bg-neutral-900/50 dark:hover:bg-neutral-900/80 transition-colors"
              onchange={(event) => {
                if (event.target.files) setMainImage(event.target.files[0]);
              }}>
              <FolderSync className="size-6" />
            </FileInput>
            <Image
              src={URL.createObjectURL(mainImage)}
              className="h-full w-full object-cover"
              alt="none"
              width={500}
              height={500}
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 14} className="">
            <FileInput
              id="mainImage"
              onchange={(event) => {
                if (event.target.files) setMainImage(event.target.files[0]);
              }}>
              <ImagePlus className="size-12" />
              <span className="mt-2">Choose Image</span>
            </FileInput>
          </AspectRatio>
        )}
      </div>
      <div className="mt-2 grid w-full grid-cols-4 gap-2 sm:mt-3 sm:gap-3">
        {new Array(4).fill("").map((value, index) => {
          let isSelected = images?.find((item) => item.sortId === index);

          if (isSelected) {
            return (
              <div
                key={index}
                className="relative w-full cursor-pointer overflow-hidden rounded-sm opacity-70 hover:opacity-100 lg:rounded-md">
                <FileInput
                  id={`image-${index}-2`}
                  classname="absolute inset-0 size-full z-10 !bg-transparent hover:!bg-transparent"
                  onchange={(event) => {
                    let newImages = images.filter(
                      (item) => item.sortId !== index,
                    );

                    if (event.target.files)
                      setImages([
                        ...newImages,
                        {
                          sortId: index,
                          image: event.target.files[0],
                        },
                      ]);
                  }}></FileInput>

                <AspectRatio
                  ratio={16 / 16}
                  className={cn(
                    "flex-center overflow-hidden rounded-sm lg:rounded-md",
                  )}>
                  <Image
                    className={cn("h-full w-full object-cover")}
                    src={URL.createObjectURL(isSelected.image)}
                    alt=""
                    width={100}
                    height={100}
                    quality={60}
                  />
                </AspectRatio>
              </div>
            );
          } else {
            return (
              <AspectRatio key={index} ratio={16 / 16} className="">
                <FileInput
                  id={`image-${index}`}
                  classname="size-full bg-neutral-200 dark:bg-neutral-950"
                  onchange={(event) => {
                    if (event.target.files)
                      setImages([
                        ...images,
                        {
                          sortId: index,
                          image: event.target.files[0],
                        },
                      ]);
                  }}>
                  <ImagePlus className="size-6" />
                </FileInput>
              </AspectRatio>
            );
          }
        })}
      </div>
    </>
  );
}
