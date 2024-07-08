import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProductsContainer from "../../_components/(products)/products/ProductsContainer";
import PageTitle from "../../_components/PageTitle";

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
