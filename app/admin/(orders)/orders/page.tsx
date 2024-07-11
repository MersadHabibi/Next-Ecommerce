import OrdersList from "@/components/templates/admin/(orders)/orders/OrdersList";
import PageTitle from "@/components/templates/admin/PageTitle";
import { prisma } from "@/lib/utils";
import { cache } from "react";

const getOrders = cache(async () => {
  return await Promise.all([
    prisma.order.findMany({
      include: {
        OrderItems: {
          include: {
            Product: true,
          },
        },
      },
    }),
  ]);
});

export default async function OrdersPage() {
  const [orders] = await getOrders();

  return (
    <div className="relative">
      <PageTitle title="Orders" />

      <OrdersList orders={orders} />
    </div>
  );
}
