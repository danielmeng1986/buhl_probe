import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { LanguageService, UserSyncService, AuthService } from './services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'buhl_probe';

  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private userSyncService = inject(UserSyncService); // Auto-sync user info every 10s when authenticated
  private authService: AuthService = inject(AuthService); // Add Auth service

  ngOnInit(): void {
    // UserSyncService auto-starts when injected - it will automatically sync user info every 10s after login
    console.log('App: UserSyncService initialized:', this.userSyncService);

    // Check initial authentication status
    console.log(
      'App: Initial authentication status:',
      this.authService.isAuthenticated(),
    );
    console.log('App: Initial user:', this.authService.getCurrentUserSync());

    // Listen to authentication status changes
    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      console.log('App: Authentication status changed to:', isAuth);
    });

    // Listen to user status changes
    this.authService.currentUser$.subscribe((user) => {
      console.log('App: Current user changed to:', user);
    });

    // Ensure translation service is initialized
    console.log(
      'App initialized, current language:',
      this.translateService.currentLang,
    );
    console.log('Available languages:', this.translateService.langs);

    // Test a translation
    this.translateService.get('APP.TITLE').subscribe((translation) => {
      console.log('Translation test for APP.TITLE:', translation);
    });
  }
}
