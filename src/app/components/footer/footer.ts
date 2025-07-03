import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ColorRatioStrip } from '../../shared/components/color-ratio-strip/color-ratio-strip';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, ColorRatioStrip],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
