import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Self-signed sertifika hatasını engelle (YALNIZCA LOCAL İÇİN GÜVENLİ)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function fetchProduct(slug: number) {
  const res = await fetch(`https://localhost:7277/api/products/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  const product = await res.json();
  return product;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProduct(Number(params.slug));
  if (!product) return {};

  return {
    title: `${product.name}`,
    description: `${product.name}`,
    openGraph: {
      title: `${product.name}`,
      description: `${product.name}`,
      images: product.images?.map(
        (image: { imageUrl: string }) => image.imageUrl
      ),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProduct(Number(params.slug));
  if (!product) return notFound();

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4 text-gray-700">{product.description}</p>
      {product.images?.[0]?.imageUrl && (
        <img
          src={product.images[0].imageUrl}
          alt={product.name}
          className="mt-6 rounded"
        />
      )}
      <p className="text-xl font-semibold mt-4">{product.price} ₺</p>
    </div>
  );
}
