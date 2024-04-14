"use server";

import {
  checkPassword,
  createHash,
  generateToken,
  verifyToken,
} from "@/lib/authUtils";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 5 characters.",
    })
    .max(12, {
      message: "The username must be a maximum of 4 characters",
    }),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters",
    })
    .max(12, {
      message: "The password must be a maximum of 4 characters",
    }),
});

export async function signUpAction(formData: FormData) {
  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const username: string = formData.get("username") as string;
    const password: string = formData.get("password") as string;

    const prisma = new PrismaClient();

    // Check unique
    try {
      const uniqueUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (uniqueUser) {
        return JSON.parse(
          JSON.stringify({
            message: "username is not unique",
            status: 409,
          }),
        );
      }
    } catch (error) {
      return JSON.parse(
        JSON.stringify({
          error,
          status: 500,
        }),
      );
    }

    const token = generateToken({ username }); // Generate token

    const hashedPassword = await createHash(password); // Hash password

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword as string,
      },
    });

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
    });

    return JSON.parse(
      JSON.stringify({
        message: "user create successfully",
        data: user,
        status: 201,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        error,
        status: 500,
      }),
    );
  }
}

export async function signInAction(formData: FormData) {
  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return JSON.parse(
        JSON.stringify({
          message: "user not found",
          status: 404,
        }),
      );
    }

    const isTruePassword = checkPassword(password, user.password); // Check password

    if (!isTruePassword) {
      return JSON.parse(
        JSON.stringify({
          message: "username or password wrong",
          status: 403,
        }),
      );
    }

    const token = generateToken({ username }); // Generate token

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
    });

    return JSON.parse(
      JSON.stringify({
        message: "Sign in successfully",
        status: 200,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        message: "error in server",
        error,
        status: 500,
      }),
    );
  }
}

export async function getMeAction() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return JSON.parse(
        JSON.stringify({
          message: "token not found",
          isLogin: false,
          status: 404,
        }),
      );
    }

    let payload: { username: string } | null = null;

    try {
      payload = await verifyToken(token);
    } catch (error) {
      return JSON.parse(
        JSON.stringify({
          message: "token invalid",
          isLogin: false,
          status: 401,
        }),
      );
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username: payload?.username,
      },
    });

    if (!user) {
      return JSON.parse(
        JSON.stringify({
          message: "user not found",
          isLogin: false,
          status: 404,
        }),
      );
    }

    return JSON.parse(
      JSON.stringify({
        username: user.username,
        role: user.role,
        isLogin: true,
        status: 200,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        error,
        isLogin: false,
        status: 500,
      }),
    );
  }
}

export async function logoutAction() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return JSON.parse(
        JSON.stringify({
          message: "you are not login",
          status: 401,
        }),
      );
    }

    cookies().delete("token");

    return JSON.parse(
      JSON.stringify({
        message: "logout successfully",
        status: 200,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        message: "server error",
        status: 500,
      }),
    );
  }
}
