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

    const cart = (
      await prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          cartItems: true,
        },
      })
    )?.cartItems;

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
