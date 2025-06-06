"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ProductImage from "./productImage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import request from "@/app/api/client/request";

import { updateCart } from "@/app/components/updateCart";
import { toast } from "react-toastify";

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const { refetch } = updateCart();
  const uniqueColors = [
    ...new Map(
      product.productVariants.map((v: any) => [v.color.id, v.color])
    ).values(),
  ];
  const { mutate } = useMutation({
    mutationFn: ({
      productId,
      quantity,
      renk,
      beden,
    }: {
      productId: number;
      quantity: number;
      renk: number;
      beden: number;
    }) => request.Cart.addItem(productId, quantity, renk, beden),
    onSuccess: () => {
      refetch();
      setSelectedColorId("");
      setSelectedSizeId("");
      toast.success("Ürün sepete eklendi", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "colored",
      });
    },
  });
  const sizesForSelectedColor = product.productVariants
    .filter((v: any) => v.color.id === selectedColorId)
    .map((v: any) => v.size);
  return (
    <div className="px-4 py-8 bg-[#FFF8F0] mx-auto  rounded-lg shadow-lg mt-10 w-full md:w-3/4 xl:w-1/2 ">
      <h1 className="text-4xl font-semibold text-center text-black ">
        {product.name}
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8   mt-5">
        <div className=" flex flex-col items-center  ">
          <ProductImage images={product.images} />
          <div className=" ">
            <div className="lg:grid lg:grid-cols-5    mt-5 ">
              <div className="flex flex-col lg:flex-row w-full  col-span-4  gap-4">
                <FormControl fullWidth>
                  <InputLabel>Renk</InputLabel>
                  <Select
                    value={selectedColorId}
                    label="Renk"
                    onChange={(e) => {
                      setSelectedColorId(e.target.value);
                      setSelectedSizeId(""); // beden sıfırlanır
                    }}
                  >
                    {uniqueColors.map((color: any) => (
                      <MenuItem key={color.id} value={color.id}>
                        {color.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Beden</InputLabel>
                  <Select
                    value={selectedSizeId}
                    label="Beden"
                    onChange={(e) => setSelectedSizeId(e.target.value)}
                    disabled={!selectedColorId} // Renk seçilmemişse kapalı
                  >
                    {!selectedColorId ? (
                      <MenuItem disabled value="">
                        Lütfen önce bir renk seçin
                      </MenuItem>
                    ) : (
                      sizesForSelectedColor.map((size: any, index: number) => (
                        <MenuItem key={index} value={size.id}>
                          {size.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </div>
              <span className=" text-3xl font-bold   text-gray-900 text-center self-center">
                {product.price} ₺
              </span>
            </div>
            <p className="mt-4 text-gray-600 text-lg">{product.description}</p>
            <div className="mt-6 flex  justify-end">
              <button
                className="w-1/3 bg-[#FFFAE5]
         text-[#5A3E36] 
         font-bold p-[5px] 
         rounded-md border-2 border-[#D2B48C]
          hover:cursor-pointer hover:bg-[#FFD700]
          transition-all duration-500 ease-in-out
         
          "
                color="inherit"
                onClick={() =>
                  mutate({
                    productId: product.id,
                    quantity: 1,
                    renk: parseInt(selectedColorId),
                    beden: parseInt(selectedSizeId),
                  })
                }
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
