import { verifyToken } from "@/lib/authUtils";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const token = cookies().get("token")?.value as string;

    if (!token) {
      return Response.json(
        {
          message: "token not found",
        },
        {
          status: 404,
        },
      );
    }

    let payload = null;

    try {
      payload = verifyToken(token);
    } catch (error) {
      return Response.json(
        {
          message: "token invalid",
          error,
        },
        {
          status: 401,
        },
      );
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username: payload.username,
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

    return Response.json(
      {
        username: user.username,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "server error",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
