import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Menu({
  device = "desktop",
}: {
  device?: "desktop" | "mobile";
}) {
  if (device === "desktop") {
    return (
      <ul className="hidden items-center gap-x-2 sm:flex">
        <Link href="/">
          <Button
            className="!bg-transparent hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
            variant="ghost">
            Home
          </Button>
        </Link>
        <Link href="/category?gender=women">
          <Button
            className="!bg-transparent hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
            variant="ghost">
            Women
          </Button>
        </Link>
        <Link href="./category?gender=men">
          <Button
            className="!bg-transparent hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
            variant="ghost">
            Men
          </Button>
        </Link>
        <Link href="./category?sortBy=bestSeller">
          <Button
            className="!bg-transparent hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
            variant="ghost">
            Best sellers
          </Button>
        </Link>
      </ul>
    );
  } else {
    return (
      <ul className="mb-5 space-y-2 border-b border-secondary py-5 text-start dark:border-secondary-dark">
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
          variant="ghost">
          <Link href="./"> Home </Link>
        </Button>
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
          variant="ghost">
          <Link href="./"> Women </Link>
        </Button>
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
          variant="ghost">
          <Link href="./"> Men </Link>
        </Button>
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondary/70 dark:hover:!bg-secondary-dark"
          variant="ghost">
          <Link href="./"> Best sellers </Link>
        </Button>
      </ul>
    );
  }
}
