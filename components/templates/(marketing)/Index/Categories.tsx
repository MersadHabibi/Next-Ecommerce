import { TCategory } from "@/types";
import CategoryItem from "./Category/CategoryItem";
import SectionHeader from "@/components/modules/SectionHeader";

export default function Categories({
  categories,
}: {
  categories: TCategory[];
}) {
  return (
    <section>
      <SectionHeader
        title="Categories"
        description="choose that you want"
        className="mt-24"
        hasButton={false}
      />

      <div className="mt-3 grid grid-cols-1 grid-rows-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.splice(0, 4).map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            imageSrc={`/${category.image}`}
          />
        ))}
      </div>
    </section>
  );
}
