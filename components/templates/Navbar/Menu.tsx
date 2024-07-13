import { Button } from "@/components/ui/button";
import Link from "next/link";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Men",
    href: "/category?gender=men",
  },
  {
    title: "Women",
    href: "/category?gender=women",
  },
  {
    title: "Best sellers",
    href: "/category?sortBy=bestSeller",
  },
];

export default function Menu({
  device = "desktop",
  onOpenChangeModal,
}: {
  device?: "desktop" | "mobile";
  onOpenChangeModal?: (isOpen: boolean) => void;
}) {
  if (device === "desktop") {
    return (
      <ul className="hidden items-center gap-x-2 sm:flex">
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href}>
            <Button
              className="!bg-transparent hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
              variant="ghost">
              {menu.title}
            </Button>
          </Link>
        ))}
      </ul>
    );
  } else {
    return (
      <ul className="mb-5 space-y-2 border-b border-secondary py-5 text-start dark:border-secondary-dark">
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href}>
            <Button
              className="block w-full !bg-transparent text-left hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
              variant="ghost"
              onClick={() => onOpenChangeModal && onOpenChangeModal(false)}>
              {menu.title}
            </Button>
          </Link>
        ))}
      </ul>
    );
  }
}
