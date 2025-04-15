"use client";

import { Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import ProductFormComponent from "../component/productFormComponent";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductProps;
}
interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  ProductCategories: { categoryId: number }[];
  Images: { ImageUrl: string }[];
  ProductVariants: { sizeId: number; colorId: number; stock: number }[];
}

function EditProduct({ open, onClose, product }: SimpleDialogProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg" // 'sm', 'md', 'lg', 'xl' gibi değerler alabilir
        PaperProps={{
          style: {
            width: "100%",
            maxWidth: "900px", // isteğe bağlı özel genişlik
          },
        }}
      >
        <div className="w-full">
          <DialogTitle>Ürün Düzenle</DialogTitle>
          <ProductFormComponent mode="edit" product={product} />
        </div>
      </Dialog>
    </div>
  );
}

export default EditProduct;
