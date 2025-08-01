import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counter/counterSlice";
import { cartSlice } from "./cart/cartSlice";
import tokenSlice from "./token/tokenSlice";
import roleSlice from "./role/roleSlice";
import { orderSlice } from "./order/orderSlice";
import { categorySlice } from "./categoy/categorySlice";
import anonTokenSlice from "./anonToken/anonTokenSlice";
import { anonOrderSlice } from "./anonOrder/anonOrderSlice";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    token: tokenSlice.reducer,
    role: roleSlice.reducer,
    order: orderSlice.reducer,
    category: categorySlice.reducer,
    anonToken: anonTokenSlice.reducer,
    anonOrderSlice: anonOrderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
