import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ColorRatioStrip } from '../../shared/components/color-ratio-strip/color-ratio-strip';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, ColorRatioStrip],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
