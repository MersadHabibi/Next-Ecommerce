import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TOrderItem } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function OrderItemProduct({
  orderItem,
}: {
  orderItem: TOrderItem;
}) {
  const [isImageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-x-5 p-2">
      <div className="basis-full">
        <AspectRatio ratio={16 / 13}>
          <Image
            className="size-full rounded-md object-cover"
            src={`/${isImageError ? "images/no-image.jpg" : orderItem.Product.mainImage}`}
            alt={orderItem.Product.title}
            width={300}
            height={300}
            onError={(event) => {
              setImageError(true);
            }}
          />
        </AspectRatio>
      </div>
      <div className="basis-full space-y-1 text-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-medium">{orderItem.Product.title}</h2>
        <p className="text-lg font-medium opacity-90">
          ${orderItem.Product.price}
        </p>
        <p className="flex items-center gap-x-2">
          Color :
          <span
            className="block size-5 rounded-full"
            style={{ backgroundColor: orderItem.color }}></span>
        </p>
        <p>
          Size : <span>{orderItem.size}</span>
        </p>
        <p>
          Quantity : <span>{orderItem.quantity}</span>
        </p>
      </div>
    </div>
  );
}
