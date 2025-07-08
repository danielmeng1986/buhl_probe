import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export type FeatureIconType = 'm-accounting' | 'm-marketing' | 'm-upgrade';

@Component({
  selector: 'app-feature-card',
  imports: [TranslateModule],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
})
export class FeatureCard {
  icon = input<FeatureIconType>('m-accounting');
  titleId = input<string>('FEATURE_CARD.ACCOUNTING.TITLE');

  private iconMap: Record<FeatureIconType, string> = {
    'm-accounting': 'assets/svgs/ic-buchhaltung.svg',
    'm-marketing': 'assets/svgs/ic-marketing.svg',
    'm-upgrade': 'assets/svgs/ic-upgrade.svg',
  };

  get iconPath(): string {
    return this.iconMap[this.icon()] || this.iconMap['m-accounting'];
  }
}
