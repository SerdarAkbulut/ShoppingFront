import { get } from "http";
import React from "react";
import { getBestSellers } from "../hooks/products/useProducts";
import ProductCard from "./product-card";

function BestSeller() {
  const { data } = getBestSellers();
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 ">
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

export default BestSeller;
