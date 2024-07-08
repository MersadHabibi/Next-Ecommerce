import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { notoSans } from "@/config/fonts";

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
        "border-secondary dark:border-secondary-dark flex items-center justify-between border-t py-6",
        className,
      )}>
      <div>
        {description ? (
          <p className={cn("text-gray-700 dark:text-gray-300")}>
            {description}
          </p>
        ) : null}

        <h2 className={cn("text-3xl font-semibold", notoSans.className)}>
          {title}
        </h2>
      </div>
      {hasButton ? <Button variant="outline"> View all product </Button> : null}
    </div>
  );
}
