/**
 * Color constants that can be used in both TypeScript and SCSS
 * These colors match the SCSS variables in _colors.scss
 */

export const COLORS = {
  // Primary Colors
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#F5F7FA',
  PRIMARY_ORANGE: '#ED751B',
  PRIMARY_BLUE: '#023E84',
  DARK_GRAY: '#707070',
  YELLOW: '#FFDE12',

  // Secondary Colors
  LIGHT_BLUE: '#CCEAF1',
  TEAL: '#63C2CD',
  LIGHT_TEAL: '#95D2DD',
  RED: '#E9435C',
  GREEN: '#A2C62E',
  ORANGE: '#F29213',

  // Transparency Colors
  BLACK_OVERLAY_LIGHT: '#00000029',  // Black with 16% opacity
  BLACK_OVERLAY_LIGHTER: '#0000001F',  // Black with 12% opacity
} as const;

// Semantic color mappings
export const SEMANTIC_COLORS = {
  // Background colors
  BG_PRIMARY: COLORS.WHITE,
  BG_SECONDARY: COLORS.LIGHT_GRAY,
  BG_OVERLAY: COLORS.BLACK_OVERLAY_LIGHT,

  // Text colors
  TEXT_PRIMARY: COLORS.DARK_GRAY,
  TEXT_SECONDARY: COLORS.PRIMARY_BLUE,

  // Brand colors
  BRAND_PRIMARY: COLORS.PRIMARY_ORANGE,
  BRAND_SECONDARY: COLORS.PRIMARY_BLUE,
  BRAND_ACCENT: COLORS.YELLOW,

  // State colors
  SUCCESS: COLORS.GREEN,
  WARNING: COLORS.YELLOW,
  ERROR: COLORS.RED,
  INFO: COLORS.TEAL,

  // Button colors
  BTN_PRIMARY: COLORS.PRIMARY_ORANGE,
  BTN_SECONDARY: COLORS.PRIMARY_BLUE,
  BTN_ACCENT: COLORS.YELLOW,

  // Border colors
  BORDER_LIGHT: COLORS.BLACK_OVERLAY_LIGHTER,
  BORDER_DEFAULT: COLORS.BLACK_OVERLAY_LIGHT,
} as const;

// Type definitions for better TypeScript support
export type ColorKey = keyof typeof COLORS;
export type SemanticColorKey = keyof typeof SEMANTIC_COLORS;
