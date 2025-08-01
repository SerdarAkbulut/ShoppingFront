"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../store/store";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "../../../api/client/request";
import { updateCart } from "../../../components/updateCart";
import { setOrder } from "app/store/order/orderSlice";
import { setAnonOrder } from "app/store/anonOrder/anonOrderSlice";

function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { refetch } = updateCart();
  const dispatch = useDispatch();
  const anontoken = localStorage.getItem("anonToken");
  const { mutate: addItemToCart } = useMutation({
    mutationFn: ({
      productId,
      quantity,
      colorId,
      sizeId,
    }: {
      productId: number;
      quantity: number;
      colorId: number;
      sizeId: number;
    }) => request.Cart.addItem(productId, quantity, colorId, sizeId),
    onSuccess: () => refetch(),
  });
  const { mutate: deleteItemToCart } = useMutation({
    mutationFn: ({
      productId,
      quantity,
      colorId,
      sizeId,
    }: {
      productId: number;
      quantity: number;
      colorId: number;
      sizeId: number;
    }) => request.Cart.deleteItem(productId, quantity, colorId, sizeId),
    onSuccess: () => refetch(),
  });
  const totalPrice = cart?.cartItems.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    dispatch(
      setOrder({ orderProducts: cart?.cartItems, orderTotal: totalPrice })
    );
    if (anontoken) {
      dispatch(
        setAnonOrder({
          OrderItems: cart?.cartItems,
          anonOrderTotal: totalPrice,
        })
      );
    }
  }, [totalPrice]);

  return (
    <div className="flex w-full  items-center justify-center bg-gray-100">
      <div className="bg-white p-8  shadow-lg w-full max-w-2xl">
        {cart?.cartItems.map((item: any, index: any) => (
          <div
            key={item.productId + index}
            className="grid grid-cols-4 p-4 mb-4 bg-cyan-100  shadow-sm"
          >
            <div className="text-lg font-medium text-gray-700 flex items-center">
              {item.name}
            </div>
            <div className="text-lg font-medium text-gray-700 flex items-center">
              {item.color.name} / {item.size.name}
            </div>
            <div className="text-gray-600 flex items-center justify-center">
              {item.price} ₺
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Button
                className="px-2 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
                onClick={() =>
                  deleteItemToCart({
                    productId: item.productId,
                    quantity: 1,
                    colorId: item.color.id,
                    sizeId: item.size.id,
                  })
                }
                sx={{
                  ":hover": {
                    bgcolor: "inherit",
                  },
                  color: "red",
                }}
              >
                -
              </Button>
              <div className="w-6 text-center">{item.quantity}</div>
              <Button
                className="px-2 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
                onClick={() =>
                  addItemToCart({
                    productId: item.productId,
                    quantity: 1,
                    colorId: item.color.id,
                    sizeId: item.size.id,
                  })
                }
                sx={{
                  ":hover": {
                    bgcolor: "inherit",
                  },
                  color: "red",
                }}
              >
                +
              </Button>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-4">
          <div className="text-xl font-bold">Toplam Fiyat</div>
          <div className=" text-center ml-3 col-span-3">{totalPrice} ₺</div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
