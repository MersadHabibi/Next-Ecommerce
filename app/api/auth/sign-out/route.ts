import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value as string;

    if (!token) {
      return Response.json(
        {
          message: "you are not login",
        },
        {
          status: 401,
        },
      );
    }

    return Response.json(
      {
        message: "sign-out successfully",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token="";path=/;httpOnly=true`,
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
