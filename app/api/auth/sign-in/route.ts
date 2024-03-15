import { checkPassword, generateToken } from "@/lib/authUtils";
import { PrismaClient } from "@prisma/client";
import joi from "joi";
export async function POST(req: Request) {
  const schema = joi.object({
    username: joi.string().min(4).max(12),
    password: joi.string().min(4).max(12),
  });

  try {
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

    // Logic

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return Response.json(
        {
          message: "user not found",
        },
        {
          status: 404,
        },
      );
    }

    const isTruePassword = checkPassword(password, user.password); // Check password

    if (!isTruePassword) {
      return Response.json(
        {
          message: "username or password wrong",
        },
        {
          status: 403,
        },
      );
    }

    const token = generateToken({ username }); // Generate token

    return Response.json(
      {
        message: "sign in successfully",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token};path=/;httpOnly=true`,
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "error in server",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
