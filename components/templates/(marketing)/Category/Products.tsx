"use client";

import { getAllProductsAction } from "@/actions/productActions";
import ProductCard from "@/components/modules/ProductCard";
import ProductCardSkeleton from "@/components/modules/ProductCardSkeleton";
import { TProduct } from "@/types";
import { useSearchParams } from "next/navigation";
import { cache, useEffect, useState } from "react";
import { sortByEnum } from "./sortByEnums";
import { cn } from "@/lib/utils";
import { notoSans } from "@/config/fonts";
import useAllProducts from "@/hooks/useAllProducts";

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>();

  const { allProducts, isLoading } = useAllProducts();

  const params = useSearchParams();

  // Apply filters
  useEffect(() => {
    let newFilteredProducts = allProducts;

    const search = params.get("search");
    const sortBy = params.get("sortBy");
    const category = params.get("category");
    const gender = params.get("gender");
    const size = params.get("size");

    newFilteredProducts = newFilteredProducts?.filter((product) =>
      product.title.toLowerCase().includes(search?.toLowerCase() || ""),
    );

    newFilteredProducts = newFilteredProducts?.filter(
      (product) =>
        (!category || product.Category.title == category) &&
        (!gender || product.gender == gender) &&
        (!size || product.sizes.includes(Number(size))),
    );

    if (newFilteredProducts) {
      newFilteredProducts =
        sortBy == sortByEnum.BEST_SELLER
          ? [...(newFilteredProducts as TProduct[])].sort(
              (a, b) => (b.sales || 0) - (a.sales || 0),
            )
          : sortBy == sortByEnum.CHEAPEST
            ? [...(newFilteredProducts as TProduct[])].sort(
                (a, b) => Number(a.price) - Number(b.price),
              )
            : sortBy == sortByEnum.EXPENSIVE
              ? [...(newFilteredProducts as TProduct[])].sort(
                  (a, b) => Number(b.price) - Number(a.price),
                )
              : [...(newFilteredProducts as TProduct[])].sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
                );
    }

    setFilteredProducts(newFilteredProducts);
  }, [params, allProducts]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {isLoading ? (
        new Array(8)
          .fill("")
          .map((value, index) => <ProductCardSkeleton key={index} />)
      ) : filteredProducts?.length! > 0 ? (
        filteredProducts?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      ) : (
        <p
          className={cn(
            "my-auto mt-10 w-full text-center text-lg font-semibold md:col-span-2 lg:col-span-3",
            notoSans.className,
          )}>
          {" "}
          There is no product{" "}
        </p>
      )}
    </div>
  );
}
