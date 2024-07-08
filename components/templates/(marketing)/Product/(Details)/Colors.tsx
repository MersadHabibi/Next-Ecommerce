"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type ColorsProps = {
  colors: string[];
  onChangeColor: (color: string) => void;
};

export default function Colors({ colors, onChangeColor }: ColorsProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  function onSelectColor(color: string) {
    setSelectedColor(color);
    onChangeColor(color);
  }

  return (
    <div className="mt-6 xl:mt-10">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Select Color:
      </span>
      <div className="select-color flex gap-x-3 pt-3">
        {colors.map((color) => (
          <button
            key={color}
            className={cn(
              "size-9 rounded-full border [&.active]:outline [&.active]:outline-offset-2 [&.active]:outline-green-500",
              color === selectedColor && "active",
            )}
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}></button>
        ))}
      </div>
    </div>
  );
}
