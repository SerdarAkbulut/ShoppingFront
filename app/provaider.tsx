"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { store } from "./store/store";
import { setcart } from "./store/cart/cartSlice";
import { setToken } from "./store/token/tokenSlice";
import request from "./api/client/request";
import { setRole } from "./store/role/roleSlice";

const queryClient = new QueryClient();

const CartFetcher: React.FC = () => {
  const dispatch = useDispatch();

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: request.Cart.get,
  });

  useEffect(() => {
    if (cart) {
      dispatch(setcart(cart));
    }
  }, [cart, dispatch]);

  return null;
};

const ClientProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      store.dispatch(setToken(token));
      store.dispatch(setRole(role));
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CartFetcher />
        {children}
      </QueryClientProvider>
    </Provider>
  );
};

export default ClientProviders;
