"use client";
import ProductCard from "@/app/components/product-card";
import { getProductsByCategory } from "@/app/hooks/products/useProducts";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
function GetCatProducts({
  id,
  page,
  catName,
}: {
  id: number;
  page: number;
  catName: string;
}) {
  const { data, isLoading, isError, error } = getProductsByCategory(id, page);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/urunler/${catName}-${id}/sayfa/${page}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5 mx-8 2xl:mx-52 xl:mx-44 lg:mx-32 md:mx-24 sm:mx-16">
        {data?.map((item: any) => (
          <div key={item.id}>
            <ProductCard
              name={item.name}
              price={item.price}
              productId={item.id}
              productImages={item.images}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button onClick={() => handlePageChange(Math.max(1, page - 1))}>
          Geri
        </Button>
        <Button onClick={() => handlePageChange(page + 1)}>İleri</Button>
      </div>
    </>
  );
}

export default GetCatProducts;
