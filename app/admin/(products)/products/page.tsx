import Link from "next/link";
import PageTitle from "../../_components/PageTitle";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsContainer from "../../_components/(products)/products/ProductsContainer";

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
