import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <div className="border-secondary dark:border-secondary-dark flex items-center justify-between border-b pb-3">
      <div className="flex h-6 items-center gap-x-4">
        <h2 className={cn("text-lg font-bold", notoSans.className)}>Orders </h2>
      </div>
    </div>
  );
}
