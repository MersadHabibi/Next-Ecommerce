"use client";

import { ArrowDownUp } from "lucide-react";
import { sortByOptions } from "./filterOptions";
import { useEffect, useState } from "react";
import { TOption } from "./ComboBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import useAddQueryString from "@/hooks/useAddQueryString";

export default function Sort() {
  const [selectedSortBy, setSelectedSortBy] = useState<TOption | null>(null);

  const params = useSearchParams();
  const router = useRouter();
  const createQueryString = useAddQueryString();
  const pathname = usePathname();

  // Get param and show default value
  useEffect(() => {
    const sortBy = params.get("sortBy");

    if (sortBy) {
      const selectedSortByInURL = sortByOptions.findIndex(
        (option) => option.value == sortBy,
      );

      if (selectedSortByInURL)
        setSelectedSortBy(sortByOptions[selectedSortByInURL]);
    }
  }, []);

  return (
    <div className="hidden h-12 w-full items-center gap-x-10 rounded-md border border-secondary px-4 dark:border-secondary-dark sm:flex">
      <p className="flex items-center gap-x-2 text-gray-800 dark:text-gray-300">
        <ArrowDownUp />
        <span className="font-medium">Sort by:</span>
      </p>
      <div className="category-sort flex h-full items-center gap-x-6 text-gray-700/70 dark:text-gray-300/70">
        {sortByOptions.map((option) => (
          <button
            key={option.value}
            className={cn(
              "h-full px-2 hover:text-gray-700/90 dark:hover:text-gray-300/90",
              selectedSortBy == option && "active",
            )}
            onClick={() => {
              setSelectedSortBy(option);

              return router.push(
                pathname + "?" + createQueryString("sortBy", option.value),
              );
            }}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
