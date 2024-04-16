"use client";

import { getAllProducts } from "@/actions/productActions";
import ProductCard from "@/components/modules/ProductCard";
import ProductCardSkeleton from "@/components/modules/ProductCardSkeleton";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    async function fetchProducts() {
      const allProducts: Product[] = (await getAllProducts()).products;

      setProducts(allProducts);
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {isLoading
        ? new Array(8)
            .fill("")
            .map((value, index) => <ProductCardSkeleton key={index} />)
        : products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
    </div>
  );
}
