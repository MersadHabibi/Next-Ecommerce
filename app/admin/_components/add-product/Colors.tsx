import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { cn, isValidColor } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { useNewProduct } from "@/stores/newProductImages";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600"] });

export default function Colors() {
  const [newColor, setNewColor] = useState<string>("");
  const colors = useNewProduct((state) => state.colors);
  const setColors = useNewProduct((state) => state.setColors);
  const removeColors = useNewProduct((state) => state.removeColor);

  const { toast } = useToast();

  const addColor = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!newColor || newColor === "transparent") return;

    const isDuplicate = colors.some((color) => color === newColor);

    if (isDuplicate) {
      return toast({
        variant: "destructive",
        title: "This color is added before",
      });
    }

    setColors(newColor);
    event.currentTarget.value = "";
    setNewColor("transparent");

    return toast({
      description: "New color add",
    });
  };

  const removeColor = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: string,
  ) => {
    removeColors(color);

    return toast({
      description: `Color "${color}" removed`,
    });
  };

  return (
    <div className="mt-5">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Colors:
      </span>
      <div className="select-color flex items-center gap-x-3 pt-2">
        {colors.map((color) => (
          <AlertDialog key={color}>
            <AlertDialogTrigger
              className="size-7 rounded-full border"
              style={{ backgroundColor: color }}></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want remove this color?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-black dark:bg-white"
                  onClick={(event) => removeColor(event, color)}>
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
                Add new color
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Color
                </Label>
                <Input
                  onChange={(event) => {
                    isValidColor(event.currentTarget.value)
                      ? setNewColor(event.currentTarget.value)
                      : setNewColor("transparent");
                  }}
                  id="name"
                  placeholder="name , #hex "
                  className="col-span-3"
                />
              </div>
              <AlertDialogFooter className="flex !flex-row items-center justify-end gap-x-2 pt-4">
                <button
                  className="size-7 rounded-full"
                  style={{ backgroundColor: newColor! }}></button>

                <AlertDialogCancel
                  className="mt-0"
                  onClick={(event) => setNewColor("transparent")}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  onClick={addColor}
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
