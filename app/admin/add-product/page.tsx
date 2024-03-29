import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { Noto_Sans } from "next/font/google";
import Image from "next/image";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600"] });

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddProductImages from "../_components/add-product/Images";
import AddProductDetails from "../_components/add-product/Details";

export default function AddProductPage() {
  return (
    <div className="relative pt-10">
      <div className="absolute left-0 top-0 rounded-ee-md border-b border-r bg-neutral-100 px-5 py-2 dark:border-secondry-dark dark:bg-neutral-900">
        <p
          className={cn(
            "text-gray-700 dark:text-gray-300",
            notoSans.className,
          )}>
          Add Product
        </p>
      </div>

      <div className="flex flex-col gap-8 px-10 pt-10 lg:flex-row xl:gap-x-10">
        <div className="w-full">
          <AddProductImages />
        </div>
        <div className="w-full pt-5 xl:pt-5">
          <AddProductDetails />
        </div>
      </div>
    </div>
  );
}
