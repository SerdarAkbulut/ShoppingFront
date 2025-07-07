import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  orderProducts: any[];
  orderAddress: number | null;
  orderTotal: number | null;
  orderPayment: {
    CardHolderName: string;
    cardNumber: string;
    expireYear: string;
    expireMonth: string;
    cvc: string;
    installment: string;
  };
}

const initialState: OrderState = {
  orderProducts: [],
  orderAddress: null,
  orderTotal: null,
  orderPayment: {
    CardHolderName: "",
    cardNumber: "",
    expireYear: "",
    expireMonth: "",
    cvc: "",
    installment: "",
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
      if (action.payload.orderProducts) {
        state.orderProducts = action.payload.orderProducts;
      }
      if (action.payload.orderAddress) {
        state.orderAddress = action.payload.orderAddress;
      }
      if (action.payload.orderTotal !== undefined) {
        state.orderTotal = action.payload.orderTotal;
      }
      if (action.payload.orderPayment) {
        state.orderPayment = action.payload.orderPayment;
      }
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
