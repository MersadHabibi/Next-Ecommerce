import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Pay() {
  return (
    <div className="sticky top-20 col-span-4  h-fit w-full rounded-lg border border-secondry bg-neutral-100 p-3 dark:border-secondry-dark dark:bg-neutral-950 lg:col-span-1">
      <div className="mt-1 grid w-full items-center gap-1.5">
        <Label htmlFor="Address">Address</Label>
        {/* TODO: use GPS for get Address */}
        <Input
          type="text"
          id="Address"
          placeholder="Address"
          className={"w-full bg-white shadow-none dark:bg-black"}
        />
      </div>
      <div className="space-y-3 border-b border-secondry py-4 dark:border-secondry-dark">
        <div className=" flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Shipping cost
          </span>
          <span
            className={cn(
              "text-gray-700 opacity-70 dark:text-gray-300",
              notoSans.className,
            )}>
            $128.2
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1 text-gray-700 dark:text-gray-300">
            Tax
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="flex-center size-4">
                    <CircleHelp />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>9%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span
            className={cn(
              "text-gray-700 opacity-70 dark:text-gray-300",
              notoSans.className,
            )}>
            $23
          </span>
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <span className="gap-x-1 font-medium text-gray-700 dark:text-gray-300">
            Total
          </span>
          <span
            className={cn(
              "text-gray-700 opacity-70 dark:text-gray-300",
              notoSans.className,
            )}>
            $504
          </span>
        </div>
        <Button className={cn("w-full bg-black shadow-none dark:bg-white")}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
