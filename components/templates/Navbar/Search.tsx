"use client";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAllProducts from "@/hooks/useAllProducts";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ onClick }: { onClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { allProducts } = useAllProducts();

  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex-center h-9 w-9 rounded-md border border-secondary hover:bg-secondary dark:border-secondary-dark dark:hover:bg-secondary-dark">
        <SearchIcon size="20" />
      </DialogTrigger>
      <DialogContent>
        <div>
          <Command>
            <CommandInput
              placeholder="Type product name..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  router.push(`/category?search=${event.currentTarget.value}`);
                  setIsOpen(false);
                }
              }}
            />
            <CommandList>
              {allProducts?.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => {
                    router.push(`/product/${product.id}`);
                    setIsOpen(false);
                    onClick && onClick();
                  }}>
                  {product.title}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
}
