import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";

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
        "border-secondary dark:border-secondary-dark rounded-md border bg-white px-5 dark:bg-black",
      )}>
      <AccordionTrigger
        className={cn("text-base font-bold", notoSans.className)}>
        {trigger}
      </AccordionTrigger>
      <AccordionContent className={cn("text-gray-700 dark:text-gray-300")}>
        {content}
      </AccordionContent>
    </AccordionItem>
  );
}
