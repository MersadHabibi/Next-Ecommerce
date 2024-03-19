import { cn } from "@/lib/utils";

import { Noto_Sans } from "next/font/google";
import ProductCard from "@/components/modules/ProductCard";
import SectionHeader from "@/components/modules/SectionHeader";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function BestSellers() {
  return (
    <section>
      <SectionHeader
        title="Best Sellers"
        description="Get best product"
        classname="mt-10"
        hasButton={true}
      />

      <div
        className={cn(
          "mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4",
        )}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}
