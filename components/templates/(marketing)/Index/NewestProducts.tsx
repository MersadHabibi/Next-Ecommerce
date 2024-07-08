import SectionHeader from "@/components/modules/SectionHeader";
import NewestProductsSwiper from "./NewestProducts/NewestProductsSwiper";
import { TProduct } from "@/types";

export function NewestProducts({ products }: { products: TProduct[] }) {
  return (
    <section>
      <SectionHeader
        title="Newest Products"
        description="View new products"
        hasButton={true}
        className="mb-3 mt-32"
      />

      <NewestProductsSwiper products={products} />
    </section>
  );
}
