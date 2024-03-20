import ProductGallery from "@/components/templates/Product/ProductGallery";

export default function productId() {
  return (
    <div className="flex gap-x-5 pt-10">
      <div className="w-full">
        <ProductGallery />
      </div>
      <div className="w-full"></div>
    </div>
  );
}
