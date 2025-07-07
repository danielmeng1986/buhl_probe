import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconButton } from '../icon-button/icon-button';
import { CommonModule } from '@angular/common';
import { BreakpointService } from '../../../services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero-section',
  imports: [TranslateModule, IconButton, CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection implements OnInit, OnDestroy {
  currentImageSrc = '/assets/pngs/320-390/Gruppe 22059.png';
  currentImageSrcset = '/assets/pngs/320-390/Gruppe 22059.png 1x, /assets/pngs/320-390/Gruppe 22059@2x.png 2x';

  // Modern Angular dependency injection using the new BreakpointService
  private breakpointService = inject(BreakpointService);
  
  // Subject for component cleanup
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupResponsiveImages();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Setup responsive images using the BreakpointService
  // Much cleaner and reusable approach!
  private setupResponsiveImages() {
    const imagePaths = {
      mobile: {
        src: '/assets/pngs/320-390/Gruppe 22059.png',
        srcset: '/assets/pngs/320-390/Gruppe 22059.png 1x, /assets/pngs/320-390/Gruppe 22059@2x.png 2x'
      },
      tablet: {
        src: '/assets/pngs/768/Gruppe 22147.png',
        srcset: '/assets/pngs/768/Gruppe 22147.png 1x, /assets/pngs/768/Gruppe 22147@2x.png 2x'
      },
      desktop: {
        src: '/assets/pngs/1200/Gruppe 22024.png',
        srcset: '/assets/pngs/1200/Gruppe 22024.png 1x, /assets/pngs/1200/Gruppe 22024@2x.png 2x'
      },
      desktopXl: {
        src: '/assets/pngs/1980/teaser-grafik-1200.png',
        srcset: '/assets/pngs/1980/teaser-grafik-1200.png 1x, /assets/pngs/1980/teaser-grafik-1200@2x.png 2x'
      }
    };

    // Use the service to get responsive image sources
    this.breakpointService
      .getResponsiveImageSrcset$(imagePaths)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ src, srcset }) => {
        this.currentImageSrc = src;
        this.currentImageSrcset = srcset;
      });
  }
}
