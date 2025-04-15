export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  isActive: boolean;
  imageUrl?: string;
  stock?: number;
}
