import { useEditProductStore } from "@/app/admin/_stores/editProductStore";
import ColorsUi from "../../../ColorsUi";
import { useToast } from "@/components/ui/use-toast";

export default function Colors() {
  const colors = useEditProductStore((state) => state.colors);
  const addColor = useEditProductStore((state) => state.addColor);
  const removeColor = useEditProductStore((state) => state.removeColor);

  const { toast } = useToast();

  function onAdd(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newColor: string,
  ) {
    addColor(newColor);

    return toast({
      description: `Color ${newColor} added`,
    });
  }

  function onRemove(color: string) {
    removeColor(color);

    return toast({
      description: `Color "${color}" removed`,
    });
  }

  return <ColorsUi colors={colors} onAdd={onAdd} onRemove={onRemove} />;
}
