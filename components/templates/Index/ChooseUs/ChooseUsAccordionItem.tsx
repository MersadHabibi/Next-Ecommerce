import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export type ChooseUsAccordionItemProps = {
  id: string;
  trigger: string;
  content: string;
};

export default function ChooseUsAccordionItem({
  id,
  trigger,
  content,
}: ChooseUsAccordionItemProps) {
  return (
    <AccordionItem
      value={id}
      className={cn(
        "rounded-md border border-secondry bg-white px-5 dark:border-secondry-dark dark:bg-black",
      )}>
      <AccordionTrigger className={cn("text-base ", notoSans.className)}>
        {trigger}
      </AccordionTrigger>
      <AccordionContent className={cn("text-gray-700 dark:text-gray-300")}>
        {content}
      </AccordionContent>
    </AccordionItem>
  );
}
