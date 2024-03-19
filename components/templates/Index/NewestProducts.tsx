import SectionHeader from "@/components/modules/SectionHeader";
import NewestProductsSwiper from "../NewestProducts/NewestProductsSwiper";

export function NewestProducts() {
  return (
    <section>
      <SectionHeader
        title="Newest Products"
        description="View new products"
        hasButton={true}
        classname="mt-32 mb-3"
      />

      <NewestProductsSwiper />
    </section>
  );
}
