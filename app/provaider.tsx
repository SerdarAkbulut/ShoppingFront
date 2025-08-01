"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootState, store } from "./store/store";
import { setcart } from "./store/cart/cartSlice";
import { setToken } from "./store/token/tokenSlice";
import { setRole } from "./store/role/roleSlice";
import { getCart } from "./hooks/cart/useCart";
import { getUserLogin } from "./hooks/user/useUser";
import { setAnonToken } from "./store/anonToken/anonTokenSlice";

const queryClient = new QueryClient();

const CartFetcher: React.FC = () => {
  const token = localStorage.getItem("token");
  const anonToken = localStorage.getItem("anonToken");
  setToken(token);

  const dispatch = useDispatch();
  const { data: user } = getUserLogin();

  const { data: cart } = getCart();
  useEffect(() => {
    if ((!token && !anonToken) || anonToken === "undefined") {
      localStorage.setItem("anonToken", user?.token);
      dispatch(setAnonToken(user?.token));
    }
    if (cart) {
      dispatch(setcart(cart));
    }
  }, [cart, dispatch, user, token, anonToken]);

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
