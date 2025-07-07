import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "app/model/cart";

interface CartState {
  cart: Cart | null;
}
const initialState: CartState = {
  cart: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setcart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setcart } = cartSlice.actions;
