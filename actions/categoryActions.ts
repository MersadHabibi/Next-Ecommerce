"use server";

import { saveFile } from "@/lib/saveFile";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getMeAction } from "./authActions";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp"];

const schema = z.object({
  title: z.string().min(4).max(25),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .png and .webp formats are supported.",
    ),
});

export async function addCategoryAction(formData: FormData) {
  const { role }: { role: "ADMIN" | "USER" } = await getMeAction();

  if (role !== "ADMIN")
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not access",
      }),
    );

  const title = formData.getAll("title")[0] as string;
  const image = formData.getAll("image")[0] as File;

  // Validation

  const validatedFields = schema.safeParse({
    title,
    image,
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

  let imagePath = "";

  try {
    const res = await saveFile(image, "category");

    imagePath = res.path as string;
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
        message: "Upload image failed",
      }),
    );
  }

  const prisma = new PrismaClient();

  try {
    const category = await prisma.category.create({
      data: {
        title,
        image: imagePath,
      },
    });

    const categories = await prisma.category.findMany();

    return JSON.parse(
      JSON.stringify({
        status: 201,
        message: "New category created",
        categories,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "create category failed",
        error,
      }),
    );
  }
}

export async function deleteCategpryAction(categoryId: string) {
  const { role }: { role: "ADMIN" | "USER" } = await getMeAction();

  if (role !== "ADMIN")
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not access",
      }),
    );

  const prisma = new PrismaClient();

  try {
    const category = await prisma.category.delete({
      where: { id: categoryId },
    });

    const categories = await prisma.category.findMany();

    return JSON.parse(
      JSON.stringify({
        status: 202,
        message: "Delete category successfully",
        categories,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "Delete category failed",
        error,
      }),
    );
  }
}

export async function getAllCategoriesAction() {
  try {
    const prisma = new PrismaClient();

    const categories = await prisma.category.findMany();

    return JSON.parse(
      JSON.stringify({
        categories,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "server error",
        error,
      }),
    );
  }
}
