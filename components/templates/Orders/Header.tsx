import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-secondry pb-3 dark:border-secondry-dark">
      <div className="flex h-6 items-center gap-x-4">
        <h2 className={cn("text-lg", notoSans.className)}>Orders </h2>
      </div>
    </div>
  );
}
