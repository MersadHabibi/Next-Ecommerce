import PageTitle from "../../_components/PageTitle";
import CategoryList from "../../_components/(categories)/categories/CategoryList";
import AddCategpry from "../../_components/(categories)/categories/AddCategory";
import { PrismaClient } from "@prisma/client";

export default async function CategoriesPage() {
  const prisma = new PrismaClient();

  const categories = await prisma.category.findMany({});

  return (
    <div className="relative">
      <PageTitle title="Categories">
        <AddCategpry />
      </PageTitle>

      <CategoryList categoriesEntry={categories} />
    </div>
  );
}
