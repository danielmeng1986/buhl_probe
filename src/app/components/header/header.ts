import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ColorRatioStrip } from '../../shared/components/color-ratio-strip/color-ratio-strip';
import {
  IconText,
  IconType,
} from '../../shared/components/icon-text/icon-text';
import { DropdownMenu } from '../../shared/components/dropdown-menu/dropdown-menu';
import {
  ButtonIconType,
  IconButton,
  IconButtonSize,
} from '../../shared/components/icon-button/icon-button';
import { LoginDialog } from '../login-dialog/login-dialog';
import { LogoutDialog } from '../logout-dialog/logout-dialog';
import {
  AuthService,
  BreakpointService,
  ShoppingCartService,
} from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    TranslateModule,
    RouterLink,
    ColorRatioStrip,
    IconText,
    DropdownMenu,
    IconButton,
    LoginDialog,
    LogoutDialog,
    AsyncPipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly iconSearch: IconType = 's-search';
  readonly iconMenu: IconType = 's-menu';
  readonly iconApps: IconType = 's-apps';
  readonly iconPerson: IconType = 's-person';
  readonly iconShoppingCart: IconType = 's-shopping-cart';
  readonly iconLogin: IconType = 's-login';
  readonly iconButtonSize: IconButtonSize = 'medium';
  readonly iconButtonLogin: ButtonIconType = 'm-login';

  readonly authService: AuthService = inject(AuthService);
  readonly breakpointService = inject(BreakpointService);
  readonly shoppingCartService = inject(ShoppingCartService);

  // Dialog state
  showLoginDialog = false;
  showLogoutDialog = false;

  openLoginDialog(): void {
    this.showLoginDialog = true;
  }

  openLogoutDialog(): void {
    this.showLogoutDialog = true;
  }

  closeLoginDialog(): void {
    this.showLoginDialog = false;
  }

  closeLogoutDialog(): void {
    this.showLogoutDialog = false;
  }

  onLoginSuccess(): void {
    // Optional: Handle successful login (e.g., show success message)
    console.log('Login successful');
  }

  onLogoutSuccess(): void {
    // Optional: Handle successful logout (e.g., show success message)
    console.log('Logout successful');
  }
}
