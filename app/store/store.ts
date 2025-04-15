import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counter/counterSlice";
import { cartSlice } from "./cart/cartSlice";
import tokenSlice from "./token/tokenSlice";
import roleSlice from "./role/roleSlice";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    token: tokenSlice.reducer,
    role: roleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
