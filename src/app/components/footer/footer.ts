import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ColorRatioStrip } from '../../shared/components/color-ratio-strip/color-ratio-strip';
import { BreakpointService } from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, ColorRatioStrip, AsyncPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly breakpointService: BreakpointService = inject(BreakpointService);

}
