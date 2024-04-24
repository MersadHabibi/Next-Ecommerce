import { getMeAction } from "@/actions/authActions";
import CartItemsList from "@/components/templates/Cart/CartItemsList";
import Checkout from "@/components/templates/Cart/Checkout";
import Header from "@/components/templates/Cart/Header";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const { isLogin, id }: { isLogin: boolean; id: string } = await getMeAction();

  if (!isLogin) redirect("/");

  return (
    <div className="mt-10">
      <Header userId={id} />
      <div className="mt-6 grid grid-cols-4 gap-4 xl:gap-x-6 ">
        <div className="col-span-4 space-y-4 lg:col-span-3 xl:space-y-6">
          <CartItemsList userId={id} />
        </div>
        <Checkout />
      </div>
    </div>
  );
}
