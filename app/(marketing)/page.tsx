import Banners from "@/components/templates/Index/Banners";
import BestSellers from "@/components/templates/Index/BestSellers";
import Categories from "@/components/templates/Index/Categories";
import ChooseUs from "@/components/templates/Index/ChooseUs";
import { NewestProducts } from "@/components/templates/Index/NewestProducts";

export default function Home() {
  return (
    <div className="w-full">
      <Banners />

      <BestSellers />

      <Categories />

      <NewestProducts />

      <ChooseUs />
    </div>
  );
}
