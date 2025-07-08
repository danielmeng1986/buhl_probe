import { Component, OnInit, OnDestroy, inject, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconButton } from '../icon-button/icon-button';
import { CommonModule } from '@angular/common';
import {
  BreakpointService,
  ResponsiveImagePaths,
  ShoppingCartService,
} from '../../../services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductName } from '../../../types';

@Component({
  selector: 'app-hero-section',
  imports: [TranslateModule, IconButton, CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection implements OnInit, OnDestroy {
  imagePaths = input<ResponsiveImagePaths>();
  sloganId = input<string>();
  productName = input<ProductName>(); // Added: specify which product this hero section represents

  currentImageSrc = '/assets/pngs/320-390/Gruppe 22059.png';
  currentImageSrcset =
    '/assets/pngs/320-390/Gruppe 22059.png 1x, /assets/pngs/320-390/Gruppe 22059@2x.png 2x';

  private breakpointService = inject(BreakpointService);
  private shoppingCartService = inject(ShoppingCartService);

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupResponsiveImages();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupResponsiveImages() {
    // Check if imagePaths is provided before using the service
    const paths = this.imagePaths();
    if (paths) {
      // Use the service to get responsive image sources
      this.breakpointService
        .getResponsiveImageSrcset$(paths)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ src, srcset }) => {
          this.currentImageSrc = src;
          this.currentImageSrcset = srcset;
        });
    }
  }

  /**
   * Handle "Jetzt testen" button click event
   */
  onTestButtonClick(): void {
    const product = this.productName();
    if (product) {
      this.shoppingCartService.addProduct(product);
    } else {
      console.warn('No product name specified for hero section');
    }
  }
}
