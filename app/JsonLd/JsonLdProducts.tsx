"use client";
import React from "react";
import {
  getProducts,
  getProductsByCategory,
} from "../hooks/products/useProducts";
import { slugify } from "../utils/slugify";

export const JsonLdProductList = () => {
  const { data } = getProducts();

  if (!data || data.length === 0) return null;

  const structuredData = data.map((product: any) => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((item: any) => item.imageUrl.replace(" ", "")),

    description: product.description || "Açıklama bulunmamaktadır.",
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export const JsonLdProductsByCategory = ({
  props,
}: {
  props: { catId: number; page: number };
}) => {
  const { catId, page } = props;

  const { data } = getProductsByCategory(catId, page);

  if (!data || !data.length) return null;

  const structuredData = data.map((product: any) => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: "Famelin",
    },
    image: product.images?.map((item: any) => item.imageUrl.replace(/\s/g, "")),
    description: product.description || "Açıklama bulunmamaktadır.",
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `/urun/${product.id}-${slugify(product.name)}`,
      seller: {
        "@type": "Organization",
        name: "Famelin Moda Yazıcı",
        url: `https://www.famelimmodayazici.com/urun/${product.id}-${slugify(
          product.name
        )}`,
      },
    },
  }));

  // Script etiketi ile ekleniyor
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};
