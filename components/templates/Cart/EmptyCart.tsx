import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function EmptyCart() {
  return (
    <div className="flex-center py-16 w-full rounded-md border border-secondry dark:border-secondry-dark">
      <p className={cn("text-2xl", notoSans.className)}>Your cart is empty</p>
    </div>
  );
}
