"use server";

import { ORDER_STATUS } from "@/enums";
import { prisma } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getMeAction } from "./authActions";
import { TCartItem, TUser } from "@/types";
import { getCart } from "./cartActions";

export async function cancelOrderAction(orderId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: ORDER_STATUS.CANCELED,
      },
    });

    revalidatePath("/orders");

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Order canceled",
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

export async function rejectOrderAction(orderId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: ORDER_STATUS.REJECTED,
      },
    });

    revalidatePath("/admin/orders");

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Order rejected",
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

export async function acceptOrderAction(orderId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: ORDER_STATUS.SENDING,
      },
      include: {
        OrderItems: {
          include: {
            Product: true,
          },
        },
      },
    });

    // Calc products quantity

    const cartGroupByProductId: Record<string, TCartItem[]> = {};

    order.OrderItems.forEach((cartItem) => {
      cartGroupByProductId[cartItem.Product.id] =
        cartGroupByProductId[cartItem.Product.id] || [];
      cartGroupByProductId[cartItem.Product.id].push(
        cartItem as unknown as TCartItem,
      );
    });

    for (let key in cartGroupByProductId) {
      const product = await prisma.product.findFirst({
        where: {
          id: key,
        },
      });
      let allQuantity = 0;

      cartGroupByProductId[key].forEach((cartItem) => {
        allQuantity += cartItem.quantity;
      });

      if ((product?.quantity as number) < allQuantity)
        return JSON.parse(
          JSON.stringify({
            status: 204,
            message: `There are not enough ${product?.title} in stock`,
          }),
        );

      await prisma.product.update({
        where: {
          id: key,
        },
        data: {
          quantity: (product?.quantity as number) - allQuantity,
          sales: (product?.sales || 0) + allQuantity,
        },
      });
    }

    //

    revalidatePath("/admin/orders");

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Order accepted",
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

export async function completeOrderAction(orderId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: ORDER_STATUS.COMPLETED,
      },
    });

    revalidatePath("/admin/orders");

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Order completed",
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
