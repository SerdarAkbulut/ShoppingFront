import { useQuery } from "@tanstack/react-query";
import request from "../api/client/request";
import { useEffect } from "react";
import { store } from "../store/store";
import { setcart } from "../store/cart/cartSlice";

export const updateCart = () => {
  const { data, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: request.Cart.get,
  });

  useEffect(() => {
    if (data) {
      store.dispatch(setcart(data));
    }
  }, [data]);

  return { refetch };
};
