"use client";

import Logo from "@/components/modules/Logo";
import NavLink from "@/components/modules/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Boxes, Home, PackagePlus, SquareLibrary, X } from "lucide-react";
import { useAdminNavbar } from "@/app/admin/_stores/adminNavbar";
import { notoSans } from "@/config/fonts";

export default function Sidebar() {
  const isOpenNavBar = useAdminNavbar((state) => state.isOpen);
  const closeNavBar = useAdminNavbar((state) => state.close);

  const NavLinkStyles =
    "flex h-fit justify-start rounded-md text-gray-700 hover:bg-neutral-200 dark:text-gray-300 dark:hover:bg-neutral-900 transition-colors [&.active]:!bg-neutral-200/60 [&.active]:hover:!bg-neutral-200/60 dark:[&.active]:!bg-neutral-900 dark:[&.active]:hover:!bg-neutral-900";

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-10 size-full bg-black/30 backdrop-blur-sm",
          !isOpenNavBar && "invisible opacity-0",
        )}></div>
      <div
        className={cn(
          "absolute top-0 z-20 h-full w-64 border-r border-secondary bg-white px-5 transition-all dark:border-secondary-dark dark:bg-neutral-950 lg:static lg:w-full",
          isOpenNavBar ? "left-0" : "-left-full",
        )}>
        <div className="flex items-center justify-between border-b border-secondary dark:border-secondary-dark">
          <Logo className="size-16" />
          <Button
            onClick={closeNavBar}
            variant="ghost"
            size="icon"
            className="lg:hidden">
            <X />
          </Button>
        </div>
        <div className="py-5">
          <NavLink href="/admin" className={NavLinkStyles}>
            <Button
              variant="outline"
              className="w-full justify-start gap-x-2 hover:!bg-transparent dark:hover:!bg-transparent">
              <Home className="size-5" />
              Home
            </Button>
          </NavLink>
        </div>
        {/* Product Management */}
        <div>
          <p
            className={cn(
              "mb-3 font-bold text-gray-700 dark:text-gray-300",
              notoSans.className,
            )}>
            Product Management
          </p>
          <div className="space-y-2 pl-3">
            <NavLink href="/admin/products" className={NavLinkStyles}>
              <Button
                variant="outline"
                className="w-full justify-start gap-x-2 hover:!bg-transparent dark:hover:!bg-transparent">
                <Boxes className="size-5" />
                Products
              </Button>
            </NavLink>
            <NavLink href="/admin/add-product" className={NavLinkStyles}>
              <Button
                variant="outline"
                className="w-full justify-start gap-x-2 hover:!bg-transparent dark:hover:!bg-transparent">
                <PackagePlus className="size-5" />
                Add Product
              </Button>
            </NavLink>
          </div>
        </div>
        {/* Category Management */}
        <div className="mt-5">
          <p
            className={cn(
              "mb-3 text-gray-700 dark:text-gray-300",
              notoSans.className,
            )}>
            Category Management
          </p>
          <div className="space-y-2 pl-3">
            <NavLink href="/admin/categories" className={NavLinkStyles}>
              <Button
                variant="outline"
                className="w-full justify-start gap-x-2 hover:!bg-transparent dark:hover:!bg-transparent">
                <SquareLibrary className="size-5" />
                Categories
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
