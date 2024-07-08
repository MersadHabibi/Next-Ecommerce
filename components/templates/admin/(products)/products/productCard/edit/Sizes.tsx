import { useEditProductStore } from "@/app/admin/_stores/editProductStore";
import { useToast } from "@/components/ui/use-toast";
import SizesUi from "../../../SizesUi";

export default function Sizes() {
  const sizes = useEditProductStore((state) => state.sizes);
  const addSize = useEditProductStore((state) => state.addSize);
  const removeSize = useEditProductStore((state) => state.removeSize);

  const { toast } = useToast();

  function onAdd(newSize: number) {
    addSize(newSize);
    toast({
      description: `Size ${newSize} added`,
    });
  }

  function onRemove(size: number) {
    removeSize(size);
    toast({
      description: `Size ${size} deleted`,
    });
  }

  return <SizesUi sizes={sizes} onAdd={onAdd} onRemove={onRemove} />;
}
