import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { LanguageService } from './services/language.service';
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

  ngOnInit(): void {
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
