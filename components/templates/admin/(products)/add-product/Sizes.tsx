"use client";

import { useToast } from "@/components/ui/use-toast";
import { useNewProduct } from "@/app/admin/_stores/newProduct";
import SizesUi from "../SizesUi";

export default function Sizes() {
  const sizes = useNewProduct((state) => state.sizes);
  const setSizes = useNewProduct((state) => state.setSizes);
  const removeSizes = useNewProduct((state) => state.removeSize);

  const { toast } = useToast();

  function onAdd(newSize: number) {
    setSizes(newSize);
    toast({
      description: `Size ${newSize} added`,
    });
  }

  function onRemove(size: number) {
    removeSizes(size);
    toast({
      description: `Size ${size} deleted`,
    });
  }

  return <SizesUi sizes={sizes} onRemove={onRemove} onAdd={onAdd} />;
}
