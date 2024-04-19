import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Info, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function View({ id }: { id: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link href={`/product/${id}`}>
          <TooltipTrigger className="flex-center size-11 rounded-md bg-black text-white transition hover:opacity-80 dark:bg-white dark:text-black">
            <Eye />
          </TooltipTrigger>
        </Link>
        <TooltipContent>
          <p>View</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
