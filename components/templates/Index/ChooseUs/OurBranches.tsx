import { cn } from "@/lib/utils";

import { Noto_Sans } from "next/font/google";
import Image from "next/image";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function OurBranches() {
  return (
    <div className="w-full rounded-lg border border-secondry px-5 py-3 dark:border-secondry-dark">
      <h3
        className={cn(
          "mb-5 pl-2 pt-1 text-3xl lg:mb-3 lg:pt-0",
          notoSans.className,
        )}>
        Our Branches
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="px-2 lg:px-0 xl:px-2">
          <div className="h-52 w-full overflow-hidden rounded-lg sm:h-32 xl:h-36">
            <Image
              className={cn("h-full w-full object-cover")}
              src="/images/choose-us/branch-1.jpg"
              alt="branch-1"
              width={300}
              height={300}
            />
          </div>
          <p className="mt-2 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
            New York, USA
          </p>
        </div>
        <div className="px-2 lg:px-0 xl:px-2">
          <div className="h-52 w-full overflow-hidden rounded-lg sm:h-32 xl:h-36">
            <Image
              className={cn("h-full w-full object-cover")}
              src="/images/choose-us/branch-2.webp"
              alt="branch-1"
              width={300}
              height={300}
            />
          </div>
          <p className="mt-2 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
            Los Angles, USA
          </p>
        </div>
        <div className="px-2 lg:px-0 xl:px-2">
          <div className="h-52 w-full overflow-hidden rounded-lg sm:h-32 xl:h-36">
            <Image
              className={cn("h-full w-full object-cover")}
              src="/images/choose-us/branch-3.webp"
              alt="branch-1"
              width={300}
              height={300}
            />
          </div>
          <p className="mt-2 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
            Torento, Canada
          </p>
        </div>
      </div>
    </div>
  );
}
