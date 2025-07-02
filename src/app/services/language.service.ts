import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public readonly availableLanguages: Language[] = [
    { code: 'de', name: 'Deutsch', flag: '��' },
    { code: 'en', name: 'English', flag: '��' },
  ];

  private readonly defaultLanguage = 'de';
  private readonly storageKey = 'selected-language';
  private isBrowser: boolean;

  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID) as object;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Get saved language or use default (only in browser)
    const savedLanguage = this.isBrowser ? this.getSavedLanguage() : null;
    const browserLanguage = this.getBrowserLanguage();

    const languageToUse =
      savedLanguage || browserLanguage || this.defaultLanguage;

    // Set available languages
    this.translate.addLangs(this.availableLanguages.map((lang) => lang.code));

    // Set default language
    this.translate.setDefaultLang(this.defaultLanguage);
    this.translate.instant('COMMON.LOADING'); // Preload a common translation key
    console.log('COMMON.LOADING');
    // Use the determined language
    this.setLanguage(languageToUse);
  }

  private getSavedLanguage(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch {
      // localStorage might not be available in some environments
      return null;
    }
  }

  private getBrowserLanguage(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    const browserLang = navigator.language.split('-')[0];
    return this.availableLanguages.some((lang) => lang.code === browserLang)
      ? browserLang
      : null;
  }

  public setLanguage(language: string): void {
    if (this.availableLanguages.some((lang) => lang.code === language)) {
      this.translate.use(language);
      if (this.isBrowser) {
        this.saveLanguage(language);
      }
    }
  }

  private saveLanguage(language: string): void {
    try {
      localStorage.setItem(this.storageKey, language);
    } catch {
      // localStorage might not be available in some environments
      // Silently fail - this is not critical functionality
    }
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLanguage;
  }

  public getCurrentLanguageInfo(): Language | undefined {
    const currentLang = this.getCurrentLanguage();
    return this.availableLanguages.find((lang) => lang.code === currentLang);
  }

  public getTranslation(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}
