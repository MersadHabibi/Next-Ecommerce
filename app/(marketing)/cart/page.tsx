import EmptyCart from "@/components/templates/Cart/EmptyCart";
import Header from "@/components/templates/Cart/Header";
import Pay from "@/components/templates/Cart/Pay";
import Product from "@/components/templates/Cart/Product";

export default function CartPage() {
  return (
    <div className="mt-10">
      <Header />
      <div className="mt-6 grid grid-cols-4 gap-4 xl:gap-x-6 ">
        <div className="col-span-4 space-y-4 lg:col-span-3 xl:space-y-6">
          {/* <EmptyCart /> */}
          <Product />
          <Product />
        </div>
        <Pay />
      </div>
    </div>
  );
}
