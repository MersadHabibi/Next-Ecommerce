import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Info, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function Edit() {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link href={`/product`}>
          <TooltipTrigger className="flex-center size-11 rounded-md bg-black text-white transition hover:opacity-80 dark:bg-white dark:text-black">
            <Pencil />
          </TooltipTrigger>
        </Link>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
