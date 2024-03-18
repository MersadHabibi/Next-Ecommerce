import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function SectionTitle({
  title,
  description,
  classname,
}: {
  title: string;
  description: string;
  classname?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-secondry py-6 dark:border-secondry-dark",
        classname,
      )}>
      <div>
        <p className={cn("text-gray-700 dark:text-gray-300")}>{description}</p>
        <h2 className={cn("text-3xl font-semibold")}>{title}</h2>
      </div>
      <Button variant="outline"> View all product </Button>
    </div>
  );
}
