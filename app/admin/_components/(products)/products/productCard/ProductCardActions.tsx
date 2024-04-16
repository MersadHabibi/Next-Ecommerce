import Delete from "./Delete";
import Edit from "./Edit";
import Info from "./Info";
import View from "./View";

export default function ProductCardActions() {
  return (
    <div className="mt-4 flex w-full items-center justify-end gap-4 flex-wrap border-t border-secondry pt-4 dark:border-secondry-dark">
      <View />
      <Info />
      <Edit />
      <Delete />
    </div>
  );
}
