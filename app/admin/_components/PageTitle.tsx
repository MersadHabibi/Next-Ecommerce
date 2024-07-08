import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";

export default function PageTitle({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-secondary dark:border-secondary-dark flex h-14 w-full items-center justify-between rounded-md border pl-5",
        className,
      )}>
      <div
        className={cn(
          "text-lg/4 font-bold dark:font-semibold",
          notoSans.className,
        )}>
        {title}
      </div>
      <div className="flex-center h-full p-2">{children}</div>
    </div>
  );
}
