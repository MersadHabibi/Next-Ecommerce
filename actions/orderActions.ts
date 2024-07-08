"use server";

import { prisma } from "@/lib/utils";

export async function cancelOrderAction(orderId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isCanceled: true,
      },
    });

    const orders = await prisma.order.findMany({
      where: {
        userId: order.userId,
      },
      include: {
        OrderItems: true,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Order canceled",
        orders,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
        message: "Server error! Try later",
      }),
    );
  }
}
