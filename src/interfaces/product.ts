export interface Product {
  id?: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
