import SectionHeader from "@/components/modules/SectionHeader";
import { TProduct } from "@/types";
import BestSellersSwiper from "./BestSellers/BestSellersSwiper";

export default function BestSellers({ products }: { products: TProduct[] }) {
  return (
    <section>
      <SectionHeader
        title="Best Sellers"
        description="Get best product"
        className="mt-10"
        hasButton={true}
      />

      <BestSellersSwiper products={products} />
    </section>
  );
}
