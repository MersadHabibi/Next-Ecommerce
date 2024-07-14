"use client";

import { useEffect, useState } from "react";
import ComboBox, { TOption } from "./ComboBox";

import { useMediaQuery } from "usehooks-ts";
import { genderOptions, sizeOptions, sortByOptions } from "./filterOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAddQueryString from "@/hooks/useAddQueryString";
import { getAllCategoriesAction } from "@/actions/categoryActions";
import { TCategory } from "@/types";

export default function Filter() {
  const [categoryOptions, setCategoriesOptions] = useState<TOption[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TOption | null>(
    null,
  );
  const [selectedSortBy, setSelectedSortBy] = useState<TOption | null>(null);
  const [selectedGender, setSelectedGender] = useState<TOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<TOption | null>(null);

  const matches = useMediaQuery("(min-width: 640px)");

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useAddQueryString();
  const params = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategoriesAction();

      setCategoriesOptions(
        categories.categories.map((category: TCategory) => ({
          value: category.title,
          label: category.title,
        })),
      );
    }

    fetchCategories();
  }, []);

  // Get params and show default values
  useEffect(() => {
    const category = params.get("category");
    const sortBy = params.get("sortBy");
    const gender = params.get("gender");
    const size = params.get("size");

    if (category) {
      setSelectedCategory({
        label: category,
        value: category,
      });
    }

    if (sortBy) {
      const selectedSortByInURL = sortByOptions.findIndex(
        (option) => option.value == sortBy,
      );

      if (selectedSortByInURL > -1)
        setSelectedSortBy(sortByOptions[selectedSortByInURL]);
    }

    if (gender) {
      const selectedGenderInURL = genderOptions.findIndex(
        (option) => option.value == gender,
      );

      if (selectedGenderInURL > -1)
        setSelectedGender(genderOptions[selectedGenderInURL]);
    }

    if (size) {
      const selectedSizeInURL = sizeOptions.findIndex(
        (option) => option.value == size,
      );

      if (selectedSizeInURL > -1)
        setSelectedSize(sizeOptions[selectedSizeInURL]);
    }
  }, [params]);

  const onSelectCategory = (category: TOption | null) => {
    if (!category)
      return router.push(pathname + "?" + createQueryString("category", ""));

    router.push(
      pathname + "?" + createQueryString("category", category?.value),
    );
  };

  const onSelectSortBy = (sortBy: TOption | null) => {
    if (!sortBy)
      return router.push(pathname + "?" + createQueryString("sortBy", ""));

    router.push(pathname + "?" + createQueryString("sortBy", sortBy?.value));
  };

  const onSelectGender = (gender: TOption | null) => {
    if (!gender)
      return router.push(pathname + "?" + createQueryString("gender", ""));

    router.push(pathname + "?" + createQueryString("gender", gender?.value));
  };

  const onSelectSize = (size: TOption | null) => {
    if (!size)
      return router.push(pathname + "?" + createQueryString("size", ""));

    router.push(pathname + "?" + createQueryString("size", size?.value));
  };

  return (
    <div className="w-full space-y-4 rounded-lg border border-secondary bg-neutral-100 p-3 dark:border-secondary-dark dark:bg-neutral-950 xl:p-4">
      {!matches && isClient ? (
        <ComboBox
          options={sortByOptions}
          title="Sort by"
          className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black sm:hidden"
          setSelectedOption={onSelectSortBy}
          selectedOption={selectedSortBy}
        />
      ) : null}
      <ComboBox
        options={categoryOptions}
        title="Category"
        className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black"
        setSelectedOption={onSelectCategory}
        selectedOption={selectedCategory}
      />
      <ComboBox
        options={genderOptions}
        title="Gender"
        className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black"
        setSelectedOption={onSelectGender}
        selectedOption={selectedGender}
      />
      <ComboBox
        options={sizeOptions}
        title="Size"
        className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black"
        setSelectedOption={onSelectSize}
        selectedOption={selectedSize}
      />
    </div>
  );
}
