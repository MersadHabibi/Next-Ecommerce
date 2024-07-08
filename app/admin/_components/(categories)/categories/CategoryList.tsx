"use client";

import { useCategoriesStore } from "@/app/admin/_stores/categoriesStore";
import { useEffect } from "react";
import CategoryItem from "./CategoryItem";

export type CategoryType = {
  id: string;
  title: string;
  image: string;
};

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

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-5 pt-8 sm:grid-cols-2 md:grid-cols-3 md:px-5 xl:grid-cols-4">
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
