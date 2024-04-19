import SectionHeader from "@/components/modules/SectionHeader";
import NewestProductsSwiper from "./NewestProducts/NewestProductsSwiper";
import { Product } from "@/types/Product";

export function NewestProducts({ products }: { products: Product[] }) {
  return (
    <section>
      <SectionHeader
        title="Newest Products"
        description="View new products"
        hasButton={true}
        classname="mt-32 mb-3"
      />

      <NewestProductsSwiper products={products} />
    </section>
  );
}
