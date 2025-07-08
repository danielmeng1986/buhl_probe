import { Component, inject } from '@angular/core';
import {
  IconText,
  IconType,
} from '../../shared/components/icon-text/icon-text';
import { TranslateModule } from '@ngx-translate/core';
import { ShoppingCartService } from '../../services';
import { CommonModule } from '@angular/common';

export type ProductName = 'My Office' | 'My Club' | 'My Landlord' | 'My Tax';

export interface ShoppingCartItem {
  id: string;
  productName: ProductName;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [IconText, TranslateModule, CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  readonly iconShoppingCart: IconType = 's-shopping-cart';
  readonly shoppingCartService = inject(ShoppingCartService);

  /**
   * Remove item from shopping cart
   */
  removeItem(productName: ProductName): void {
    this.shoppingCartService.removeProduct(productName);
  }

  /**
   * Clear shopping cart
   */
  clearCart(): void {
    this.shoppingCartService.clearCart();
  }
}
