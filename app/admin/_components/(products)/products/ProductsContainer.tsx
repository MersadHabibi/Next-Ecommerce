"use client";

import { getAllProductsAction } from "@/actions/productActions";
import { useProducts } from "@/app/admin/_stores/productsStore";
import { useEffect, useState } from "react";
import ProductCard from "./productCard/ProductCard";
import SkeletonCard from "./productCard/Skeleton";

export default function ProductsContainer() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const products = useProducts((state) => state.products);
  const setProducts = useProducts((state) => state.setProducts);

  useEffect(() => {
    async function fetchProducts() {
      const res = await getAllProductsAction();
      setIsLoading(false);

      if (res.status === 200) {
        return setProducts(res.products);
      }

      setIsError(true);
    }

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-5 pt-8 sm:grid-cols-2 md:px-5 xl:grid-cols-3 2xl:grid-cols-4">
      {isLoading ? (
        new Array(8)
          .fill("")
          .map((value, index) => <SkeletonCard key={index} />)
      ) : isError || products.length === 0 ? (
        <p className="py-2 text-center text-lg dark:text-white sm:col-span-2 xl:col-span-3 2xl:col-span-4">
          There is no product
        </p>
      ) : (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      )}
    </div>
  );
}
