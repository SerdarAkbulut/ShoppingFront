import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "../components/ProductDetailClient";
import { getFetchProductDetails } from "@/app/hooks/products/useProducts";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const [Id] = slug.split("-");
  const productId = Number(Id);

  if (isNaN(productId)) return {};
  debugger;

  const product = await getFetchProductDetails(productId);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.map(
        (image: { imageUrl: string }) => image.imageUrl
      ),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: any }) {
  const { slug } = await params;
  const [Id] = slug.split("-");
  const productId = Number(Id);
  if (isNaN(productId)) return notFound();

  const product = await getFetchProductDetails(productId);
  if (!product) return notFound();

  return (
    <div>
      <ProductDetailClient product={product} />
    </div>
  );
}
