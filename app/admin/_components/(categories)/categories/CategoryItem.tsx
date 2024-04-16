"use client";

import Image from "next/image";
import Link from "next/link";
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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { CategoryType } from "./CategoryList";
import { Noto_Sans } from "next/font/google";
import { useState } from "react";
import Loader from "@/components/modules/Loader";
import { deleteCategpryAction } from "@/actions/categoryActions";
import { useToast } from "@/components/ui/use-toast";
import { useCategoriesStore } from "@/app/admin/_stores/categoriesStore";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function CatgeoryItem({ category }: { category: CategoryType }) {
  const [isLoading, setIsLoading] = useState(false);

  const setCategpries = useCategoriesStore((state) => state.setCategories);

  const { toast } = useToast();

  async function onDeleteCategory(categoryId: string) {
    setIsLoading(true);

    const res = await deleteCategpryAction(categoryId);

    setIsLoading(false);

    if (res.status === 202) {
      setCategpries(res.categories);

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
      <Link href="./">
        <Card className="bg-neutral-100 shadow-none transition-colors hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900">
          <CardContent className="p-0 pb-6">
            <div className="flex-center h-36 w-full">
              <Image
                className="h-full w-full object-contain"
                src={`/${category.image}`}
                alt="running shoes"
                width={250}
                height={250}
              />
            </div>
            <CardTitle
              className={cn("text-center text-2xl", notoSans.className)}>
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
