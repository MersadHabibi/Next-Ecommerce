"use client";

import { addProductAction } from "@/actions/productActions";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddProductDetails from "../../_components/(products)/add-product/Details";
import AddProductImages from "../../_components/(products)/add-product/Images";
import PageTitle from "../../_components/PageTitle";
import { useNewProduct } from "../../_stores/newProduct";

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

  const newProductsData = useNewProduct((state) => state);

  const { toast } = useToast();

  async function formSubmitHandler(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Validation

    if (!newProductsData.mainImage || !(newProductsData.images.length > 0)) {
      return toast({
        variant: "destructive",
        description: "you must to choose main image and at least 1 other image",
      });
    }

    if (
      !(newProductsData.colors.length > 0) ||
      !(newProductsData.sizes.length > 0)
    ) {
      return toast({
        variant: "destructive",
        description: "you must add size and color",
      });
    }

    setIsLoading(true);

    formData.append("mainImage", newProductsData.mainImage);
    newProductsData.images
      .sort((image) => image.sortId)
      .forEach((image, index) =>
        formData.append(`image-${index}`, image.image),
      );
    formData.append("details", JSON.stringify({ ...data, ...newProductsData }));

    const res = await addProductAction(formData);

    setIsLoading(false);

    if (res.status === 201) {
      form.reset();

      newProductsData.reset();

      return toast({
        description: res.message,
      });
    }

    toast({ description: res.message, variant: "destructive" });
  }

  return (
    <div className="relative">
      <PageTitle title="Add Product" />

      <form
        action=""
        onSubmit={form.handleSubmit(formSubmitHandler)}
        className="pt-8 sm:px-5">
        <div className="flex flex-col gap-8 lg:flex-row xl:gap-x-10">
          <div className="w-full">
            <AddProductImages />
          </div>
          <div className="w-full pt-5 xl:pt-5">
            <AddProductDetails formRegister={form.register} />
          </div>
        </div>

        <div className="border-secondary dark:border-secondary-dark mt-10 flex justify-end border-t pt-6">
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
