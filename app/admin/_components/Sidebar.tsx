"use client";

import Logo from "@/components/modules/Logo";
import ThemeToggle from "@/components/modules/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminNavbar } from "@/stores/adminNavbar";
import {
  Boxes,
  Home,
  PackagePlus,
  PackageSearch,
  PlusCircle,
  PlusSquare,
  X,
} from "lucide-react";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Sidebar() {
  const isOpenNavBar = useAdminNavbar((state) => state.isOpen);
  const closeNavBar = useAdminNavbar((state) => state.close);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-10 size-full bg-black/30 backdrop-blur-sm",
          !isOpenNavBar && "invisible opacity-0",
        )}></div>
      <div
        className={cn(
          "absolute top-0 z-20 h-full w-64 border-r border-secondry bg-white px-5 transition-all dark:border-secondry-dark dark:bg-neutral-950 lg:static lg:w-full",
          isOpenNavBar ? "left-0" : "-left-full",
        )}>
        <div className="flex items-center justify-between border-b border-secondry dark:border-secondry-dark">
          <Logo classname="size-16" />
          <Button
            onClick={closeNavBar}
            variant="ghost"
            size="icon"
            className="lg:hidden">
            <X />
          </Button>
        </div>
        <div className="py-5">
          <Button
            variant="outline"
            className="active flex w-full items-center gap-x-2 text-start text-gray-700 dark:text-gray-300 [&.active]:!bg-neutral-200/60 dark:[&.active]:!bg-neutral-900">
            <Home className="size-5" />
            <Link href="/admin" className="b w-full py-2">
              Home
            </Link>
          </Button>
        </div>
        <div>
          <p
            className={cn(
              "mb-3 text-gray-700 dark:text-gray-300",
              notoSans.className,
            )}>
            Products Management
          </p>
          <div className="space-y-2 pl-3">
            <Button
              variant="outline"
              className="flex w-full items-center gap-x-2 text-start text-gray-700 dark:text-gray-300">
              <Boxes className="size-5" />
              <Link href="/" className=" w-full py-2">
                Products
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex w-full items-center gap-x-2 text-start text-gray-700 dark:text-gray-300">
              <PackagePlus className="size-5" />
              <Link href="/" className=" w-full py-2">
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
