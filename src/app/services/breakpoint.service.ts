import { Injectable, inject } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

// Breakpoint definitions that match styles.scss
export const BREAKPOINTS = {
  mobile: '320px',
  mobileM: '390px',
  tablet: '768px',
  desktop: '1200px',
  desktopXl: '1980px',
} as const;

export interface ImagePaths {
  mobile: string;
  mobileM?: string;
  tablet: string;
  desktop: string;
  desktopXl: string;
}

// Interface for responsive image paths with src and srcset
export interface ResponsiveImagePaths {
  mobile: { src: string; srcset: string };
  mobileM?: { src: string; srcset: string };
  tablet: { src: string; srcset: string };
  desktop: { src: string; srcset: string };
  desktopXl: { src: string; srcset: string };
}

// Screen size type for better type safety
export type ScreenSize =
  | 'mobile'
  | 'mobile-m'
  | 'tablet'
  | 'desktop'
  | 'desktop-xl';

// Media query strings
export const MEDIA_QUERIES = {
  mobile: `(min-width: ${BREAKPOINTS.mobile})`,
  mobileM: `(min-width: ${BREAKPOINTS.mobileM})`,
  tablet: `(min-width: ${BREAKPOINTS.tablet})`,
  desktop: `(min-width: ${BREAKPOINTS.desktop})`,
  desktopXl: `(min-width: ${BREAKPOINTS.desktopXl})`,

  // Range queries for specific screen sizes
  mobileOnly: `(max-width: ${parseInt(BREAKPOINTS.tablet) - 1}px)`,
  tabletOnly: `(min-width: ${BREAKPOINTS.tablet}) and (max-width: ${parseInt(BREAKPOINTS.desktop) - 1}px)`,
  desktopOnly: `(min-width: ${BREAKPOINTS.desktop}) and (max-width: ${parseInt(BREAKPOINTS.desktopXl) - 1}px)`,
  desktopXlOnly: `(min-width: ${BREAKPOINTS.desktopXl})`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Get current screen size based on breakpoints
   * Returns the largest matching screen size
   */
  getCurrentScreenSize$(): Observable<ScreenSize> {
    return this.breakpointObserver
      .observe([
        MEDIA_QUERIES.desktopXl,
        MEDIA_QUERIES.desktop,
        MEDIA_QUERIES.tablet,
        MEDIA_QUERIES.mobileM,
        MEDIA_QUERIES.mobile,
      ])
      .pipe(
        map((result) => {
          if (result.breakpoints[MEDIA_QUERIES.desktopXl]) return 'desktop-xl';
          if (result.breakpoints[MEDIA_QUERIES.desktop]) return 'desktop';
          if (result.breakpoints[MEDIA_QUERIES.tablet]) return 'tablet';
          if (result.breakpoints[MEDIA_QUERIES.mobileM]) return 'mobile-m';
          return 'mobile';
        }),
      );
  }

  /**
   * Check if current screen matches specific breakpoint
   */
  isMatching$(query: keyof typeof MEDIA_QUERIES): Observable<boolean> {
    return this.breakpointObserver
      .observe(MEDIA_QUERIES[query])
      .pipe(map((result) => result.matches));
  }

  /**
   * Check if current screen matches any of the specified breakpoints
   */
  isMatchingAny$(queries: (keyof typeof MEDIA_QUERIES)[]): Observable<boolean> {
    return this.observeBreakpoints$(queries).pipe(
      map((result) => result.matches),
    );
  }

  /**
   * Observe multiple breakpoints at once
   */
  observeBreakpoints$(
    queries: (keyof typeof MEDIA_QUERIES)[],
  ): Observable<BreakpointState> {
    const mediaQueries = queries.map((query) => MEDIA_QUERIES[query]);
    return this.breakpointObserver.observe(mediaQueries);
  }

  /**
   * Get responsive image source based on screen size
   * Generic method that can be used by any component
   */
  getResponsiveImageSrc$(imagePaths: ImagePaths): Observable<string> {
    return this.getCurrentScreenSize$().pipe(
      map((screenSize) => {
        switch (screenSize) {
          case 'desktop-xl':
            return imagePaths.desktopXl;
          case 'desktop':
            return imagePaths.desktop;
          case 'tablet':
            return imagePaths.tablet;
          case 'mobile-m':
            return imagePaths.mobileM || imagePaths.mobile;
          default:
            return imagePaths.mobile;
        }
      }),
    );
  }

  /**
   * Get responsive image srcset based on screen size
   */
  getResponsiveImageSrcset$(
    imagePaths: ResponsiveImagePaths,
  ): Observable<{ src: string; srcset: string }> {
    return this.getCurrentScreenSize$().pipe(
      map((screenSize) => {
        switch (screenSize) {
          case 'desktop-xl':
            return imagePaths.desktopXl;
          case 'desktop':
            return imagePaths.desktop;
          case 'tablet':
            return imagePaths.tablet;
          case 'mobile-m':
            return imagePaths.mobileM || imagePaths.mobile;
          default:
            return imagePaths.mobile;
        }
      }),
    );
  }

  /**
   * Get CSS utility classes based on current screen size
   * Useful for combining with CSS-based responsive design
   */
  getResponsiveCssClasses$(): Observable<string[]> {
    return this.getCurrentScreenSize$().pipe(
      map((screenSize) => {
        const classes = [`screen-${screenSize}`];

        // Add utility classes for easier CSS targeting
        if (screenSize === 'mobile' || screenSize === 'mobile-m') {
          classes.push('is-mobile');
        }
        if (screenSize === 'tablet') {
          classes.push('is-tablet');
        }
        if (screenSize === 'desktop' || screenSize === 'desktop-xl') {
          classes.push('is-desktop');
        }

        return classes;
      }),
    );
  }

  /**
   * Check if heavy resources should be loaded for current screen size
   * Useful for conditional loading of large images or components
   */
  shouldLoadHeavyResources$(): Observable<boolean> {
    return this.getCurrentScreenSize$().pipe(
      map((screenSize) => {
        // Only load heavy resources on larger screens
        return screenSize === 'desktop' || screenSize === 'desktop-xl';
      }),
    );
  }
}
