import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Subscribe() {
  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between rounded-lg border border-secondry px-5 py-3 dark:border-secondry-dark sm:flex-row sm:items-start",
      )}>
      <div className={cn("w-full space-y-5 px-2 py-5 sm:w-auto sm:space-y-10")}>
        <h3
          className={cn(
            "text-[25px] font-medium sm:text-4xl",
            notoSans.className,
          )}>
          Subscribe To Newsletter
        </h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Enter your email" />
          <Button type="submit" className={cn("bg-black dark:bg-white")}>
            Subscribe
          </Button>
        </div>
      </div>
      <div className={cn("w-52 p-3")}>
        <Image
          className={cn("h-full w-full object-contain")}
          src="/images/choose-us/subscribe.png"
          alt="Subscribe"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
