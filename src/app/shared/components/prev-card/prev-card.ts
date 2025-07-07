import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointService, ResponsiveImagePaths } from '../../../services';
import { Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconButton } from '../icon-button/icon-button';

export type PrevCardType = 'primary' | 'secondary';

@Component({
  selector: 'app-prev-card',
  imports: [NgClass, TranslateModule, IconButton],
  templateUrl: './prev-card.html',
  styleUrl: './prev-card.scss'
})
export class PrevCard implements OnInit, OnDestroy {
  imagePaths = input<ResponsiveImagePaths>();
  descriptionId = input<string>('PREV_CARD.DEFAULT_DESCRIPTION');
  type = input<PrevCardType>('primary');

  currentImageSrc = '/assets/pngs/320-390/Bild 1.png';
  currentImageSrcset = '/assets/pngs/320-390/Bild 1.png 1x, /assets/pngs/320-390/Bild 1@2x.png 2x';

  private breakpointService = inject(BreakpointService);
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
}
