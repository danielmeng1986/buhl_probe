import { ProductName } from '../types';

export interface ShoppingCartItem {
  id: string;
  productName: ProductName;
  quantity: number;
  price: number;
}
