import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

// i18n test: Translation keys should be detected below (German default)
// PRODUCT.SMARTPHONE.NAME -> "Smartphone"
// PRODUCT.WIRELESS_HEADPHONES.NAME -> "Kabellose Kopfhörer"
// PRODUCT.LAPTOP.NAME -> "Laptop"
// PRODUCT.SMARTWATCH.NAME -> "Smartwatch"
// PRODUCT.MY_OFFICE.NAME -> "Mein Büro"

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  public selectedProduct$ = this.selectedProductSubject.asObservable();

  private myProducts: Product[] = [
    {
      id: 1,
      nameId: 'PRODUCT.MY_OFFICE.NAME',
      descriptionId: 'PRODUCT.MY_OFFICE.DESCRIPTION',
      imageUrl: 'assets/pngs/Gruppe 22024.png',
      routerLink: '/my-office'
    },
    {
      id: 2,
      nameId: 'PRODUCT.MY_CLUB.NAME',
      descriptionId: 'PRODUCT.MY_CLUB.DESCRIPTION',
      imageUrl: 'assets/pngs/Gruppe 22024.png',
      routerLink: '/my-club'
    },
    {
      id: 3,
      nameId: 'PRODUCT.TAX.NAME',
      descriptionId: 'PRODUCT.TAX.DESCRIPTION',
      imageUrl: 'assets/pngs/Gruppe 22024.png',
      routerLink: '/my-tax'
    },
  ];

  getProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      observer.next(this.myProducts);
      observer.complete();
    });
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      const product = this.myProducts.find((p) => p.id === id);
      observer.next(product);
      observer.complete();
    });
  }

  selectProduct(product: Product | null): void {
    this.selectedProductSubject.next(product);
  }

  getSelectedProduct(): Product | null {
    return this.selectedProductSubject.value;
  }
}
