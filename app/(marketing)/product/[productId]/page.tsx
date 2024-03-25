import ProductDetails from "@/components/templates/Product/ProductDetails";
import ProductGallery from "@/components/templates/Product/ProductGallery";

export default function productId() {
  return (
    <div className="flex flex-col gap-8 pt-10 lg:flex-row xl:gap-x-10">
      <div className="w-full">
        <ProductGallery />
      </div>
      <div className="w-full pt-5 xl:pt-8">
        <ProductDetails />
      </div>
    </div>
  );
}
