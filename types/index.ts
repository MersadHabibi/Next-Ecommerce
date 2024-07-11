import { ORDER_STATUS, USER_ROLE } from "@/enums";

export type TUser = {
  id: string;
  role: USER_ROLE;
  username: string;
  password: string;
};

export type TProduct = {
  id: string;
  title: string;
  price: string;
  description: string;
  colors: string[];
  sizes: number[];
  quantity: number;
  mainImage: string;
  images: string[];
  gender: string;
  sales: number | null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  Category: TCategory;
};

export type TCategory = {
  id: string;
  title: string;
  image: string;
};

export type TCartItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  color: string;
  size: number;
  productId: string;
  Product: TProduct;
  userId: string;
};

export type TOrder = {
  OrderItems: TOrderItem[];
} & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: ORDER_STATUS | string;
  address: string;
  totalPrice: string;
  userId: string;
};

export type TOrderItem = {
  id: string;
  orderId: string;
  quantity: number;
  color: string;
  size: number;
  productId: string;
  Product: {
    id: string;
    title: string;
    price: string;
    description: string;
    colors: string[];
    sizes: number[];
    quantity: number;
    mainImage: string;
    images: string[];
    gender: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
