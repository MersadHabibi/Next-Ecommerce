import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function SectionHeader({
  title,
  description,
  classname,
  hasButton,
}: {
  title: string;
  description?: string;
  classname?: string;
  hasButton: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-secondry py-6 dark:border-secondry-dark",
        classname,
      )}>
      <div>
        {description ? (
          <p className={cn("text-gray-700 dark:text-gray-300")}>
            {description}
          </p>
        ) : null}

        <h2 className={cn("text-3xl font-semibold")}>{title}</h2>
      </div>
      {hasButton ? <Button variant="outline"> View all product </Button> : null}
    </div>
  );
}
