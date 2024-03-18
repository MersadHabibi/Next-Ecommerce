import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <div className={cn("grid grid-cols-4 gap-x-2 pt-5")}>
        <div
          className={cn(
            "banner-inverted-border relative col-span-3 h-[430px] w-full rounded-lg",
          )}>
          <Image
            className={cn("relative h-full w-full rounded-lg object-cover")}
            src="/images/nike-banner-1.jfif"
            width={1100}
            height={1100}
            quality={100}
            alt="Banner"
          />
          <div
            className={cn(
              "absolute bottom-0 right-0 rounded-ss-lg bg-white p-3 dark:bg-black",
            )}>
            <Button variant="outline">SHOP NOW</Button>
          </div>
        </div>
        <div className="z-10 h-full w-full">
          <Image
            className={cn("relative h-full w-full rounded-lg object-cover")}
            src="/images/nike-banner-2.jpg"
            width={1100}
            height={1100}
            quality={100}
            alt="Banner"
          />
        </div>
      </div>
    </div>
  );
}
