import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProductsContainer from "@/components/templates/admin/(products)/products/ProductsContainer";
import PageTitle from "@/components/templates/admin/PageTitle";

export default function Products() {
  return (
    <div>
      <PageTitle title="Products">
        <Link href="/admin/add-product">
          <Button className="bg-black dark:bg-white" size="icon">
            <Plus />
          </Button>
        </Link>
      </PageTitle>

      <ProductsContainer />
    </div>
  );
}
