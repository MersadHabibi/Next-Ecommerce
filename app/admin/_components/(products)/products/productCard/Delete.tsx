import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Info, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function Delete() {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link href={`/product`}>
          <TooltipTrigger className="flex-center size-11 rounded-md bg-red-600 text-white transition hover:opacity-80">
            <Trash />
          </TooltipTrigger>
        </Link>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
