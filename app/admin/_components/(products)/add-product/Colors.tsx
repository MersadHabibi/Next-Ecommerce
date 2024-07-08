import { useNewProduct } from "@/app/admin/_stores/newProduct";
import { useToast } from "@/components/ui/use-toast";
import ColorsUi from "../ColorsUi";

export default function Colors() {
  const colors = useNewProduct((state) => state.colors);
  const setColors = useNewProduct((state) => state.setColors);
  const removeColors = useNewProduct((state) => state.removeColor);

  const { toast } = useToast();

  function onAdd(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newColor: string,
  ) {
    setColors(newColor);

    return toast({
      description: `Color ${newColor} added`,
    });
  }

  function onRemove(color: string) {
    removeColors(color);

    return toast({
      description: `Color "${color}" removed`,
    });
  }

  return <ColorsUi colors={colors} onAdd={onAdd} onRemove={onRemove} />;
}
