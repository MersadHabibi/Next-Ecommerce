import SectionTitle from "@/components/modules/SectionTitle";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Heart, ShoppingBag, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Noto_Sans } from "next/font/google";
import ProductCard from "@/components/modules/ProductCard";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function BestSellers() {
  return (
    <section>
      <SectionTitle
        title="Best Sellers"
        description="Get best product"
        classname="mt-10"
      />

      <div
        className={cn(
          "mt-3 grid grid-cols-1 gap-5 pb-52 md:grid-cols-2 lg:grid-cols-4",
        )}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}
