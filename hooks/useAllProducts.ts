import { getAllProductsAction } from "@/actions/productActions";
import { TProduct } from "@/types";
import { cache, useEffect, useState } from "react";

export default function useAllProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<TProduct[]>();

  useEffect(() => {
    async function fetchProducts() {
      const getProductsWithCache = cache(
        async () => await Promise.all([getAllProductsAction()]),
      );

      const allProducts = (await getProductsWithCache())[0].products;

      setAllProducts(allProducts);
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  return { isLoading, allProducts };
}
