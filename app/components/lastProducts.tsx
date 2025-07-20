import { useQuery } from "@tanstack/react-query";
import React from "react";
import request from "../api/client/request";
import ProductCard from "./product-card";

function LastProducts() {
  const { data } = useQuery({
    queryKey: ["lastProducts"],
    queryFn: () => request.Product.getLastProducts(),
  });
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
      {data?.map((item: any) => (
        <ProductCard
          name={item.name}
          price={item.price}
          productImages={item.images}
          productId={item.id}
          key={item.id}
          discount={item.discount}
        ></ProductCard>
      ))}
    </div>
  );
}

export default LastProducts;
