"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FolderSync, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FileInput from "../FileInput";

type imageType = {
  sortId: number;
  image: FileList;
};

export default function AddProductImages() {
  const [mainImage, setMainImage] = useState<imageType | null>();

  const [images, setImages] = useState<imageType[]>([]);

  console.log(images);

  return (
    <>
      <div className="w-full rounded-sm border border-secondry bg-neutral-200 dark:border-secondry-dark dark:bg-neutral-950 lg:rounded-md">
        {mainImage?.image ? (
          <AspectRatio
            ratio={16 / 14}
            className={cn(
              "flex-center relative overflow-hidden rounded-sm lg:rounded-md",
            )}>
            <FileInput
              id="mainImage-2"
              classname="absolute top-3 right-3 size-12 bg-neutral-100/50 hover:bg-neutral-100/80 dark:bg-neutral-900/50 dark:hover:bg-neutral-900/80 transition-colors"
              onchange={(event) =>
                setMainImage({
                  sortId: 0,
                  image: event.target.files as FileList,
                })
              }>
              <FolderSync className="size-6" />
            </FileInput>
            <Image
              src={URL.createObjectURL(mainImage.image[0])}
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
              onchange={(event) =>
                setMainImage({
                  sortId: 0,
                  image: event.target.files as FileList,
                })
              }>
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

                    setImages((items) => [
                      ...newImages,
                      {
                        sortId: index,
                        image: event.target.files as FileList,
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
                    src={URL.createObjectURL(isSelected.image[0])}
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
                    setImages((items) => [
                      ...items,
                      {
                        sortId: index,
                        image: event.target.files as FileList,
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
