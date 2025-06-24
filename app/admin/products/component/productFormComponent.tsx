"use client";
import request from "@/app/api/client/request";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { debug } from "console";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import Discount from "./discount";
import { formatToCurrency } from "@/app/utils/slugify";

interface ProductProps {
  product?: {
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
  mode?: "edit" | "add";
}
function ProductFormComponent({ product, mode = "add" }: ProductProps) {
  const { data } = useQuery({
    queryKey: ["getVariant"],
    queryFn: () => request.Product.getVariant(),
  });

  const [categoryName, setCategoryName] = useState<{ categoryId: number }[]>(
    product?.productCategories || []
  );
  const [productName, setProductName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [productVariants, setProductVariants] = useState<
    { sizeId: number; colorId: number; stock: number }[]
  >(product?.productVariants || []);
  const [imageUrls, setImageUrls] = useState<{ imageUrl: string }[]>(
    product?.images || []
  );
  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategoryName(product.productCategories || []);
      setImageUrls(product.images || []);
      setProductVariants(product.productVariants || []);
    }
  }, [product]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const { mutate: addProduct } = useMutation({
    mutationFn: (values: any) => request.Product.add(values),
    onSuccess: (data) => console.log("Product added:", data),
    onError: (err: AxiosError) => console.error(err),
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: (values: any) => request.Product.update(product?.id, values),
    onSuccess: (data) => console.log("Product updated:", data),
    onError: (err: AxiosError) => console.error(err),
  });

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setCategoryName(value.map((id) => ({ categoryId: id })));
  };
  const getSelectedCategoryIds = () => categoryName.map((c) => c.categoryId);
  console.log(product, "product");
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-8">
      <Typography variant="h5" className="mb-6 font-semibold text-gray-800">
        {mode === "edit" ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
      </Typography>

      <div className="flex flex-col gap-6">
        <TextField
          variant="standard"
          label="Ürün Adı"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
        />

        <TextField
          variant="standard"
          label="Ürün Fiyatı"
          value={formatToCurrency(price)}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />

        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Ürün Açıklaması"
          className="border border-gray-300 p-2 rounded-md w-full"
        />

        <FormControl fullWidth variant="standard">
          <InputLabel id="cat-select-label">Kategoriler</InputLabel>
          <Select
            labelId="cat-select-label"
            multiple
            value={getSelectedCategoryIds()}
            onChange={handleChange}
            renderValue={(selected) =>
              data?.categories
                ?.filter((item: any) => selected.includes(item.id))
                .map((item: any) => item.name)
                .join(", ")
            }
          >
            {data?.categories?.map((item: any) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={getSelectedCategoryIds().includes(item.id)}
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {productVariants?.map((variant, index) => (
          <div key={index} className="flex gap-5">
            <FormControl fullWidth variant="outlined">
              <InputLabel id={`beden-label-${index}`}>Beden</InputLabel>
              <Select
                labelId={`beden-label-${index}`}
                id={`beden-select-${index}`}
                value={variant.sizeId}
                onChange={(e) => {
                  const updated = [...productVariants];
                  updated[index].sizeId = Number(e.target.value);
                  setProductVariants(updated);
                }}
                label="Beden" // bu önemli!
              >
                {data?.sizes?.map((s: any) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel id={`color-label-${index}`}>Renk</InputLabel>
              <Select
                labelId={`color-label-${index}`}
                id={`color-select-${index}`}
                value={variant.colorId}
                onChange={(e) => {
                  const updated = [...productVariants];
                  updated[index].colorId = Number(e.target.value);
                  setProductVariants(updated);
                }}
                label="Color"
              >
                {data?.colors?.map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="standard"
              type="number"
              label="Stok"
              value={variant.stock}
              onChange={(e) => {
                const updated = [...productVariants];
                updated[index].stock = Number(e.target.value);
                setProductVariants(updated);
              }}
              fullWidth
            />
            <div className="self-center">
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  const updated = [...productVariants];
                  updated.splice(index, 1);
                  setProductVariants(updated);
                }}
              >
                Sil
              </Button>
            </div>
          </div>
        ))}

        <Button
          onClick={() =>
            setProductVariants([
              ...productVariants,
              { sizeId: 0, colorId: 0, stock: 0 },
            ])
          }
        >
          Stok Ekle
        </Button>

        <Button
          component="label"
          variant="contained"
          size="small"
          className="w-1/3"
        >
          <VisuallyHiddenInput
            type="file"
            multiple
            onChange={async (event) => {
              const files = event.target.files;
              if (files) {
                const base64Files = await Promise.all(
                  Array.from(files).map((file) => convertToBase64(file))
                );
                setImageUrls((prev) => [
                  ...prev,
                  ...base64Files.map((b64) => ({ imageUrl: b64 })),
                ]);
              }
            }}
          />
          Görsel Yükle
        </Button>

        <div className="flex flex-wrap gap-2">
          {imageUrls.map((img, index) => (
            <div key={index} className="flex flex-col">
              <button
                className="flex self-center hover:cursor-pointer text-2xl text-red-600"
                onClick={() => {
                  const updated = [...imageUrls];
                  updated.splice(index, 1);
                  setImageUrls(updated);
                }}
              >
                x
              </button>
              <img
                src={img.imageUrl}
                alt={`upload-${index}`}
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          ))}
        </div>
        {mode === "edit" ? (
          <div className="flex justify-between items-center mt-6">
            <Discount productId={product?.id} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const payload = {
                  name: productName,
                  price,
                  productCategories: categoryName,
                  images: imageUrls,
                  description,
                  productVariants: productVariants,
                };
                updateProduct(payload);
              }}
            >
              Güncelle
            </Button>
          </div>
        ) : (
          <div className="flex justify-end items-center mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const payload = {
                  name: productName,
                  price,
                  productCategories: categoryName,
                  images: imageUrls,
                  description,
                  productVariants: productVariants,
                };
                addProduct(payload);
              }}
            >
              Yeni Ürün ekle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductFormComponent;
