import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { notoSans } from "@/config/fonts";
import Link from "next/link";

export default function SectionHeader({
  title,
  description,
  className,
  hasButton,
}: {
  title: string;
  description?: string;
  className?: string;
  hasButton: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-secondary py-6 dark:border-secondary-dark",
        className,
      )}>
      <div>
        {description ? (
          <p
            className={cn(
              "text-sm text-gray-700 dark:text-gray-300 sm:text-base",
            )}>
            {description}
          </p>
        ) : null}

        <h2
          className={cn("text-2xl font-bold sm:text-3xl", notoSans.className)}>
          {title}
        </h2>
      </div>
      {hasButton ? (
        <Link href={"/category"}>
          <Button variant="outline"> View all product </Button>
        </Link>
      ) : null}
    </div>
  );
}
