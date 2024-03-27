import ProductCard from "@/components/modules/ProductCard";

export default function Products() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
