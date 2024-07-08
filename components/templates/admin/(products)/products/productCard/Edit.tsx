"use client";

import { Pencil } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { updateProductAction } from "@/actions/productActions";
import { useEditProductStore } from "@/app/admin/_stores/editProductStore";
import { useProducts } from "@/app/admin/_stores/productsStore";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Colors from "./edit/Colors";
import Sizes from "./edit/Sizes";
import { TProduct } from "@/types";

const formSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters." })
    .max(40),
  price: z.string().min(1, { message: "Price must be at least 1 Dolor." }),
  description: z
    .string()
    .min(8, { message: "Description must be at least 8 characters." })
    .max(200),
  quantity: z.number().min(1, { message: "Quantity must be at least 2." }),
});

export default function Edit({ product }: { product: TProduct }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: Number(product.quantity),
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const sizes = useEditProductStore((state) => state.sizes);
  const colors = useEditProductStore((state) => state.colors);
  const setSizes = useEditProductStore((state) => state.setSizes);
  const setColors = useEditProductStore((state) => state.setColors);

  const setProducts = useProducts((state) => state.setProducts);

  const { toast } = useToast();

  function onOpen() {
    setSizes(product.sizes);
    setColors(product.colors);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        id: product.id,
        ...values,
        sizes,
        colors,
        category: product.categoryId,
        gender: product.gender,
      }),
    );

    const res = await updateProductAction(formData);

    setIsLoading(false);

    if (res.status === 200) {
      setProducts(res.allProducts);

      return toast({
        description: res.message,
      });
    }

    toast({
      variant: "destructive",
      description: res.message,
    });
  }

  return (
    <Popover>
      <PopoverTrigger
        onClick={onOpen}
        disabled={isLoading}
        className="flex-center size-11 rounded-md bg-black text-white transition hover:opacity-70 disabled:opacity-80 dark:bg-white dark:text-black">
        {isLoading ? <Loader /> : <Pencil />}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-x-3">
                    <FormLabel className="text-end">title :</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="title" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-x-3">
                    <FormLabel className="text-end">price :</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="price" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-x-3">
                    <FormLabel className="text-end">description :</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="description" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-x-3">
                    <FormLabel className="text-end">quantity :</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="quantity"
                        type="number"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Sizes />
            <Colors />
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-black disabled:opacity-70 dark:bg-white">
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
