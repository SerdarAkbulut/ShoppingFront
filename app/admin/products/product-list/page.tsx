"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "@/app/api/client/request";
import { Button } from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import EditProduct from "../edit-product/edit-product";

function AdminProductList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["AdminProductList"],
    queryFn: () => request.Product.list(),
  });
  const { mutate } = useMutation({
    mutationFn: (id: number) => request.Product.delete(id),
    onSuccess: refetch,
  });
  const [open, setOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState();
  const handleEdit = (rowData: any) => {
    setSelectProduct(rowData);
    setOpen(true);
  };

  const renderColors = (rowData: any) => {
    return rowData.productVariants?.map((item: any, index: number) => {
      const key = `${item.color}-${item.size}-${index}`; // benzersiz anahtar üretimi
      return (
        <div key={key} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="font-bold">Renk:</span>
            <span>{item.color}</span>
            <span className="font-bold">Beden:</span>
            <span>{item.size}</span>
            <span className="font-bold">Stok:</span>
            <span>{item.stock}</span>
          </div>
        </div>
      );
    });
  };

  const renderEditButton = (rowData: any) => {
    return (
      <div className="flex gap-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEdit(rowData)}
        >
          Düzenle
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => mutate(rowData.id)}
        >
          Sil
        </Button>
      </div>
    );
  };

  const renderCategories = (rowData: any) => {
    return rowData.productCategories?.map((cat: any) => (
      <div key={cat.id || cat.name}>{cat.name}</div>
    ));
  };

  const renderImages = (rowData: any) => {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        {rowData.images?.map((img: any, index: number) => (
          <img
            key={img.id || `${img.imageUrl}-${index}`}
            src={img.imageUrl}
            alt="Ürün görseli"
            width="50"
            height="50"
            style={{ objectFit: "cover" }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <DataTable
        value={data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="name" header="Ürün Adı" />
        <Column field="price" header="Fiyat" />
        <Column field="description" header="Açıklama" />
        <Column header="Renkler" body={renderColors} />
        <Column header="Kategoriler" body={renderCategories} />
        <Column header="Görseller" body={renderImages} />
        <Column header="" body={renderEditButton} />
      </DataTable>
      <div className="w-full">
        <EditProduct
          open={open}
          product={selectProduct}
          onClose={() => setOpen(false)}
        ></EditProduct>
      </div>
    </>
  );
}

export default AdminProductList;
