"use client";
import React, { useEffect } from "react";
import ProductCard from "../components/product-card";
import { getProducts } from "../hooks/products/useProducts";
// import { JsonLdProductList } from "../JsonLd/JsonLdProducts";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mui/material";

function ProductsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const page = parseInt(params.get("sayfa") || "1");
  const { data, isLoading, isError, error, refetch } = getProducts(page);

  const goToPage = (newPage: number) => {
    router.push(`?sayfa=${newPage}`);
  };
  useEffect(() => {
    refetch();
  }, [page]);
  if (isLoading) return <p>Yükleniyor...</p>;
  if (isError) return <p>Hata: {error.message}</p>;

  return (
    <>
      {/* <JsonLdProductList page={page} /> */}
      <div className="grid grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5 mx-8 2xl:mx-52 xl:mx-44 lg:mx-32 md:mx-24 sm:mx-16">
        {data?.products.map((item: any, index: any) => (
          <div key={index}>
            <ProductCard
              productId={item.id}
              name={item?.name}
              price={item?.price}
              productImages={item.images}
              discount={item?.discount}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex gap-5">
          <Button
            onClick={() => goToPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Geri
          </Button>
          <Button
            onClick={() => goToPage(page + 1)}
            disabled={!data.hasNextPage}
          >
            İleri
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
