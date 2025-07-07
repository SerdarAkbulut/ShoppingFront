"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getUserPrevOrders } from "app/hooks/products/useProducts";
function PrevOrders() {
  const { data, isLoading, isError, error } = getUserPrevOrders();

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Hata: {String(error)}</div>;
  const renderProducts = (rowData: any) => {
    return rowData.orderItems?.map((item: any, index: number) => {
      const isLastItem = index === rowData.orderItems.length - 1;

      return (
        <div key={index}>
          <span
            className={` pr-5 ${!isLastItem ? "border-b border-red-200" : ""}`}
          >
            {item.name}
          </span>
        </div>
      );
    });
  };
  const renderProductQuantity = (rowData: any) => {
    return rowData.orderItems?.map((item: any, index: number) => {
      return (
        <div
          key={index}
          className="flex flex-col gap-2 justify-start items-start"
        >
          {item.quantity}
        </div>
      );
    });
  };

  return (
    <div className=" mt-20 bottom-0 flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-2xl ml-2">Siparişlerim</h1>
        <DataTable value={data} paginator rows={5}>
          <Column body={renderProducts} header="Ürünler" />
          <Column body={renderProductQuantity} header="Adet" />
          <Column field="subTotal" header="Toplam Fiyat" />
        </DataTable>
      </div>
    </div>
  );
}

export default PrevOrders;
