import { Injectable } from '@angular/core';
import { COLORS, SEMANTIC_COLORS, ColorKey, SemanticColorKey } from '../shared/constants/colors';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  /**
   * Get a primary color by key
   */
  getColor(key: ColorKey): string {
    return COLORS[key];
  }

  /**
   * Get a semantic color by key
   */
  getSemanticColor(key: SemanticColorKey): string {
    return SEMANTIC_COLORS[key];
  }

  /**
   * Get all primary colors
   */
  getAllColors() {
    return COLORS;
  }

  /**
   * Get all semantic colors
   */
  getAllSemanticColors() {
    return SEMANTIC_COLORS;
  }

  /**
   * Convert hex color to RGB
   */
  hexToRgb(hex: string): {r: number, g: number, b: number} | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Convert hex color to RGBA with alpha
   */
  hexToRgba(hex: string, alpha: number): string {
    const rgb = this.hexToRgb(hex);
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex;
  }

  /**
   * Get CSS custom property name for a color
   */
  getCssCustomProperty(colorKey: string): string {
    return `--color-${colorKey.toLowerCase().replace(/_/g, '-')}`;
  }
}
