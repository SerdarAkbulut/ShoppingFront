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
    router.push(`/urunler/${catName}-${id}/sayfa/${page + 1}`);
  };
  return (
    <>
      <div className=" grid grid-cols-4 gap-5 mt-5 mx-52">
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
        <Button>Geri</Button>
        <Button onClick={() => handlePageChange(page)}>İleri</Button>
      </div>
    </>
  );
}

export default GetCatProducts;
