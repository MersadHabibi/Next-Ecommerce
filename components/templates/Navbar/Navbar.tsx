import Menu from "@/components/templates/Navbar/Menu";
import Link from "next/link";
import Logo from "../../modules/Logo";
import ThemeToggle from "../../modules/ThemeToggle";
import CartBtn from "./CartBtn";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import UserBtn from "./UserBtn";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 w-full border-b border-secondary bg-white dark:border-secondary-dark dark:bg-primary-dark">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-10">
          <Link href={"/"}>
            <Logo className="h-20 w-20" />
          </Link>
          <Menu />
        </div>

        <div className="hidden items-center gap-x-2 sm:flex">
          <ThemeToggle />

          <Search />

          <CartBtn />

          <UserBtn />
        </div>

        {/* Mobile menu toggle */}
        <MobileMenu />
      </div>
    </header>
  );
}
