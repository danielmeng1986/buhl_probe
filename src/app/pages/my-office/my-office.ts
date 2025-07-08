import { Component, inject } from '@angular/core';
import { HeroSection } from '../../shared/components/hero-section/hero-section';
import {
  FeatureCard,
  FeatureIconType,
} from '../../shared/components/feature-card/feature-card';
import { TranslateModule } from '@ngx-translate/core';
import { ResponsiveImagePaths } from '../../services';
import { PrevCard } from '../../shared/components/prev-card/prev-card';
import { BreakpointService } from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-office',
  imports: [HeroSection, FeatureCard, TranslateModule, PrevCard, AsyncPipe],
  templateUrl: './my-office.html',
  styleUrl: './my-office.scss',
})
export class MyOffice {
  readonly iconAccounting: FeatureIconType = 'm-accounting';
  readonly iconMarketing: FeatureIconType = 'm-marketing';
  readonly iconUpgrade: FeatureIconType = 'm-upgrade';
  readonly breakpointService = inject(BreakpointService);

  readonly imagePaths: ResponsiveImagePaths = {
    mobile: {
      src: '/assets/pngs/320-390/Gruppe 22059.png',
      srcset:
        '/assets/pngs/320-390/Gruppe 22059.png 1x, /assets/pngs/320-390/Gruppe 22059@2x.png 2x',
    },
    tablet: {
      src: '/assets/pngs/768/Gruppe 22147.png',
      srcset:
        '/assets/pngs/768/Gruppe 22147.png 1x, /assets/pngs/768/Gruppe 22147@2x.png 2x',
    },
    desktop: {
      src: '/assets/pngs/1200/Gruppe 22024.png',
      srcset:
        '/assets/pngs/1200/Gruppe 22024.png 1x, /assets/pngs/1200/Gruppe 22024@2x.png 2x',
    },
    desktopXl: {
      src: '/assets/pngs/1980/teaser-grafik-1200.png',
      srcset:
        '/assets/pngs/1980/teaser-grafik-1200.png 1x, /assets/pngs/1980/teaser-grafik-1200@2x.png 2x',
    },
  };
  readonly prevCardImagePaths: ResponsiveImagePaths = {
    mobile: {
      src: '/assets/pngs/320-390/Bild 1.png',
      srcset:
        '/assets/pngs/320-390/Bild 1.png 1x, /assets/pngs/320-390/Bild 1@2x.png 2x',
    },
    tablet: {
      src: '/assets/pngs/768/Bild 1.png',
      srcset:
        '/assets/pngs/768/Bild 1.png 1x, /assets/pngs/768/Bild  1@2x.png 2x',
    },
    desktop: {
      src: '/assets/pngs/1200/Bild 1.png',
      srcset:
        '/assets/pngs/1200/Bild 1.png 1x, /assets/pngs/1200/Bild  1@2x.png 2x',
    },
    desktopXl: {
      src: '/assets/pngs/1200/Bild 1.png',
      srcset:
        '/assets/pngs/1200/Bild 1.png 1x, /assets/pngs/1200/Bild  1@2x.png 2x',
    },
  };
}
