"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ORDER_STATUS } from "@/enums";
import { checkSameDay } from "@/lib/utils";
import { TOrder } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", income: 200 },
  { month: "February", income: 200 },
  { month: "March", income: 500 },
  { month: "April", income: 200 },
  { month: "May", income: 200 },
  { month: "June", income: 200 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function MonthIncomeChart({
  allOrders,
}: {
  allOrders: Omit<TOrder, "OrderItems">[];
}) {
  const [ordersByDay, setOrdersDay] = useState<
    { date: Date; income: number }[]
  >([]);

  const acceptedOrders = useMemo(
    () =>
      allOrders.filter(
        (order) =>
          order.status === ORDER_STATUS.SENDING ||
          order.status === ORDER_STATUS.COMPLETED,
      ),
    [allOrders],
  );

  useEffect(() => {
    let newOrdersByDay: { date: Date; income: number }[] = [
      { date: new Date(Date.now()), income: 0 },
      { date: new Date(Date.now() - 864e5), income: 0 },
      { date: new Date(Date.now() - 864e5 * 2), income: 0 },
      { date: new Date(Date.now() - 864e5 * 3), income: 0 },
      { date: new Date(Date.now() - 864e5 * 4), income: 0 },
      { date: new Date(Date.now() - 864e5 * 5), income: 0 },
      { date: new Date(Date.now() - 864e5 * 6), income: 0 },
      { date: new Date(Date.now() - 864e5 * 7), income: 0 },
      { date: new Date(Date.now() - 864e5 * 8), income: 0 },
      { date: new Date(Date.now() - 864e5 * 9), income: 0 },
      { date: new Date(Date.now() - 864e5 * 10), income: 0 },
      { date: new Date(Date.now() - 864e5 * 11), income: 0 },
      { date: new Date(Date.now() - 864e5 * 12), income: 0 },
      { date: new Date(Date.now() - 864e5 * 13), income: 0 },
      { date: new Date(Date.now() - 864e5 * 14), income: 0 },
      { date: new Date(Date.now() - 864e5 * 15), income: 0 },
      { date: new Date(Date.now() - 864e5 * 16), income: 0 },
      { date: new Date(Date.now() - 864e5 * 17), income: 0 },
      { date: new Date(Date.now() - 864e5 * 18), income: 0 },
      { date: new Date(Date.now() - 864e5 * 19), income: 0 },
      { date: new Date(Date.now() - 864e5 * 20), income: 0 },
      { date: new Date(Date.now() - 864e5 * 21), income: 0 },
      { date: new Date(Date.now() - 864e5 * 22), income: 0 },
      { date: new Date(Date.now() - 864e5 * 23), income: 0 },
      { date: new Date(Date.now() - 864e5 * 24), income: 0 },
      { date: new Date(Date.now() - 864e5 * 25), income: 0 },
      { date: new Date(Date.now() - 864e5 * 26), income: 0 },
      { date: new Date(Date.now() - 864e5 * 27), income: 0 },
      { date: new Date(Date.now() - 864e5 * 28), income: 0 },
      { date: new Date(Date.now() - 864e5 * 29), income: 0 },
    ];

    acceptedOrders.forEach((order) => {
      let dateIndex = newOrdersByDay.findIndex((orderByDate) => {
        return checkSameDay(orderByDate.date, new Date(order.createdAt));
      });

      if (dateIndex == -1) return;

      newOrdersByDay[dateIndex].income += Number(order.totalPrice);
    });

    setOrdersDay(newOrdersByDay);
  }, [acceptedOrders]);

  return (
    <div className="pt-5">
      <ChartContainer
        config={chartConfig}
        className="max-h-96 min-h-[200px] w-full">
        <BarChart accessibilityLayer data={ordersByDay}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              value.toLocaleString("default", { month: "long", day: "2-digit" })
            }
          />
          <ChartTooltip
            wrapperClassName="bg-black"
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="income" fill="#2563eb" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
