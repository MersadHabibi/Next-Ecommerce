"use client";

import ThemeToggle from "@/components/modules/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminNavbar } from "../_stores/adminNavbar";
import { useAuthStore } from "@/stores/authStore";
import { Menu } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Topbar() {
  const openNavBar = useAdminNavbar((state) => state.open);

  const username = useAuthStore((state) => state.username);

  return (
    <div className="flex w-full items-center justify-between border-b border-secondry px-5 py-2 dark:border-secondry-dark dark:bg-neutral-950">
      <p className={cn("text-lg ", notoSans.className)}>{username}</p>
      <div className="flex items-center gap-x-3">
        <ThemeToggle classname="shadow-none" />
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
