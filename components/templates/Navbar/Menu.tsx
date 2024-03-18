import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Menu({
  divice = "desktop",
}: {
  divice?: "desktop" | "mobile";
}) {
  if (divice === "desktop") {
    return (
      <ul className="hidden items-center gap-x-2 sm:flex">
        <Button
          className="!bg-transparent hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Home </Link>
        </Button>
        <Button
          className="!bg-transparent hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Women </Link>
        </Button>
        <Button
          className="!bg-transparent hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Men </Link>
        </Button>
        <Button
          className="!bg-transparent hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Best sellers </Link>
        </Button>
      </ul>
    );
  } else {
    return (
      <ul className="space-y-2 border-b border-secondry py-5 mb-5 text-start dark:border-secondry-dark">
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Home </Link>
        </Button>
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Women </Link>
        </Button>
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Men </Link>
        </Button>
        <Button
          className="block w-full !bg-transparent text-left hover:!bg-secondry/70 dark:hover:!bg-secondry-dark"
          variant="ghost">
          <Link href="./"> Best sellers </Link>
        </Button>
      </ul>
    );
  }
}
