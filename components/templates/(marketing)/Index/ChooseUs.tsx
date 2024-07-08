import SectionHeader from "@/components/modules/SectionHeader";
import ChooseUsAccordions from "./ChooseUs/ChooseUsAccordions";
import OurBranches from "./ChooseUs/OurBranches";
import Subscribe from "./ChooseUs/Subscribe";

export default function ChooseUs() {
  return (
    <section>
      <SectionHeader
        title="Why Should You Choose Us"
        hasButton={false}
        className="mt-24"
      />

      <div className="flex flex-col gap-5 pt-5 lg:flex-row">
        <div className="w-full">
          <ChooseUsAccordions />
        </div>
        <div className="w-full space-y-5 lg:space-y-6 xl:space-y-3">
          <Subscribe />
          <OurBranches />
        </div>
      </div>
    </section>
  );
}
