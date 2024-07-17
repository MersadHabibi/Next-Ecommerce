import { getMeAction } from "@/actions/authActions";
import CartItemsList from "@/components/templates/(marketing)/Cart/CartItemsList";
import Checkout from "@/components/templates/(marketing)/Cart/Checkout";
import Header from "@/components/templates/(marketing)/Cart/Header";
import { TUser } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Cart',
  description: '...',
}

export default async function CartPage() {
  const { isLogin, user }: { isLogin: boolean; user : TUser } = await getMeAction();

  if (!isLogin) redirect("/");

  return (
    <div className="mt-10">
      <Header userId={user.id} />
      <div className="mt-6 grid grid-cols-4 gap-4 xl:gap-x-6 ">
        <div className="col-span-4 space-y-4 lg:col-span-3 xl:space-y-6">
          <CartItemsList userId={user.id} />
        </div>
        <Checkout />
      </div>
    </div>
  );
}
