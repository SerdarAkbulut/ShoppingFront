"use client";
import ProductCard from "@/app/components/product-card";
import { useSearchProducts } from "@/app/hooks/products/useProducts";
import React from "react";

function SearchComponent({ q }: { q: string }) {
  const { data, isLoading, isError } = useSearchProducts(q);
  console.log(data);
  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Bir hata oluştu.</div>;
  return (
    <>
      {data.map((items: any, index: number) => (
        <ProductCard
          name={items.name}
          price={items.price}
          productId={items.id}
          key={index}
          productImages={items.images}
        />
      ))}
    </>
  );
}

export default SearchComponent;
