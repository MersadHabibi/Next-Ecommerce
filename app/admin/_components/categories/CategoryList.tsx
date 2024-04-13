import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Noto_Sans } from "next/font/google";
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

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function CategoryList() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-5 pt-8 sm:grid-cols-2 md:grid-cols-3 md:px-5 xl:grid-cols-4">
      <div className="relative">
        <Link href="./">
          <Card className="bg-neutral-100 shadow-none transition-colors hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900">
            <CardContent className="p-0 pb-6">
              <div className="flex-center h-36 w-full">
                <Image
                  className="h-full w-full object-contain"
                  src={"/images/categories/sandals.webp"}
                  alt="running shoes"
                  width={300}
                  height={300}
                />
              </div>
              <CardTitle
                className={cn("text-center text-2xl", notoSans.className)}>
                Sandals
              </CardTitle>
            </CardContent>
          </Card>
        </Link>
        {/* Delete Category */}
        <AlertDialog>
          <AlertDialogTrigger className="flex-center absolute right-2 top-2 size-9 rounded-lg bg-red-500 text-white transition-colors hover:bg-red-500/80">
            <Trash className="size-5" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this category?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-black dark:bg-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
