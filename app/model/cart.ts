export interface CartItem {
  productId: number;
  name: string;
  price: number;
  color: {
    id: number;
    name: string;
  };
  size: {
    id: number;
    name: string;
  };
  quantity: number;
}

export interface Cart {
  cartId: number;
  customerId: string;
  cartItems: CartItem[];
}
