import PageTitle from "@/components/templates/admin/PageTitle";
import CategoryList from "@/components/templates/admin/(categories)/categories/CategoryList";
import AddCategory from "@/components/templates/admin/(categories)/categories/AddCategory";
import { prisma } from "@/lib/utils";
import { cache } from "react";

const getCategories = cache(async () => {
  return await Promise.all([prisma.category.findMany({})]);
});

export default async function CategoriesPage() {
  const [categories] = await getCategories();

  return (
    <div className="relative">
      <PageTitle title="Categories">
        <AddCategory />
      </PageTitle>

      <CategoryList categoriesEntry={categories} />
    </div>
  );
}
