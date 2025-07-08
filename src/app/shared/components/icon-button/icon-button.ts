import { Component, inject, input } from '@angular/core';
import { ColorService } from '../../../services';
import { CommonModule } from '@angular/common';

export type ButtonIconType = 'm-login' | 'm-logo';
export type ButtonBgColorType = 'primary' | 'secondary';
export type IconButtonSize = 'medium' | 'large';

@Component({
  selector: 'app-icon-button',
  imports: [CommonModule],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton {
  icon = input<ButtonIconType | null>(null);
  bgColor = input<ButtonBgColorType>('primary');
  size = input<IconButtonSize>('medium');
  readonly colorService = inject(ColorService);

  private iconMap: Record<ButtonIconType, string> = {
    'm-login': '/assets/svgs/account_circle-24px.svg',
    'm-logo': '/assets/svgs/buhl-logo-1.svg',
  };

  get iconPath(): string | null {
    const iconValue = this.icon();
    if (iconValue && this.iconMap[iconValue]) {
      const path = this.iconMap[iconValue];
      console.log('Icon path:', path, 'for icon:', iconValue); // Debug info
      return path;
    }
    console.log('No icon path found for:', iconValue); // Debug info
    return null;
  }

  private bgColorMap: Record<ButtonBgColorType, string> = {
    primary: this.colorService.getColor('PRIMARY_BLUE'),
    secondary: this.colorService.getColor('PRIMARY_ORANGE'),
  };

  get bgColorValue(): string {
    return this.bgColorMap[this.bgColor()];
  }
}
