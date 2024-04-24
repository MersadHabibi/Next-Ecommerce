"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function CategoryItem({
  title,
  imageSrc,
}: {
  title: string;
  imageSrc: string;
}) {
  const [isImageError, setImageError] = useState(false);

  return (
    <Link href="./">
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
          <CardTitle className={cn("text-center text-2xl", notoSans.className)}>
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
