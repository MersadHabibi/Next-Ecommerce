"use client";

import { deleteCategoryAction } from "@/actions/categoryActions";
import { useCategoriesStore } from "@/app/admin/_stores/categoriesStore";
import Loader from "@/components/modules/Loader";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { TCategory } from "@/types";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CategoryItem({ category }: { category: TCategory }) {
  const [isImageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setCategories = useCategoriesStore((state) => state.setCategories);

  const { toast } = useToast();

  async function onDeleteCategory(categoryId: string) {
    setIsLoading(true);

    const res = await deleteCategoryAction(categoryId);

    setIsLoading(false);

    if (res.status === 202) {
      setCategories(res.categories);

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
    <div className="relative" key={category.id}>
      <Link href={`/category?category=${category.title}`}>
        <Card className="bg-neutral-100 shadow-none transition-colors hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900">
          <CardContent className="p-0 pb-6">
            <div className="flex-center w-full px-4 py-6">
              <AspectRatio ratio={16 / 9} className="">
                <Image
                  className="h-full w-full overflow-visible rounded-md object-cover"
                  src={`/${isImageError ? "images/no-image.jpg" : category.image}`}
                  alt="running shoes"
                  width={250}
                  height={250}
                  onError={(event) => {
                    setImageError(true);
                  }}
                />
              </AspectRatio>
            </div>
            <CardTitle
              className={cn(
                "text-center text-2xl font-bold",
                notoSans.className,
              )}>
              {category.title}
            </CardTitle>
          </CardContent>
        </Card>
      </Link>
      {/* Delete Category */}
      <AlertDialog>
        <AlertDialogTrigger
          className="flex-center absolute right-2 top-2 size-9 rounded-lg bg-red-500 text-white transition-colors hover:bg-red-500/80 disabled:opacity-70"
          disabled={isLoading}>
          {isLoading ? <Loader /> : <Trash className="size-5" />}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this category?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-black  dark:bg-white"
              onClick={() => onDeleteCategory(category.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
