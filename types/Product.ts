import { Category } from "./Category";

export type Product = {
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
  Category: Category;
};
