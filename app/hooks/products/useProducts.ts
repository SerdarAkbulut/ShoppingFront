import { useMutation, useQuery } from "@tanstack/react-query";
import request from "app/api/client/request";
import { toast } from "react-toastify";

export const getProducts = (page: number) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => request.Product.list(page),
    staleTime: Infinity,
  });
};

export async function getFetchProductDetails(id: number) {
  try {
    const res = await fetch(
      `https://api.famelinmodayazici.com.tr/api/products/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;
    const product = await res.json();
    return product;
  } catch (error) {
    console.error("fetchProduct error:", error);
    return null;
  }
}
export const getUserPrevOrders = () => {
  return useQuery({
    queryKey: ["PrevOrders"],
    queryFn: () => request.Order.getPrevOrders(),
  });
};
export const getProductsByCategory = (id: number, page: number) => {
  return useQuery({
    queryKey: ["productCategory", id],
    queryFn: () => request.Product.getByCategory(id, page),
  });
};
export async function getFetchProductsByCategory(
  categoryId: number,
  page: number
) {
  try {
    const res = await fetch(
      `https://api.famelinmodayazici.com.tr/api/products/category/${categoryId}/${page}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const product = await res.json();
    return product;
  } catch (error) {
    console.error("fetchProduct error:", error);
    return null;
  }
}

export const useSearchProducts = (q: string, page: any) => {
  return useQuery({
    queryKey: ["searchProducts", q], // q'yu ekle
    queryFn: () => request.Product.getBySearch(q, page),
    enabled: Boolean(q),
    staleTime: Infinity,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => request.Category.list(),
  });
};

export const getProductsForAdmin = () => {
  return useQuery({
    queryKey: ["adminProducts"],
    queryFn: () => request.Product.getProductsForAdmin(),
    staleTime: Infinity,
  });
};
export const addBestSellers = () => {
  return useMutation({
    mutationFn: (productId: number) =>
      request.Product.addBestSellers(productId),
    onSuccess: () => {
      toast.success("Başarıyla eklendi");
    },
  });
};

export const getInstallmentOptions = (bin: string, price: string) => {
  return useQuery({
    queryKey: ["installmentOptions", bin, price], // sorgunun benzersiz anahtarı
    queryFn: () => request.Order.getInstallments({ bin, price }), // sorguyu yapan fonksiyon
  });
};

export const getBestSellers = () => {
  return useQuery({
    queryKey: ["bestSellers"],
    queryFn: () => request.Product.getBestSellers(),
    staleTime: Infinity,
  });
};

export const addDiscount = () => {
  return useMutation({
    mutationFn: ({
      productId,
      discount,
    }: {
      productId: number;
      discount: string;
    }) => request.Product.addDiscount(productId, discount),
    onSuccess: () => {
      toast.success("İndirim başarıyla eklendi");
    },
  });
};

export const getColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: () => request.Product.getColors(),
  });
};
export const getSizes = () => {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: () => request.Product.getSizes(),
  });
};
