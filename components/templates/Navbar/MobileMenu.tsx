import ThemeToggle from "@/components/modules/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import CartBtn from "./CartBtn";
import Menu from "./Menu";
import Search from "./Search";
import UserBtn from "./UserBtn";

export default function MobileMenu() {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger className="flex-center">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <Menu device="mobile" />
          <div className="flex items-center gap-x-2">
            <UserBtn />
            <CartBtn />
            <Search />
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
