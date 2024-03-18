import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Banners() {
  return (
    <section className={cn("grid grid-cols-4 gap-x-5 pt-10")}>
      <div
        className={cn(
          "banner-inverted-border relative col-span-4 hidden h-[430px] w-full rounded-lg sm:block lg:col-span-3",
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
      <div className="z-10 col-span-4 h-full w-full sm:hidden lg:col-span-1 lg:block">
        <Image
          className={cn("relative h-full w-full rounded-lg object-cover")}
          src="/images/nike-banner-2.jpg"
          width={1100}
          height={1100}
          quality={100}
          alt="Banner"
        />
      </div>
    </section>
  );
}
