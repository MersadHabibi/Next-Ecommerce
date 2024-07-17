import Banners from "@/components/templates/(marketing)/Index/Banners";
import BestSellers from "@/components/templates/(marketing)/Index/BestSellers";
import Categories from "@/components/templates/(marketing)/Index/Categories";
import ChooseUs from "@/components/templates/(marketing)/Index/ChooseUs";
import { NewestProducts } from "@/components/templates/(marketing)/Index/NewestProducts";
import { prisma } from "@/lib/utils";
import { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
}

const getProductsAndCategories = cache(async function () {
  return await Promise.all([
    prisma.product.findMany({
      include: {
        Category: true,
      },
    }),
    prisma.category.findMany(),
  ]);
});

export default async function Home() {
  const [products, categories] = await getProductsAndCategories();

  return (
    <div className="w-full">
      <Banners />

      <BestSellers products={products} />

      <Categories categories={categories} />

      <NewestProducts products={products} />

      <ChooseUs />
    </div>
  );
}
