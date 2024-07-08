import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";

export default function EmptyCart() {
  return (
    <div className="flex-center border-secondary dark:border-secondary-dark w-full rounded-md border py-16">
      <p className={cn("text-2xl font-bold", notoSans.className)}>
        Your cart is empty
      </p>
    </div>
  );
}
