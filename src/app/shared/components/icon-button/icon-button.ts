import { Component, inject, Input } from '@angular/core';
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
  @Input() icon: ButtonIconType | null = null;
  @Input() bgColor: ButtonBgColorType = 'primary';
  @Input() size: IconButtonSize = 'medium';
  readonly colorService = inject(ColorService);

  private iconMap: Record<ButtonIconType, string> = {
    'm-login': '/assets/svgs/account_circle-24px.svg',
    'm-logo': '/assets/svgs/buhl-logo-1.svg',
  };

  get iconPath(): string | null {
    if (this.icon && this.iconMap[this.icon]) {
      const path = this.iconMap[this.icon];
      console.log('Icon path:', path, 'for icon:', this.icon); // 调试信息
      return path;
    }
    console.log('No icon path found for:', this.icon); // 调试信息
    return null;
  }

  private bgColorMap: Record<ButtonBgColorType, string> = {
    primary: this.colorService.getColor('PRIMARY_BLUE'),
    secondary: this.colorService.getColor('PRIMARY_ORANGE'),
  };

  get bgColorValue(): string {
    return this.bgColorMap[this.bgColor];
  }
}
