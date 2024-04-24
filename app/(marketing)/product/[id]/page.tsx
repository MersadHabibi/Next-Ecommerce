import Details from "@/components/templates/Product/Details";
import Gallery from "@/components/templates/Product/Gallery";
import Loading from "../../loading";
import { PrismaClient } from "@prisma/client";
import { Product } from "@/types/Product";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  let product: Product | null = null;
  try {
    const prisma = new PrismaClient();

    product = await prisma.product.findFirst({
      where: {
        id: params.id,
      },
      include: {
        Category: true,
      },
    });
  } catch (error) {
    notFound();
  }


  return (
    <div className="flex flex-col gap-8 pt-10 lg:flex-row xl:gap-x-10">
      <div className="w-full">
        <Gallery product={product as Product} />
      </div>
      <div className="w-full pt-5 xl:pt-8">
        <Details product={product as Product} />
      </div>
    </div>
  );
}
