import { Button } from "@/components/ui/button";
import PageTitle from "../_components/PageTitle";
import CategoryList from "../_components/categories/CategoryList";
import { PlusCircle } from "lucide-react";
import AddCategpry from "../_components/categories/AddCategory";

export default function CategoriesPage() {
  return (
    <div className="relative">
      <PageTitle title="Categories">
        <AddCategpry />
      </PageTitle>

      <CategoryList />
    </div>
  );
}
