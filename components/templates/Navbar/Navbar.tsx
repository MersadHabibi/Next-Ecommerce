import Logo from "../../modules/Logo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../../modules/ThemeToggle";
import { Menu as MenuIcon, ShoppingBasket } from "lucide-react";
import Menu from "@/components/templates/Navbar/Menu";
import UserBtn from "./UserBtn";
import Search from "./Search";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 w-full border-b border-secondry bg-white dark:border-secondry-dark dark:bg-primary-dark">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-10">
          <Logo classname="w-20 h-20" />
          <Menu />
        </div>

        <div className="hidden items-center gap-x-2 sm:flex">
          <ThemeToggle />

          <Search />

          <Button
            className=" !bg-transparent hover:!bg-secondry dark:hover:!bg-secondry-dark"
            variant="outline"
            size="icon">
            <ShoppingBasket size="20" />
          </Button>
          <UserBtn />
        </div>

        {/* Mobile menu toggle */}
        <MobileMenu />
      </div>
    </header>
  );
}
