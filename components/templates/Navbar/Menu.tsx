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
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark !bg-transparent"
          variant="ghost">
          <Link href="./"> Home </Link>
        </Button>
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark !bg-transparent"
          variant="ghost">
          <Link href="./"> Women </Link>
        </Button>
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark !bg-transparent"
          variant="ghost">
          <Link href="./"> Men </Link>
        </Button>
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark !bg-transparent"
          variant="ghost">
          <Link href="./"> Best sellers </Link>
        </Button>
      </ul>
    );
  } else {
    return (
      <ul className="border-secondary dark:border-secondary-dark mb-5 space-y-2 border-b py-5 text-start">
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark block w-full !bg-transparent text-left"
          variant="ghost">
          <Link href="./"> Home </Link>
        </Button>
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark block w-full !bg-transparent text-left"
          variant="ghost">
          <Link href="./"> Women </Link>
        </Button>
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark block w-full !bg-transparent text-left"
          variant="ghost">
          <Link href="./"> Men </Link>
        </Button>
        <Button
          className="hover:!bg-secondary/70 dark:hover:!bg-secondary-dark block w-full !bg-transparent text-left"
          variant="ghost">
          <Link href="./"> Best sellers </Link>
        </Button>
      </ul>
    );
  }
}
