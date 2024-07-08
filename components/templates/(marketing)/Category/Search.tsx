import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="relative h-12 rounded-md">
      <Input
        placeholder="Search..."
        type="search"
        className={cn("h-full w-full rounded-md pl-5 pr-12")}
      />
      <Button
        variant="ghost"
        size="icon"
        className={cn("absolute bottom-0 right-1 top-0 m-auto rounded-none")}>
        <SearchIcon
          className={cn(" text-gray-700 dark:text-gray-300")}
          size={23}
        />
      </Button>
    </div>
  );
}
