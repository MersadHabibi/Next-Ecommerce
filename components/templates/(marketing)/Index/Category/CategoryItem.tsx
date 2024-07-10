"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CategoryItem({
  title,
  imageSrc,
}: {
  title: string;
  imageSrc: string;
}) {
  const [isImageError, setImageError] = useState(false);

  return (
    <Link href={`./category?category=${title}`}>
      <Card
        className={cn(
          "bg-neutral-100 shadow-none transition-colors hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900",
        )}>
        <CardContent className={cn("p-0 pb-6")}>
          <div
            className={cn("flex-center w-full overflow-hidden rounded-md p-5")}>
            <AspectRatio ratio={16 / 9}>
              <Image
                className={cn("h-full w-full rounded-md object-cover")}
                src={isImageError ? "/images/no-image.jpg" : imageSrc}
                alt={title}
                width={300}
                height={300}
                onError={(event) => {
                  setImageError(true);
                }}
              />
            </AspectRatio>
          </div>
          <CardTitle
            className={cn(
              "text-center text-2xl font-bold",
              notoSans.className,
            )}>
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
