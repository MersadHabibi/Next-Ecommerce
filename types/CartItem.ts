import { Product } from "./Product";

export type CartItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  color: string;
  size: number;
  productId: string;
  Product: Product;
  userId: string;
};
