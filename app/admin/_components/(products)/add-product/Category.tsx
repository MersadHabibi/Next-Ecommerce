"use client";

import { useEffect, useState } from "react";

import { getAllCategoriesAction } from "@/actions/categoryActions";
import { useNewProduct } from "@/app/admin/_stores/newProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Category() {
  const [categories, setCategories] = useState<{ id: string; title: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const setCategory = useNewProduct((state) => state.setCategory);

  useEffect(() => {
    async function fetchCategories() {
      const res = await getAllCategoriesAction();

      setIsLoading(false);

      setCategories(res.categories);
    }

    fetchCategories();
  }, []);

  function onChangeCategory(value: string) {
    setCategory(value);
  }

  return (
    <div className="pt-5">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Category:
      </span>
      <div className="pt-2">
        <Select onValueChange={onChangeCategory}>
          <SelectTrigger className="w-[180px]">
            {isLoading ? (
              <SelectValue placeholder="Loading..." />
            ) : (
              <SelectValue placeholder="Select a category" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
