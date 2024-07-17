import { getVisitsAction } from "@/actions/visitActions";
import DailyInformation from "@/components/templates/admin/DailyInformation";
import LastOrders from "@/components/templates/admin/LastOrders";
import MonthIncomeChart from "@/components/templates/admin/MonthIncomeChart";
import { prisma } from "@/lib/utils";
import { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
  title: 'Home | Admin',
  description: '...',
}

const getOrdersAndVisits = cache(async () => {
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
    prisma.visit.findMany({}),
  ]);
});

export default async function AdminPage() {
  const [allOrders, visits] = await getOrdersAndVisits();

  return (
    <div className="w-full">
      <DailyInformation allOrders={allOrders} visits={visits} />
      <MonthIncomeChart allOrders={allOrders} />
      <LastOrders
        lastOrders={allOrders
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5)}
      />
    </div>
  );
}
