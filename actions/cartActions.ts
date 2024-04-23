"use server";

import { z } from "zod";
import { getMeAction } from "./authActions";
import { PrismaClient } from "@prisma/client";

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
        message: "datas invalid",
        status: 403,
      }),
    );
  }

  try {
    const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

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
        message: "Datas invalid",
      }),
    );

  try {
    const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

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
        message: "Datas invalid",
      }),
    );
  }

  try {
    const prisma = new PrismaClient();

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
        message: "Datas invalid",
      }),
    );
  }

  try {
    const prisma = new PrismaClient();

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
        message: "Datas invalid",
      }),
    );
  }

  try {
    const prisma = new PrismaClient();

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

async function getCart(userId: string) {
  const prisma = new PrismaClient();

  return await prisma.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      Product: true,
    },
  });
}
