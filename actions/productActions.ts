"use server";

import { saveFile } from "@/lib/saveFile";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getMeAction } from "./authActions";

const schema = z.object({
  title: z.string().min(4).max(40),
  price: z.string().min(1),
  description: z.string().min(8).max(200),
  colors: z.string().array().min(1).max(8),
  sizes: z.number().array().min(1).max(8),
  quantity: z.number().min(1),
  gender: z.string(),
  category: z.string(),
});

export async function addProductAction(formData: FormData) {
  const { role }: { role: "ADMIN" | "USER" } = await getMeAction();

  if (role !== "ADMIN")
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not access",
      }),
    );

  const {
    title,
    price,
    description,
    colors,
    sizes,
    quantity,
    gender,
    category,
  }: {
    title: string;
    price: string;
    description: string;
    colors: string[];
    sizes: number[];
    quantity: number;
    gender: string;
    category: string;
  } = JSON.parse(JSON.parse(JSON.stringify(formData.get("details"))));

  const mainImage = formData.get("mainImage") as File;
  let images: File[] = [];

  for (let i = 0; i < 5; i++) {
    images.push(formData.get(`image-${i}`) as File);
  }

  images = images.filter((value) => value);

  // Validation

  const validatedFields = schema.safeParse({
    title,
    price,
    description,
    colors,
    sizes,
    quantity,
    gender,
    category,
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

    try {
    const prisma = new PrismaClient();
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
        gender,
        categoryId: category,
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

export async function getAllProductsAction() {
  try {
    const prisma = new PrismaClient();

    const products = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        products,
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

// export async function getProductById(id: string) {
//   try {
//     const prisma = new PrismaClient();

//     const product = await prisma.product.findFirst({
//       where: {
//         id,
//       },
//     });

//     if (!product)
//       return JSON.parse(
//         JSON.stringify({
//           status: 404,
//         }),
//       );

//     return JSON.parse(
//       JSON.stringify({
//         status: 200,
//         product,
//       }),
//     );
//   } catch (error) {
//     return JSON.parse(
//       JSON.stringify({
//         status: 500,
//         error,
//       }),
//     );
//   }
// }

export async function deleteProductAction(id: string) {
  const { role }: { role: "ADMIN" | "USER" } = await getMeAction();

  if (role !== "ADMIN")
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not access",
      }),
    );

  if (!id) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "data invalid",
      }),
    );
  }

  try {
    const prisma = new PrismaClient();

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    const allProducts = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 202,
        message: "Product deleted",
        allProducts,
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

export async function updateProductAction(formData: FormData) {
  console.log(formData);
  const { role }: { role: "ADMIN" | "USER" } = await getMeAction();

  if (role !== "ADMIN")
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not access",
      }),
    );

  const {
    id,
    title,
    price,
    description,
    colors,
    sizes,
    quantity,
    gender,
    category,
  }: {
    id: string;
    title: string;
    price: string;
    description: string;
    colors: string[];
    sizes: number[];
    quantity: number;
    gender: string;
    category: string;
  } = JSON.parse(JSON.parse(JSON.stringify(formData.get("data"))));

  // Validation

  const validatedFields = schema.safeParse({
    title,
    price,
    description,
    colors,
    sizes,
    quantity,
    gender,
    category,
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

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        price,
        description,
        colors,
        sizes,
        quantity,
      },
    });

    const allProducts = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Product updated",
        allProducts,
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
