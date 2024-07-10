"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAddQueryString from "@/hooks/useAddQueryString";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useAddQueryString();
  const params = useSearchParams();

  useEffect(() => {
    const search = params.get("search");

    setSearchValue(search || "");
  }, []);

  const onSearch = () => {
    router.push(pathname + "?" + createQueryString("search", searchValue));
  };

  return (
    <div className="relative h-12 rounded-md">
      <Input
        placeholder="Search..."
        type="search"
        className={cn("h-full w-full rounded-md pl-5 pr-12")}
        value={searchValue}
        onInput={(event) => setSearchValue(event.currentTarget.value)}
      />
      <Button
        variant="ghost"
        size="icon"
        className={cn("absolute bottom-0 right-1.5 top-0 m-auto rounded-sm")}
        onClick={onSearch}>
        <SearchIcon
          className={cn(" text-gray-700 dark:text-gray-300")}
          size={23}
        />
      </Button>
    </div>
  );
}
