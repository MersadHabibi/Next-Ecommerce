import { getAllProducts } from "@/actions/productActions";
import ProductCard from "./productCard/ProductCard";
import { Product } from "@/types/Product";

export default async function ProductsContainer() {
  const products: Product[] = (await getAllProducts()).products;

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-5 pt-8 sm:grid-cols-2 md:px-5 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
