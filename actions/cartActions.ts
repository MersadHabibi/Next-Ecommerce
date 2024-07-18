"use server";

import { z } from "zod";
import { getMeAction } from "./authActions";
import { TCartItem, TUser } from "@/types";
import { prisma } from "@/lib/utils";
import { ORDER_STATUS } from "@/enums";
import { revalidatePath } from "next/cache";

const addToCartSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  color: z.string(),
  size: z.number(),
});

export async function addToCartAction(
  userId: string,
  productId: string,
  quantity: number,
  color: string,
  size: number,
) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  if (!isLogin)
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not login",
      }),
    );

  // Validation

  const validatedFields = addToCartSchema.safeParse({
    userId,
    productId,
    quantity,
    color,
    size,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return JSON.parse(
      JSON.stringify({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "data invalid",
        status: 403,
      }),
    );
  }

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if ((product?.quantity as number) < quantity) {
      return JSON.parse(
        JSON.stringify({
          status: 204,
          message: "There are not enough product in stock",
        }),
      );
    }

    const cart = await prisma.cartItem.findMany({
      where: {
        userId,
      },
    });

    let isHaveInTheCart = cart?.some((cartItem) => {
      if (
        cartItem.productId === productId &&
        cartItem.color === color &&
        cartItem.size === size
      ) {
        return true;
      }
      return false;
    });

    if (isHaveInTheCart) {
      return JSON.parse(
        JSON.stringify({
          status: 409,
          message: "This product is added before",
        }),
      );
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        quantity,
        color,
        size,
        productId,
        userId,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "New product added in your cart",
        cartItem,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function getCartItemsAction(userId: string) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  if (!isLogin)
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not login",
      }),
    );

  try {
    const cart = await getCart(userId);

    return JSON.parse(
      JSON.stringify({
        status: 200,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function changeCartItemQuantityAction(
  cartItemId: string,
  quantity: number,
) {
  if (!cartItemId || !quantity)
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );

  try {
    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 204,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function deleteCartItemAction(cartItemId: string) {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 202,
        message: "Cart item deleted",
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function deleteAllCartItemsAction(userId: string) {
  if (!userId) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );
  }

  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 204,
        message: "The shopping cart is empty",
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
        message: "There is a problem",
      }),
    );
  }
}

export async function changeCartItemSizeAction(
  cartItemId: string,
  size: number,
) {
  if (!cartItemId || !size) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );
  }

  try {
    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        size,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 202,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function changeCartItemColorAction(
  cartItemId: string,
  color: string,
) {
  if (!cartItemId || !color) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );
  }

  try {
    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        color,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 202,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function checkoutAction(address: string) {
  const { isLogin, user }: { isLogin: boolean; user: TUser } =
    await getMeAction();

  if (!isLogin)
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not login",
      }),
    );

  if (!address || address?.length < 10) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Address not entered",
      }),
    );
  }

  try {
    const cart = await getCart(user.id);

    if (cart.length < 1) {
      return JSON.parse(
        JSON.stringify({
          status: 204,
          message: "The cart is empty",
        }),
      );
    }

    let totalPrice = 0;

    cart.forEach((cartItem) => {
      totalPrice += Number(
        (
          cartItem.quantity * Number(cartItem.Product.price) +
          (Number(cartItem.Product.price) / 100) * 9
        ).toFixed(2),
      );
    });

    const order = await prisma.order.create({
      data: {
        totalPrice: totalPrice.toString(),
        address,
        userId: user.id,
        status: ORDER_STATUS.PROGRESS,
      },
    });

    cart.forEach(async (cartItem) => {
      await prisma.orderItem.create({
        data: {
          quantity: cartItem.quantity,
          color: cartItem.color,
          size: cartItem.size,
          productId: cartItem.Product.id,
          orderId: order.id,
        },
      });
    });

    await prisma.cartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });

    revalidatePath("/");

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Your order has been registered",
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function getCart(userId: string) {
  return await prisma.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      Product: true,
    },
  });
}
