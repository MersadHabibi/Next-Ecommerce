import SectionTitle from "@/components/modules/SectionTitle";
import { cn } from "@/lib/utils";
import CategoryItem from "../Category/CategoryItem";

export default function Categories() {
  return (
    <section>
      <SectionTitle
        title="Categories"
        description="choose that you want"
        classname="mt-20"
        hasButton={false}
      />

      <div
        className={cn(
          "mt-3 grid grid-cols-1 grid-rows-1 gap-5 pb-52 sm:grid-cols-2 lg:grid-cols-4",
        )}>
        <CategoryItem
          title="Running shoes"
          imageSrc="/images/categories/running-shoes.png"
        />
        <CategoryItem
          title="Slippers"
          imageSrc="/images/categories/slippers.webp"
        />
        <CategoryItem
          title="Platform sneakers"
          imageSrc="/images/categories/platform-sneakers.webp"
        />
        <CategoryItem
          title="Sandals"
          imageSrc="/images/categories/sandals.webp"
        />
      </div>
    </section>
  );
}
