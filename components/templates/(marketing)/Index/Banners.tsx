import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Banners() {
  return (
    <section className="grid grid-cols-4 gap-x-5 pt-10">
      <div className="banner-inverted-border relative col-span-4 hidden h-[430px] w-full rounded-lg sm:block lg:col-span-3">
        <Image
          className="relative h-full w-full rounded-lg object-cover"
          src="/images/nike-banner-1.jfif"
          width={900}
          height={500}
          quality={80}
          alt="Banner"
        />
        <div className="absolute bottom-0 right-0 rounded-ss-lg bg-white p-3 outline outline-[3px] -outline-offset-[2px] outline-white dark:bg-black dark:outline-black">
          <Button variant="outline">SHOP NOW</Button>
        </div>
      </div>
      <div className="z-10 col-span-4 h-full w-full sm:hidden lg:col-span-1 lg:block">
        <Image
          className="relative h-full w-full rounded-lg object-cover"
          src="/images/nike-banner-2.jpg"
          width={400}
          height={500}
          quality={80}
          alt="Banner"
        />
      </div>
    </section>
  );
}
