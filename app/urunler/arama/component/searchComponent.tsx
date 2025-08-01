"use client";

import { Button } from "@mui/material";
import ProductCard from "app/components/product-card";
import { useSearchProducts } from "app/hooks/products/useProducts";
import { useRouter } from "next/navigation";
import React from "react";

function SearchComponent({ q, page }: { q: string; page: any }) {
  const { data, isLoading, isError } = useSearchProducts(q, page);
  const router = useRouter();
  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Bir hata oluştu.</div>;
  const handlePageChange = (page: number) => {
    router.push(`/urunler/arama/${page}?q=${q}`);
  };
  return (
    <div>
      <div className="grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5 mx-8 2xl:mx-52 xl:mx-44 lg:mx-32 md:mx-24 sm:mx-16">
        {data?.products?.map((items: any, index: number) => (
          <ProductCard
            name={items.name}
            price={items.price}
            productId={items.id}
            key={index}
            productImages={items.images}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Geri
        </Button>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data?.hasNextPage}
        >
          İleri
        </Button>
      </div>
    </div>
  );
}

export default SearchComponent;
