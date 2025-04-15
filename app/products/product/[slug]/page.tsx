import request from "@/app/api/client/request";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function fetchProduct(id: number) {
  const product = await request.Product.details(id);
  return product;
}

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const product = await fetchProduct(1);
  return {
    title: `${product.name} `,
    description: ` ${product.name}`,
    openGraph: {
      title: `${product.name} `,
      description: ` ${product.name}`,
      images: product.images?.map((image) => image.imageUrl),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProduct(Number(1));
  if (!product) return notFound();

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4 text-gray-700">{product.description}</p>
      <img
        src={product.images?.[0]?.imageUrl}
        alt={product.name}
        className="mt-6 rounded"
      />
      <p className="text-xl font-semibold mt-4">{product.price} ₺</p>
    </div>
  );
}
