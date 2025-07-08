import { Injectable, computed, signal } from '@angular/core';
import { ShoppingCartItem } from '../models';
import { ProductName } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems = signal<ShoppingCartItem[]>([]);

  readonly totalQuantity = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  readonly items = computed(() => this.cartItems());

  readonly hasProduct = computed(
    () => (productName: ProductName) =>
      this.cartItems().some((item) => item.productName === productName),
  );

  /**
   * Add product to shopping cart
   * If product already exists, do not add duplicate (per requirement, each product can only be added once)
   */
  addProduct(productName: ProductName, price = 0): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(
      (item) => item.productName === productName,
    );

    if (!existingItem) {
      const newItem: ShoppingCartItem = {
        id: this.generateId(),
        productName,
        quantity: 1,
        price,
      };

      this.cartItems.set([...currentItems, newItem]);
      console.log(
        `Added ${productName} to cart. Total items: ${this.totalQuantity()}`,
      );
    } else {
      console.log(`${productName} is already in cart`);
    }
  }

  /**
   * Remove product from shopping cart
   */
  removeProduct(productName: ProductName): void {
    const currentItems = this.cartItems();
    const filteredItems = currentItems.filter(
      (item) => item.productName !== productName,
    );
    this.cartItems.set(filteredItems);
    console.log(
      `Removed ${productName} from cart. Total items: ${this.totalQuantity()}`,
    );
  }

  /**
   * Clear shopping cart
   */
  clearCart(): void {
    this.cartItems.set([]);
    console.log('Cart cleared');
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
