"use client";
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
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import Discount from "./discount";
import { toast } from "react-toastify";
import { convertToBase64, formatToCurrency } from "app/utils/slugify";
import request from "app/api/client/request";
import ProductVariantsTable from "./variants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { setOrder } from "app/store/order/orderSlice";

interface ProductProps {
  product?: any;
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
  const convertedPrice = product?.price.replace(".", "").replace(",", ".");
  const orderVariants = useSelector((state: RootState) => state.order.variants);

  const [productName, setProductName] = useState(product?.name || "");
  const [price, setPrice] = useState(convertedPrice || "");
  const [description, setDescription] = useState(product?.description || "");
  const [productVariants, setProductVariants] = useState<
    { sizeId: number; colorId: number; stock: number }[]
  >(product?.productVariants || orderVariants);
  const [imageUrls, setImageUrls] = useState<{ imageUrl: string }[]>(
    product?.images || []
  );
  console.log(productVariants, "product");

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(convertedPrice);
      setDescription(product.description);
      setCategoryName(product.productCategories || []);
      setImageUrls(product.images || []);
      setProductVariants(product.productVariants || []);
    } else {
      setProductVariants(orderVariants);
    }
  }, [product, orderVariants]);
  const dispatch = useDispatch();
  const { mutate: addProduct } = useMutation({
    mutationFn: (values: any) => request.Product.add(values),
    onSuccess: () => {
      toast.success("Ürün eklendi");
      setProductName("");
      setPrice("");
      setDescription("");
      setCategoryName([]);
      setImageUrls([]);
      setProductVariants([]);
      dispatch(setOrder({ variants: [] }));
    },
    onError: (err: AxiosError) => console.error(err),
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: (values: any) => request.Product.update(product?.id, values),
    onSuccess: () => {
      toast.success("Ürün Güncellendi");
    },
    onError: (err: AxiosError) => console.error(err),
  });

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setCategoryName(value.map((id) => ({ categoryId: id })));
  };
  const getSelectedCategoryIds = () => categoryName.map((c) => c.categoryId);
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
          type=""
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />
        <span>{formatToCurrency(price)}</span>

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

        <ProductVariantsTable productVariants={productVariants} />
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
              color="success"
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
