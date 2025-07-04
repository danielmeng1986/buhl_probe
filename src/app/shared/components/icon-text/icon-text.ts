import { Component, Input } from '@angular/core';

export type IconType =
  | 's-menu'
  | 's-search'
  | 's-apps'
  | 's-person'
  | 's-shopping-cart'
  | 's-login';

@Component({
  selector: 'app-icon-text',
  imports: [],
  templateUrl: './icon-text.html',
  styleUrl: './icon-text.scss',
})
export class IconText {
  @Input() icon: IconType = 's-search';

  private iconMap: Record<IconType, string> = {
    's-menu': '/assets/svgs/menu-24px.svg',
    's-search': '/assets/svgs/ic-suche-24.svg',
    's-apps': '/assets/svgs/ic-apps-24.svg',
    's-person': '/assets/svgs/ic-person-24.svg',
    's-shopping-cart': '/assets/svgs/ic-warenkorb-24.svg',
    's-login': '/assets/svgs/ic-buhl-anmelden-24.svg',
  };

  get iconPath(): string {
    return this.iconMap[this.icon] || this.iconMap['s-search'];
  }
}
