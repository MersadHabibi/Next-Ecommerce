import { getMeAction } from "@/actions/authActions";
import Header from "@/components/templates/Orders/Header";
import OrdersList from "@/components/templates/Orders/OrdersList";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function orders() {
  const { isLogin, id }: { isLogin: boolean; id: string } = await getMeAction();

  if (!isLogin) redirect("/");

  const prisma = new PrismaClient();

  const orders = await prisma.order.findMany({
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

  console.log(orders);

  return (
    <div className="mt-10">
      <Header />
      <OrdersList orders={orders} />
    </div>
  );
}
