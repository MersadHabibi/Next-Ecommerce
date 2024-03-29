import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Delete, EllipsisVertical, Trash } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-secondry pb-3 dark:border-secondry-dark">
      <div className="flex h-6 items-center gap-x-4">
        <h2 className={cn("text-lg", notoSans.className)}>Cart </h2>
        <span className="h-full w-1 border-l border-secondry dark:border-secondry-dark"></span>
        <p className="text-sm text-gray-700/70 dark:text-gray-300/70">
          1 Product
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center gap-x-2">
            <Trash className="size-5" />
            Delete all
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
