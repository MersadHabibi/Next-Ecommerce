import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export default function Info() {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link href={`/product`}>
          <TooltipTrigger className="flex-center size-11 rounded-md bg-black text-white transition hover:opacity-80 dark:bg-white dark:text-black">
            <InfoIcon />
          </TooltipTrigger>
        </Link>
        <TooltipContent>
          <p>Info</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
