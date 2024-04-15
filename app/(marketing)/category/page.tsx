import Filter from "@/components/templates/Category/Filter";
import Products from "@/components/templates/Category/Products";
import Search from "@/components/templates/Category/Search";
import Sort from "@/components/templates/Category/Sort";
import { Suspense } from "react";
import Loading from "../loading";

export default function CategoryPage() {
  return (
    <div className="mt-10 grid grid-cols-4 gap-4 xl:gap-x-6">
      <div className="col-span-4 space-y-4 lg:col-span-1 xl:space-y-6">
        <Search />

        <Filter />
      </div>
      <div className="col-span-4 space-y-4 lg:col-span-3 xl:space-y-6">
        <Sort />

        <Suspense fallback={<Loading />}>
          <Products />
        </Suspense>
      </div>
    </div>
  );
}
