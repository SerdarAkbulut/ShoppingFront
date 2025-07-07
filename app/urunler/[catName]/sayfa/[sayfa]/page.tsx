import React from "react";
import GetCatProducts from "../../component/getCatProducts";
import { Metadata } from "next";
import { getFetchProductsByCategory } from "app/hooks/products/useProducts";
// import { JsonLdProductsByCategory } from "@/app/JsonLd/JsonLdProducts";

type Props = {
  params: Promise<{ catName: string; sayfa: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { catName, sayfa } = await params;

  const parts = catName.split("-");
  const Id = parts.pop();
  const name = parts.join("-");
  debugger;
  const query = await getFetchProductsByCategory(Number(Id), Number(sayfa));
  const products = query?.products;

  if (!products || products.length === 0) return {};

  const firstProduct = products[0]; // Sadece ilk ürün baz alınır

  return {
    title: `${name} Fiyatları ve Modelleri `,
    description: ` en iyi ${parts} çeşitleri en ucuz ${parts} fiyatlari`,
    keywords: ` ${parts}, ${firstProduct.name} ucuz fiyat indirim kampanya`,
    authors: [
      {
        name: "famelinmodayazici",
        url: "https://www.instagram.com/famelinmodayazici/",
      },
    ],
    creator: "famelinmodayazici",
    publisher: "famelinmodayazici",

    openGraph: {
      title: firstProduct.name,
      description: firstProduct.description,
      images: firstProduct.images?.map(
        (image: { imageUrl: string }) => image.imageUrl
      ),
    },
    twitter: {
      title: firstProduct.name,
      description: firstProduct.description,
      images: firstProduct.images?.map(
        (image: { imageUrl: string }) => image.imageUrl
      ),
      card: "summary_large_image",
    },
  };
}

async function ProductCategory({ params }: { params: any }) {
  const { catName, sayfa } = await params;

  const parts = catName.split("-");
  const Id = parts.pop(); // Son eleman ID
  const name = parts.join("-"); // Geri kalanlar kategori ismi
  return (
    <>
      {/* <JsonLdProductsByCategory props={{ catId: Id, page: sayfa }} /> */}

      <GetCatProducts id={Id} page={Number(sayfa)} catName={name} />
    </>
  );
}

export default ProductCategory;
