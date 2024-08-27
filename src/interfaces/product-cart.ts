export interface ProductCart {
  id?: number;
  productId: number;
  cartId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
