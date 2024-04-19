import { Noto_Sans } from "next/font/google";
import ProductCard from "@/components/modules/ProductCard";
import SectionHeader from "@/components/modules/SectionHeader";
import BestSellersSwiper from "./BestSellers/BestSellersSwiper";
import { Product } from "@/types/Product";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function BestSellers({ products }: { products: Product[] }) {
  console.log(products);

  return (
    <section>
      <SectionHeader
        title="Best Sellers"
        description="Get best product"
        classname="mt-10"
        hasButton={true}
      />

      <BestSellersSwiper products={products} />
    </section>
  );
}
