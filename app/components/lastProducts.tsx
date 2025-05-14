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
    <div className="grid grid-cols-5 gap-4 ">
      {data?.map((item: any) => (
        <ProductCard
          name={item.name}
          price={item.price}
          productImages={item.images}
          productId={item.id}
          key={item.id}
        ></ProductCard>
      ))}
    </div>
  );
}

export default LastProducts;
