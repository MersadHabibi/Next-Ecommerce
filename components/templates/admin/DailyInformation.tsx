import { getVisitsAction } from "@/actions/visitActions";
import { notoSans } from "@/config/fonts";
import { ORDER_STATUS } from "@/enums";
import { checkSameDay, cn } from "@/lib/utils";
import { TOrder } from "@/types";
import { BarChart4, Eye, ShoppingBag } from "lucide-react";
import { useEffect, useMemo } from "react";

export default async function DailyInformation({
  allOrders,
  visits,
}: {
  allOrders: Omit<TOrder, "OrderItems">[];
  visits: { id: string; createdAt: Date }[];
}) {
  const todayOrders = useMemo(
    () =>
      allOrders.filter((order) =>
        checkSameDay(new Date(order.createdAt), new Date()),
      ),
    [allOrders],
  );

  const todayIncome = useMemo(
    () =>
      todayOrders
        .filter(
          (order) =>
            order.status === ORDER_STATUS.SENDING ||
            order.status === ORDER_STATUS.COMPLETED,
        )
        .reduce((acc, obj) => {
          return acc + Number(obj.totalPrice);
        }, 0),
    [todayOrders],
  );

  const todayVisits = visits.filter((visit) =>
    checkSameDay(new Date(), new Date(visit.createdAt)),
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 md:flex-nowrap">
      <div className="flex w-full items-center justify-between rounded-md border border-secondary px-7 py-8 dark:border-secondary-dark">
        <div className="flex flex-col gap-y-1">
          <p
            className={cn(
              "text-3xl/7 font-bold text-secondary-dark dark:text-secondary",
              notoSans.className,
            )}>
            ${todayIncome}
          </p>
          <p className="text-sm text-secondary-dark/80 dark:text-secondary">
            Today income
          </p>
        </div>
        <div>
          <BarChart4
            size={40}
            className="text-secondary-dark dark:text-secondary"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between rounded-md border border-secondary px-7 py-8 dark:border-secondary-dark">
        <div className="flex flex-col gap-y-1">
          <p
            className={cn(
              "text-3xl/7 font-bold text-secondary-dark dark:text-secondary",
              notoSans.className,
            )}>
            {todayOrders.length}
          </p>
          <p className="text-sm text-secondary-dark/80 dark:text-secondary">
            Today orders
          </p>
        </div>
        <div>
          <ShoppingBag
            size={40}
            className="text-secondary-dark dark:text-secondary"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between rounded-md border border-secondary px-7 py-8 dark:border-secondary-dark">
        <div className="flex flex-col gap-y-1">
          <p
            className={cn(
              "text-3xl/7 font-bold text-secondary-dark dark:text-secondary",
              notoSans.className,
            )}>
            {todayVisits.length}
          </p>
          <p className="text-sm text-secondary-dark/80 dark:text-secondary">
            Today visitors
          </p>
        </div>
        <div>
          <Eye size={40} className="text-secondary-dark dark:text-secondary" />
        </div>
      </div>
    </div>
  );
}
