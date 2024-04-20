import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SizesProps = {
  sizes: number[];
  onChangeSize: (size: number) => void;
};

export default function Sizes({ sizes, onChangeSize }: SizesProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  function onSelectSize(size: number) {
    setSelectedSize(size);
    onChangeSize(size);
  }

  return (
    <div className="mt-5 xl:mt-7">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Select Size:
      </span>
      <div className="select-size flex gap-x-2 pt-3">
        {sizes.map((size) => (
          <Button
            key={size}
            variant="outline"
            className={cn(
              "size-11 rounded-none text-base text-gray-700 hover:!bg-transparent dark:text-gray-300 dark:hover:!bg-transparent [&.active]:!bg-neutral-300 [&.active]:!text-black [&.active]:dark:!bg-neutral-800 [&.active]:dark:!text-white",
              size === selectedSize && "active",
            )}
            onClick={() => onSelectSize(size)}>
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}
