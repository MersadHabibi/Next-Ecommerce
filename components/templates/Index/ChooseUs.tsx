import SectionHeader from "@/components/modules/SectionHeader";
import { cn } from "@/lib/utils";
import ChooseUsAccordions from "../ChooseUs/ChooseUsAccordions";
import Subscribe from "../ChooseUs/Subscribe";
import OurBranches from "../ChooseUs/OurBranches";

export default function ChooseUs() {
  return (
    <section className="">
      <SectionHeader
        title="Why Should You Choose Us"
        hasButton={false}
        classname="mt-32"
      />

      <div className={cn("flex flex-col gap-5 pt-5 lg:flex-row")}>
        <div className={cn("w-full")}>
          <ChooseUsAccordions />
        </div>
        <div className={cn("w-full space-y-5 lg:space-y-6 xl:space-y-3")}>
          <Subscribe />
          <OurBranches />
        </div>
      </div>
    </section>
  );
}
