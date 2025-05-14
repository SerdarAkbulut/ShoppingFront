import request from "@/app/api/client/request";
import { useQuery } from "@tanstack/react-query";

export const getProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => request.Product.list(),
  });
};

export async function getFetchProductDetails(id: number) {
  try {
    const res = await fetch(`http://localhost:5034/api/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const product = await res.json();
    console.log(product);
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
      `http://localhost:5034/api/products/category/${categoryId}/${page}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const product = await res.json();
    console.log(product);
    return product;
  } catch (error) {
    console.error("fetchProduct error:", error);
    return null;
  }
}
