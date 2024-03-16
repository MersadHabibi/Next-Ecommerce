"use server";

import { createHash, generateToken } from "@/lib/authUtils";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 5 characters.",
  }).max(12 , {
    message: "The username must be a maximum of 4 characters"
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }).max(12 , {
    message: "The password must be a maximum of 4 characters"
  })
});

export default async function signUpAction(formData: FormData) {
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
    // Get body
    const username: string = formData.get("username") as string;
    const password: string = formData.get("password") as string;

    const prisma = new PrismaClient();

    prisma.$connect();

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
