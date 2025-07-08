import { Component } from '@angular/core';
import { HeroSection } from '../../shared/components/hero-section/hero-section';
import { TranslateModule } from '@ngx-translate/core';
import { ResponsiveImagePaths } from '../../services';

@Component({
  selector: 'app-my-club',
  imports: [HeroSection, TranslateModule],
  templateUrl: './my-club.html',
  styleUrl: './my-club.scss',
})
export class MyClub {
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
}
