import { Product } from "@/types/Product";
import Delete from "./Delete";
import Edit from "./Edit";
import Info from "./Info";
import View from "./View";

export default function ProductCardActions(product: Product) {
  return (
    <div className="mt-4 flex w-full flex-wrap items-center justify-end gap-4 border-t border-secondry pt-4 dark:border-secondry-dark">
      <View />
      <Info />
      <Edit product={product} />
      <Delete id={product.id} />
    </div>
  );
}
