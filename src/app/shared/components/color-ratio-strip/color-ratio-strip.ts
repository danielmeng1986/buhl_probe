import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorService } from '../../../services';
import { COLORS, SEMANTIC_COLORS } from '../../constants/colors';

@Component({
  selector: 'app-color-ratio-strip',
  imports: [CommonModule],
  templateUrl: './color-ratio-strip.html',
  styleUrl: './color-ratio-strip.scss'
})
export class ColorRatioStrip {
  colors = COLORS;
  semanticColors = SEMANTIC_COLORS;
  private readonly colorService = inject(ColorService);
  segments = [
    { color: this.colorService.getColor('YELLOW'), value: 132},
    { color: this.colorService.getColor('LIGHT_BLUE'), value: 96},
    { color: this.colorService.getColor('TEAL'), value: 68},
    { color: this.colorService.getColor('LIGHT_BLUE'), value: 78},
    { color: this.colorService.getColor('PRIMARY_BLUE'), value: 149},
    { color: this.colorService.getColor('TEAL'), value: 60},
    { color: this.colorService.getColor('RED'), value: 115},
    { color: this.colorService.getColor('GREEN'), value: 115},
    { color: this.colorService.getColor('YELLOW'), value: 41},
    { color: this.colorService.getColor('LIGHT_BLUE'), value: 41},
    { color: this.colorService.getColor('ORANGE'), value: 105},
  ];
  
  
}
