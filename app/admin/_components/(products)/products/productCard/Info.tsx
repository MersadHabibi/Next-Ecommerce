import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Product } from "@/types/Product";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Info(product: Product) {
  console.log(product);
  return (
    <Sheet>
      <SheetTrigger className="flex-center size-11 rounded-md bg-black text-white transition hover:opacity-80 dark:bg-white dark:text-black">
        <InfoIcon />
      </SheetTrigger>
      <SheetContent side="left" className="justify-start">
        <SheetHeader>
          <SheetTitle className={cn("mb-4 text-xl", notoSans.className)}>
            Product Info
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Title : </span>
            <span className="">{product.title}</span>
          </p>
          <p>
            <span className="font-medium">Price : </span>
            <span className="">${product.price}</span>
          </p>
          <p>
            <span className="font-medium">Description : </span>
            <span className="">{product.description}</span>
          </p>
          <p>
            <span className="font-medium">Gender : </span>
            <span className="">{product.gender}</span>
          </p>
          <p>
            <span className="font-medium">Category : </span>
            <span className="">{product.Category.title}</span>
          </p>
          <p>
            <span className="font-medium">Colors : </span>
            <span className="">
              {product.colors.map((color) => color).join(" , ")}
            </span>
          </p>
          <p>
            <span className="font-medium">Sizes : </span>
            <span className="">
              {product.sizes.map((size) => size).join(" , ")}
            </span>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
