"use client";

import { Noto_Sans } from "next/font/google";

import { useEffect } from "react";
import { useCategoriesStore } from "@/stores/categoriesStore";
import CategoryItem from "./CategoryItem";

export type CategoryType = {
  id: string;
  title: string;
  image: string;
};

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function CategoryList({
  categoriesEntry,
}: {
  categoriesEntry: CategoryType[];
}) {
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const categories = useCategoriesStore((state) => state.categories);

  useEffect(() => {
    setCategories(categoriesEntry);
  }, [categoriesEntry, setCategories]);

  function onDeleteCategory(catgeoryId: string) {}

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-5 pt-8 sm:grid-cols-2 md:grid-cols-3 md:px-5 xl:grid-cols-4">
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
