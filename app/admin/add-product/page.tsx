"use client";

import AddProductImages from "../_components/add-product/Images";
import AddProductDetails from "../_components/add-product/Details";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewProduct } from "@/stores/newProduct";
import { addProductAction } from "@/actions/productActions";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Loader from "@/components/modules/Loader";
import PageTitle from "../_components/PageTitle";

const formSchema = z.object({
  title: z
    .string()
    .min(4, "title must be more than 4 characters")
    .max(40, "title must be less than 40 characters"),
  price: z.string().min(1, "price must be more than 1 dolor"),
  description: z
    .string()
    .min(8, "description must be more than 8 characters")
    .max(200, "description must be less than 200 characters"),
});

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Product Name",
      price: "100",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus aliquid mollitia deleniti saepe corrupti alias ea est, excepturi facere minus.",
    },
  });

  const newProductsDatas = useNewProduct((state) => state);

  const { toast } = useToast();

  async function formSubmitHandler(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Validation

    if (!newProductsDatas.mainImage || !(newProductsDatas.images.length > 0)) {
      return toast({
        variant: "destructive",
        description: "you must to choose main image and at least 1 other image",
      });
    }

    if (
      !(newProductsDatas.colors.length > 0) ||
      !(newProductsDatas.sizes.length > 0)
    ) {
      return toast({
        variant: "destructive",
        description: "you must add size and color",
      });
    }

    setIsLoading(true);

    formData.append("mainImage", newProductsDatas.mainImage);
    newProductsDatas.images
      .sort((image) => image.sortId)
      .forEach((image, index) =>
        formData.append(`image-${index}`, image.image),
      );
    formData.append(
      "details",
      JSON.stringify({ ...data, ...newProductsDatas }),
    );

    const res = await addProductAction(formData);

    setIsLoading(false);

    if (res.status === 201) {
      form.reset();

      newProductsDatas.reset();

      return toast({
        description: res.message,
      });
    }

    console.log(res);

    toast({ description: res.message, variant: "destructive" });
  }

  return (
    <div className="relative">
      <PageTitle title="Add Product" />

      <form action="" onSubmit={form.handleSubmit(formSubmitHandler)} className="sm:px-5 pt-8">
        <div className="flex flex-col gap-8 lg:flex-row xl:gap-x-10">
          <div className="w-full">
            <AddProductImages />
          </div>
          <div className="w-full pt-5 xl:pt-5">
            <AddProductDetails formRegister={form.register} />
          </div>
        </div>

        <div className="mt-10 flex justify-end border-t border-secondry pt-6 dark:border-secondry-dark">
          <Button
            type="submit"
            className="bg-black dark:bg-white"
            size="lg"
            disabled={isLoading}>
            {isLoading ? <Loader /> : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
