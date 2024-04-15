import { cn } from "@/lib/utils";

export default function Loader({ classname }: { classname?: string }) {
  return (
    <span
      className={cn(
        "loader size-5 !max-w-full before:border-[3.25px] dark:before:border-gray-600",
        classname,
      )}></span>
  );
}
