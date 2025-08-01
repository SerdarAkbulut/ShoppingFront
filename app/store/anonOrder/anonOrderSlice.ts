import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnonOrderState {
  OrderItems: any[];
  anonAddress: {
    sehir: string;
    ilce: string;
    sokak: string;
    cadde: string;
    fullAddress: string;
    ad: string;
    soyad: string;
    email?: string;
    phone: string;
    apartmanNo: string;
    daireNo: string;
  };
  anonOrderTotal: number | null;
  card: {
    CardHolderName: string;
    cardNumber: string;
    expireYear: string;
    expireMonth: string;
    cvc: string;
    installment: string;
  };
}
const initialState: AnonOrderState = {
  OrderItems: [],
  anonAddress: {
    sehir: "",
    ilce: "",
    sokak: "",
    cadde: "",
    fullAddress: "",
    ad: "",
    soyad: "",
    email: "",
    phone: "",
    apartmanNo: "",
    daireNo: "",
  },
  anonOrderTotal: null,
  card: {
    CardHolderName: "",
    cardNumber: "",
    expireYear: "",
    expireMonth: "",
    cvc: "",
    installment: "",
  },
};
export const anonOrderSlice = createSlice({
  name: "anonOrder",
  initialState,
  reducers: {
    setAnonOrder: (state, action: PayloadAction<Partial<AnonOrderState>>) => {
      if (action.payload.OrderItems) {
        state.OrderItems = action.payload.OrderItems;
      }
      if (action.payload.anonAddress) {
        state.anonAddress = action.payload.anonAddress;
      }
      if (action.payload.anonOrderTotal !== undefined) {
        state.anonOrderTotal = action.payload.anonOrderTotal;
      }
      if (action.payload.card) {
        state.card = action.payload.card;
      }
    },
  },
});
export const { setAnonOrder } = anonOrderSlice.actions;
export default anonOrderSlice.reducer;
