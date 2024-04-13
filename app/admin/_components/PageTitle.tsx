import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600", "700"] });

export default function PageTitle({
  title,
  classname,
  children,
}: {
  title: string;
  classname?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-14 w-full items-center justify-between rounded-md border border-secondry pl-5 dark:border-secondry-dark",
        classname,
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
