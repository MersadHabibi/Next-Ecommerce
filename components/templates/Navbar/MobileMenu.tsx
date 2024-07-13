"use client";

import ThemeToggle from "@/components/modules/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import CartBtn from "./CartBtn";
import Menu from "./Menu";
import Search from "./Search";
import UserBtn from "./UserBtn";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="flex-center">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <Menu device="mobile" onOpenChangeModal={setIsOpen} />
          <div className="flex items-center gap-x-2">
            <UserBtn />
            <CartBtn onClick={() => setIsOpen(false)} />
            <Search onClick={() => setIsOpen(false)} />
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
