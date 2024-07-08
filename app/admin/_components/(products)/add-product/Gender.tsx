"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNewProduct } from "@/app/admin/_stores/newProduct";

export default function Gender() {
  const gender = useNewProduct((state) => state.gender);
  const setGender = useNewProduct((state) => state.setGender);

  return (
    <div className="pt-5">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Gender:
      </span>
      <div className="flex items-center gap-x-2 pt-2">
        <Button
          variant="outline"
          type="button"
          className={cn(
            "hover:!bg-secondary/40 dark:hover:!bg-secondary-dark/40 [&.active]:!bg-secondary dark:[&.active]:!bg-secondary-dark",
            gender === "men" ? "active" : "",
          )}
          onClick={() => setGender("men")}>
          Men
        </Button>
        <Button
          variant="outline"
          type="button"
          className={cn(
            "hover:!bg-secondary/40 dark:hover:!bg-secondary-dark/40 [&.active]:!bg-secondary dark:[&.active]:!bg-secondary-dark",
            gender === "women" ? "active" : "",
          )}
          onClick={() => setGender("women")}>
          women
        </Button>
      </div>
    </div>
  );
}
