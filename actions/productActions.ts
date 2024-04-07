"use server";

import { saveFile } from "@/lib/saveFile";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(4).max(40),
  price: z.string().min(1),
  description: z.string().min(8).max(200),
  colors: z.string().array().min(1).max(8),
  sizes: z.number().array().min(1).max(8),
  quantity: z.number().min(1),
});

export async function addProductAction(formData: FormData) {
  const {
    title,
    price,
    description,
    colors,
    sizes,
    quantity,
  }: {
    title: string;
    price: string;
    description: string;
    colors: string[];
    sizes: number[];
    quantity: number;
  } = JSON.parse(JSON.parse(JSON.stringify(formData.get("details"))));

  const mainImage = formData.get("mainImage") as File;
  let images: File[] = [];

  for (let i = 0; i < 5; i++) {
    images.push(formData.get(`image-${i}`) as File);
  }

  images = images.filter((value) => value);

  // Validation

  const validatedFields = schema.safeParse({
    title: title,
    price: price,
    description: description,
    colors: colors,
    sizes: sizes,
    quantity: quantity,
  });

  console.log(title);

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

  if (!mainImage || images.length < 1) {
    return JSON.parse(
      JSON.stringify({
        message: "images invalid",
        status: 403,
      }),
    );
  }

  // Upload images

  const uploadImageRes = await uploadImages(mainImage, images);

  if (!uploadImageRes)
    return JSON.parse(
      JSON.stringify({ status: 500, message: "upload image failed" }),
    );

  const prisma = new PrismaClient();
  try {
    // Create Product

    const product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        colors,
        sizes,
        quantity,
        mainImage: uploadImageRes.pathes.mainImage,
        images: uploadImageRes.pathes.images,
      },
    });

    return JSON.parse(
      JSON.stringify({
        product,
        status: 201,
        message: "product created successfully",
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "error in create product",
        error,
      }),
    );
  }
}

async function uploadImages(mainImage: File, images: File[]) {
  const pathes: {
    mainImage: string;
    images: string[];
  } = {
    mainImage: "",
    images: [],
  };

  const res = await saveFile(mainImage, "main-images");

  if (res.status === 500) return false;

  pathes.mainImage = res.path as string;

  for (let i = 0; i < images.length; i++) {
    const res = await saveFile(images.at(i) as File, "images");

    if (res.status === 500) return false;

    pathes.images[i] = res.path as string;
  }

  return {
    pathes,
  };
}
