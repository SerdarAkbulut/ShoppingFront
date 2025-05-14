"use client";
import React from "react";
import ProductCard from "../components/product-card";
import { getProducts } from "../hooks/products/useProducts";
import { JsonLdProductList } from "../JsonLd/JsonLdProducts";

function ProductsPage() {
  const { data, isLoading, isError, error } = getProducts();
  if (isLoading) return <p>Yükleniyor...</p>;
  if (isError) return <p>Hata: {error.message}</p>;
  return (
    <>
      <JsonLdProductList />
      <div className=" grid grid-cols-5 gap-5 mt-5 mx-52">
        {data?.map((item: any, index: any) => (
          <div key={item.id + index}>
            <ProductCard
              productId={item.id}
              name={item?.name}
              price={item?.price}
              productImages={item.images}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
