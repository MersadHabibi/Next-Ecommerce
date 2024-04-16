"use client";

import { Button } from "@/components/ui/button";
import { FolderSync, ImagePlus, Plus, PlusCircle } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import FileInput from "../../FileInput";
import { useRef, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { addCategoryAction } from "@/actions/categoryActions";
import Loader from "@/components/modules/Loader";
import { useCategoriesStore } from "@/app/admin/_stores/categoriesStore";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600"] });

export default function AddCategpry() {
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef("");
  const [image, setImage] = useState<File | null>(null);

  const setCategories = useCategoriesStore((state) => state.setCategories);

  const { toast } = useToast();

  function onSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setImage(event.target.files[0]);
  }

  async function onAddCategory() {
    const title = titleRef.current;

    // Validation
    if (!image)
      return toast({
        variant: "destructive",
        description: "you must choose image",
      });

    if (!title)
      return toast({
        variant: "destructive",
        description: "you must write title",
      });

    //

    setIsLoading(true);

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);

    const res = await addCategoryAction(formData);

    setIsLoading(false);

    if (res.status === 201) {
      setCategories(res.categories);
      setImage(null);

      return toast({
        description: res.message,
      });
    }

    toast({
      variant: "destructive",
      description: res.message,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className="flex-center size-9 rounded-md bg-black text-white transition hover:bg-black/80 disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-white/80">
        {isLoading ? <Loader /> : <Plus />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="border-b border-secondry pb-4 dark:border-secondry-dark">
          <AlertDialogTitle className={cn("text-xl", notoSans.className)}>
            Add new category
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Title
            </Label>
            <Input
              placeholder="title"
              className="col-span-3"
              onChange={(event) => {
                titleRef.current = event.target.value;
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <AspectRatio ratio={16 / 16} className="w-full">
                {image ? (
                  <Image
                    className="h-full w-full rounded-md object-cover"
                    src={URL.createObjectURL(image)}
                    alt="image"
                    width={200}
                    height={200}
                  />
                ) : (
                  <FileInput
                    id="image"
                    onchange={onSelectImage}
                    classname="dark:bg-neutral-900 dark:hover:bg-neutral-800 bg-neutral-200/60">
                    <ImagePlus className="size-12" />
                  </FileInput>
                )}
              </AspectRatio>
            </div>
          </div>
          <AlertDialogFooter className="flex !flex-row items-center justify-end gap-x-2 pt-4">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-black dark:bg-white"
              onClick={onAddCategory}>
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
