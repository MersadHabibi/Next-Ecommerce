import { getMeAction } from "@/actions/authActions";
import Header from "@/components/templates/(marketing)/Orders/Header";
import OrdersList from "@/components/templates/(marketing)/Orders/OrdersList";
import { prisma } from "@/lib/utils";
import { TUser } from "@/types";
import { redirect } from "next/navigation";
import { cache } from "react";

const getOrders = cache(async (id: string) => {
  return await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      OrderItems: {
        include: {
          Product: true,
        },
      },
    },
  });
});

export default async function orders() {
  const { isLogin, user }: { isLogin: boolean; user: TUser } =
    await getMeAction();

  if (!isLogin) redirect("/");

  const orders = await getOrders(user.id);

  return (
    <div className="mt-10">
      <Header />
      <OrdersList orders={orders} />
    </div>
  );
}
