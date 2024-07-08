import { cn } from "@/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "loader size-5 !max-w-full before:border-[3.25px] before:border-gray-800 dark:before:border-gray-600",
        className,
      )}></span>
  );
}
