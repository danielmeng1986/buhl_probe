import { Component } from '@angular/core';
import { HeroSection } from '../../shared/components/hero-section/hero-section';
import { FeatureCard, FeatureIconType } from '../../shared/components/feature-card/feature-card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-office',
  imports: [HeroSection, FeatureCard, TranslateModule],
  templateUrl: './my-office.html',
  styleUrl: './my-office.scss',
})
export class MyOffice {
  readonly iconAccounting: FeatureIconType = 'm-accounting';
  readonly iconMarketing: FeatureIconType = 'm-marketing';
  readonly iconUpgrade: FeatureIconType = 'm-upgrade';
}
