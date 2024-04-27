export type Order = {
  OrderItems: OrderItem[];
} & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
  isCanceled: boolean;
  address: string;
  totalPrice: string;
  userId: string;
};

export type OrderItem = {
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
