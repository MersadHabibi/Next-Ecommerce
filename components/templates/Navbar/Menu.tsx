import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Menu() {
  return (
    <ul className="hidden items-center gap-x-2 sm:flex">
      <Button
        className="hover:!bg-secondry/70 dark:hover:!bg-secondry-dark !bg-transparent"
        variant="ghost">
        <Link href="./"> Home </Link>
      </Button>
      <Button
        className="hover:!bg-secondry/70 dark:hover:!bg-secondry-dark !bg-transparent"
        variant="ghost">
        <Link href="./"> Women </Link>
      </Button>
      <Button
        className="hover:!bg-secondry/70 dark:hover:!bg-secondry-dark !bg-transparent"
        variant="ghost">
        <Link href="./"> Men </Link>
      </Button>
      <Button
        className="hover:!bg-secondry/70 dark:hover:!bg-secondry-dark !bg-transparent"
        variant="ghost">
        <Link href="./"> Best sellers </Link>
      </Button>
    </ul>
  );
}
