import { Noto_Sans } from "next/font/google";
import { Plus } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600"] });

type SizesUiProps = {
  sizes: number[];
  onRemove: (size: number) => void;
  onAdd: (size: number) => void;
  label?: string;
};

export default function SizesUi({
  sizes,
  onRemove,
  onAdd,
  label,
}: SizesUiProps) {
  const [newSize, setNewSize] = useState<number>(0);

  const { toast } = useToast();

  return (
    <div className="mt-4">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {label ? label : "Select Sizes:"}
      </span>
      <div className="select-size flex gap-x-2 pt-2">
        {sizes?.map((size) => (
          <AlertDialog key={size}>
            <AlertDialogTrigger className="size-9 rounded-none border border-secondry text-base text-gray-700 dark:border-secondry-dark dark:text-gray-300">
              {size}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want remove this size?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-black dark:bg-white"
                  onClick={() => onRemove(size)}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
        <AlertDialog>
          <AlertDialogTrigger className="flex-center size-9 rounded-md bg-neutral-200/50 transition hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900">
            <Plus />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="border-b border-secondry pb-4 dark:border-secondry-dark">
              <AlertDialogTitle className={cn("text-xl", notoSans.className)}>
                Add new size
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Size
                </Label>
                <Input
                  onChange={(event) => {
                    setNewSize(Number(event.currentTarget.value));
                  }}
                  id="name"
                  type="number"
                  placeholder="size"
                  className="col-span-3"
                />
              </div>
              <AlertDialogFooter className="flex flex-row !items-center justify-end gap-x-2 pt-4">
                <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const isDuplicate = sizes?.some((size) => size === newSize);

                    if (isDuplicate) {
                      return toast({
                        variant: "destructive",
                        title: "This size is added before",
                      });
                    }

                    onAdd(newSize);
                    setNewSize(0);
                  }}
                  type="submit"
                  className="bg-black dark:bg-white">
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
