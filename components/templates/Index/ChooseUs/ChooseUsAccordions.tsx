import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChooseUsAccordionItem from "./ChooseUsAccordionItem";
import { cn } from "@/lib/utils";
import { ChooseUsAccordionItemProps } from "./ChooseUsAccordionItem";

const contents: ChooseUsAccordionItemProps[] = [
  {
    id: "1",
    trigger: "Free In-store Pick Up",
    content:
      "Choose the pick up option and get eligible orders ready in under 6 hours",
  },
  {
    id: "2",
    trigger: "Expert Craftsmanship",
    content:
      "Our production staff are highly skilled in all aspects of orthotic manufacture. They are subject to stringent training procedures to ensure our premium level of quality is achieved.",
  },
  {
    id: "3",
    trigger: "Customer Service",
    content:
      "Our friendly customer service team are always happy to assist practitioners with their orders and general queries. If they are unable to resolve an issue they ensure the query is passed through to the appropriate department.",
  },
  {
    id: "4",
    trigger: "We Are PASSIONATE Passionate",
    content:
      "Professional R&D team, big production capacity and quick delivery made up the core competence of the company.",
  },
  {
    id: "5",
    trigger: "Honest And Reliable",
    content:
      "Quality is the survival of enterprise , Innovation is the engine of the development, all the members in the company keep this motto in mind and strictly comply with this criterion",
  },
  {
    id: "6",
    trigger: "Friendly, helpful and professional service",
    content:
      "At Brand My Clothing we combine all the convenience of online selection and ordering with the best in personal, attentive customer care. Why wouldn`t we? By being the best, our reputation grows and grows. Everyone’s happy!",
  },
];

export default function ChooseUsAccordions() {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "space-y-5 rounded-lg border border-secondry bg-neutral-100 p-5 dark:border-secondry-dark dark:bg-neutral-950",
      )}>
      {contents.map(({ id, trigger, content }) => (
        <ChooseUsAccordionItem
          key={id}
          id={id}
          trigger={trigger}
          content={content}
        />
      ))}
    </Accordion>
  );
}
