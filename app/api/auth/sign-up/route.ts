import { createHash, generateToken } from "@/lib/authUtils";
import { PrismaClient } from "@prisma/client";
import joi from "joi";

export async function POST(req: Request) {
  const schema = joi.object({
    username: joi.string().min(4).max(12),
    password: joi.string().min(4).max(12),
  });

  try {
    // Get body
    const { username, password }: { username: string; password: string } =
      await req.json();

    // Validation
    try {
      await schema.validateAsync({ username, password });
    } catch (error) {
      return Response.json(
        {
          message: "data is not valid",
          error,
        },
        {
          status: 403,
        },
      );
    }

    const prisma = new PrismaClient();

    // Check unique
    const uniqueUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (uniqueUser) {
      return Response.json(
        {
          message: "username is not unique",
        },
        {
          status: 409,
        },
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

    return Response.json(
      {
        message: "user create successfully",
        data: user,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token};path=/;httpOnly=true`,
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      },
    );
  }
}
