import Banners from "@/components/templates/Index/Banners";
import BestSellers from "@/components/templates/Index/BestSellers";
import Categories from "@/components/templates/Index/Categories";
import { NewestProducts } from "@/components/templates/Index/NewestProducts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container w-full">
      <Banners />

      <BestSellers />

      <Categories />

      <NewestProducts/>
    </div>
  );
}
