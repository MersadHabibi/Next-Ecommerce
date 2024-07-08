import { TProduct } from "@/types";
import Delete from "./Delete";
import Edit from "./Edit";
import Info from "./Info";
import View from "./View";

export default function ProductCardActions(product: TProduct) {
  return (
    <div className="border-secondary dark:border-secondary-dark mt-4 flex w-full flex-wrap items-center justify-end gap-4 border-t pt-4">
      <View id={product.id} />
      <Info {...product} />
      <Edit product={product} />
      <Delete id={product.id} />
    </div>
  );
}
