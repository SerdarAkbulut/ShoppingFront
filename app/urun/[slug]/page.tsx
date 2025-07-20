import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "../components/ProductDetailClient";
import { getFetchProductDetails } from "app/hooks/products/useProducts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [Id] = slug.split("-");
  const productId = Number(Id);

  if (isNaN(productId)) return {};

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
    keywords: [
      product.name,
      product.description,
      "Famelin",
      "Famelin Ürünleri",
      "Famelin Ürün Detayları",
      "Famelin Ürün İncelemesi",
      "Famelin Ürün Açıklaması",
    ],
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [Id] = slug.split("-");
  const productId = Number(Id);

  if (isNaN(productId)) return notFound();

  const product = await getFetchProductDetails(productId);
  if (!product) return notFound();

  return (
    <div className="">
      <ProductDetailClient product={product} />
    </div>
  );
}
