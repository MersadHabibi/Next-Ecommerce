"use client";

import ThemeToggle from "@/components/modules/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminNavbar } from "@/app/admin/_stores/adminNavbar";
import { useAuthStore } from "@/stores/authStore";
import { Menu } from "lucide-react";
import { notoSans } from "@/config/fonts";

export default function TopBar() {
  const openNavBar = useAdminNavbar((state) => state.open);

  const username = useAuthStore((state) => state.user?.username);

  return (
    <div className="flex w-full items-center justify-between border-b border-secondary px-5 py-2 dark:border-secondary-dark dark:bg-neutral-950">
      <p className={cn("text-lg font-bold", notoSans.className)}>{username}</p>
      <div className="flex items-center gap-x-3">
        <ThemeToggle className="shadow-none" />
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={openNavBar}>
          <Menu />
        </Button>
      </div>
    </div>
  );
}
