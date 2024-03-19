import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function CategoryItem({
  title,
  imageSrc,
}: {
  title: string;
  imageSrc: string;
}) {
  return (
    <Link href="./">
      <Card
        className={cn(
          "bg-neutral-100 shadow-none transition-colors hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900",
        )}>
        <CardContent className={cn("p-0 pb-6")}>
          <div className={cn("flex-center h-40 w-full")}>
            <Image
              className={cn("h-full w-full object-contain")}
              src={imageSrc}
              alt="running shoes"
              width={300}
              height={300}
            />
          </div>
          <CardTitle className={cn("text-center text-2xl", notoSans.className)}>
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
