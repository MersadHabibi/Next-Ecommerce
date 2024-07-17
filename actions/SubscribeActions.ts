"use server";

import { prisma, transporter } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email has to be filled." })
    .email("This is not a valid email."),
});

export async function subscribeAction(email: string) {
  try {
    const validatedFields = schema.safeParse({
      email,
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

    // Check unique
    try {
      const uniqueUser = await prisma.subscribe.findUnique({
        where: {
          email,
        },
      });

      if (uniqueUser) {
        return JSON.parse(
          JSON.stringify({
            message: "This email is used before",
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

    //

    await prisma.subscribe.create({
      data: {
        email,
      },
    });

    //

    await sendEmailAction({
      from: "next@mersadhabibi.ir",
      to: "mersad.up@gmail.com",
      subject: "Welcome",
      html: "<h2>Welcome to next-e-commerce</h2>",
    });

    return JSON.parse(
      JSON.stringify({
        status: 201,
        message: "You have subscribed",
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

export async function sendEmailAction({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const res = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Email sended",
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
