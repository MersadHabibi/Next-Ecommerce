import Details from "@/components/templates/(marketing)/Product/Details";
import Gallery from "@/components/templates/(marketing)/Product/Gallery";
import { prisma } from "@/lib/utils";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProduct = cache(async (id: string) => {
  return await Promise.all([
    prisma.product.findFirst({
      where: {
        id: id,
      },
      include: {
        Category: true,
      },
    }),
  ]);
});

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product] = await getProduct(params.id);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-8 pt-10 lg:flex-row xl:gap-x-10">
      <div className="w-full">
        <Gallery product={product} />
      </div>
      <div className="w-full pt-5 xl:pt-8">
        <Details product={product} />
      </div>
    </div>
  );
}
