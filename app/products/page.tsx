"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import request from "../api/client/request";
import ProductCard from "../components/product-card";

function ProductsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => request.Product.list(),
  });
  return (
    <>
      <div className=" grid grid-cols-4 gap-5 mt-5 mx-52">
        {data?.map((item: any, index: any) => (
          <div key={item.id + index}>
            <ProductCard
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
