import OrdersList from "@/components/templates/admin/(orders)/orders/OrdersList";
import ReloadOrders from "@/components/templates/admin/(orders)/orders/ReloadOrders";
import PageTitle from "@/components/templates/admin/PageTitle";
import { prisma } from "@/lib/utils";
import { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
  title: 'Orders',
  description: '...',
}

const getOrders = cache(async () => {
  return await prisma.order.findMany({
    include: {
      OrderItems: {
        include: {
          Product: true,
        },
      },
    },
  });
});

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="relative">
      <PageTitle title="Orders">
        <ReloadOrders />
      </PageTitle>

      <OrdersList orders={orders} />
    </div>
  );
}
