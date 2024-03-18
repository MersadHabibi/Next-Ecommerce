import Logo from "@/components/modules/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, ShoppingBasket } from "lucide-react";
import Menu from "./Menu";
import Search from "./Search";
import UserBtn from "./UserBtn";
import ThemeToggle from "@/components/modules/ThemeToggle";

export default function MobileMenu() {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger className="flex-center">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <Menu divice="mobile" />
          <div className="flex items-center gap-x-2">
            <UserBtn />
            <Button
              className=" !bg-transparent hover:!bg-secondry dark:hover:!bg-secondry-dark"
              variant="outline"
              size="icon">
              <ShoppingBasket size="20" />
            </Button>
            <Search />
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
