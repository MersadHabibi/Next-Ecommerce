import Banners from "@/components/templates/Index/Banners";
import BestSellers from "@/components/templates/Index/BestSellers";
import Categories from "@/components/templates/Index/Categories";
import ChooseUs from "@/components/templates/Index/ChooseUs";
import { NewestProducts } from "@/components/templates/Index/NewestProducts";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();

  const products = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });

  const categories = await prisma.category.findMany({});

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
