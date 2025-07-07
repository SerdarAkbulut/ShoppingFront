"use client";

import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import ProductFormComponent from "../component/productFormComponent";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  product?: ProductProps;
}
interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    productCategories: { categoryId: number; id: number }[];
    images: { imageUrl: string; id: number }[];
    productVariants: {
      sizeId: number;
      colorId: number;
      stock: number;
      id: number;
    }[];
  };
}

function EditProduct({ open, onClose, product }: SimpleDialogProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: {
            width: "100%",
            maxWidth: "900px",
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
