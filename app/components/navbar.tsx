"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import request from "../api/client/request";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/categoy/categorySlice";
import { RootState } from "../store/store";
import { slugify } from "../utils/slugify";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.category);
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => request.Category.list(),
  });
  const { mutate } = useMutation({
    mutationFn: ({ id, page }: { id: number; page: number }) =>
      request.Product.getByCategory(id, page),
  });
  const handleSelectCategory = (id?: number, catName?: string) => {
    if (id === undefined && catName === undefined) {
      router.push("/urunler");
    } else {
      router.push(`/urunler/${slugify(catName)}-${id}/sayfa/${1}`);
    }
  };

  return (
    <div className="bg-amber-300 flex gap-5 justify-center p-3 shadow-sm">
      <Button
        variant="text"
        color="inherit"
        className="flex gap-5 text-base"
        sx={{
          ":hover": { backgroundColor: "#f0a51a" },
          textTransform: "none",
          ...(category === "Tüm Ürünler" && { backgroundColor: "#f0a51a" }),
        }}
        onClick={() => {
          handleSelectCategory();
          dispatch(setCategory("Tüm Ürünler"));
        }}
      >
        Tüm Ürünler
      </Button>
      {data?.map((item: any) => {
        return (
          <Button
            variant="text"
            color="inherit"
            className="flex gap-5 text-base"
            sx={{
              ":hover": { backgroundColor: "#f0a51a" },
              textTransform: "none",
              ...(category === item.name && { backgroundColor: "#f0a51a" }),
            }}
            key={item.id}
            onClick={() => {
              mutate({ id: item.id, page: 1 });
              handleSelectCategory(item.id, item.name);
              dispatch(setCategory(item.name));
            }}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}

export default Navbar;
