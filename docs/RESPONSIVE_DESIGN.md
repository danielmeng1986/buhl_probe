# Responsive Design Guide

## Overview

This project adopts a Mobile First responsive design strategy, implementing full device adaptation based on 5 design specifications provided by UX/UI designers.

## Design Specifications

| Breakpoint Name | Viewport Width | Design Size | Applicable Devices |
|----------------|----------------|-------------|-------------------|
| Mobile S | 320px | 320 × 2889px | Small mobile phones |
| Mobile M | 390px | 390 × 2622px | Medium mobile phones |
| Tablet | 768px | 768 × 2388px | Tablet devices |
| Desktop | 1200px | 1200 × 2295px | Desktop devices |
| Desktop L | 1980px | 1980 × 2295px | Large desktop devices |

## Responsive Architecture

### 1. Breakpoint System

```scss
$breakpoints: (
  'mobile-s': 320px,
  'mobile-m': 390px,
  'tablet': 768px,
  'desktop': 1200px,
  'desktop-l': 1980px
);
```

### 2. Container System

```scss
$container-max-widths: (
  'mobile-s': 100%,
  'mobile-m': 100%,
  'tablet': 720px,
  'desktop': 1140px,
  'desktop-l': 1920px
);
```

### 3. Spacing System

Using a proportional scaling spacing system:

```scss
$spacing-scales: (
  'mobile-s': 0.8,   // More compact spacing
  'mobile-m': 1,     // Standard spacing
  'tablet': 1.2,     // Slightly larger spacing
  'desktop': 1.5,    // Large spacing
  'desktop-l': 2     // Maximum spacing
);
```

### 4. Typography System

Responsive font sizes:

```scss
$font-scales: (
  'mobile-s': (
    'base': 14px,
    'h1': 24px,
    'h2': 20px,
    'h3': 18px
  ),
  'mobile-m': (
    'base': 15px,
    'h1': 26px,
    'h2': 22px,
    'h3': 19px
  ),
  // ... other breakpoints
);
```

## Core Mixins

### 1. Media Query Mixins

```scss
// Basic media query
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

// Range media query
@mixin respond-between($min-breakpoint, $max-breakpoint) {
  // Implementation code
}

// Single breakpoint query
@mixin respond-only($breakpoint) {
  // Implementation code
}
```

### 2. Responsive Spacing Mixin

```scss
@mixin responsive-spacing($property: 'padding', $multiplier: 1) {
  // Automatically apply spacing for all breakpoints
}
```

### 3. Responsive Font Mixin

```scss
@mixin responsive-font($size-key: 'base') {
  // Automatically apply font sizes for all breakpoints
}
```

### 4. Responsive Grid Mixin

```scss
@mixin responsive-grid($mobile: 1, $tablet: 2, $desktop: 3, $desktop-l: 4) {
  // Automatically create responsive grid layout
}
```

## Usage Guide

### 1. Using Responsive Design in Components

```scss
// Import responsive configuration
@import "../../styles/responsive";

.my-component {
  // Use responsive spacing
  @include responsive-spacing('padding');
  
  // Use responsive fonts
  @include responsive-font('h2');
  
  // Use media queries
  @include respond-to('tablet') {
    // Tablet styles
  }
  
  @include respond-to('desktop') {
    // Desktop styles
  }
}
```

### 2. Creating Responsive Layouts

```scss
.layout-container {
  @include responsive-container;
  
  .content-grid {
    @include responsive-grid(1, 2, 3, 4);
  }
}
```

### 3. Recommended HTML Structure

```html
<div class="container">
  <div class="row">
    <div class="col col-md-6 col-lg-4">
      <!-- Content -->
    </div>
  </div>
</div>
```

## Component-Level Responsive Implementation

### 1. Header Component

- Mobile: Vertical stacked layout
- Tablet+: Horizontal layout
- Responsive navigation menu

### 2. Home Component

- Hero area: Single/double column layout switching
- Feature cards: 1/2/3/4 column grid
- Responsive images and spacing

### 3. Product Component

- Product list: Responsive grid
- Product details: Adaptive layout

## Testing Recommendations

### 1. Breakpoint Testing

Test all breakpoints in Chrome Developer Tools:
- 320px (iPhone SE)
- 390px (iPhone 12)
- 768px (iPad)
- 1200px (Desktop)
- 1980px (Large Desktop)

### 2. Device Testing

- iOS Safari
- Android Chrome
- Desktop Chrome/Firefox/Safari

### 3. Performance Testing

- Responsive image loading
- CSS performance
- Mobile performance

## Maintenance Recommendations

### 1. Adding New Breakpoints

1. Update the `$breakpoints` mapping
2. Add corresponding spacing and font scales
3. Test all components
4. Update documentation

### 2. Performance Optimization

- Use CSS container queries (modern browsers)
- Image lazy loading
- Critical CSS inlining

### 3. Design System Consistency

- Regularly review component spacing
- Maintain consistent font scales
- Maintain design token system

## Frequently Asked Questions

### Q: How to add custom breakpoints?
A: Add new breakpoints to the `$breakpoints` mapping and update spacing and font systems accordingly.

### Q: How to handle complex layout requirements?
A: Use `respond-between` or `respond-only` mixins for precise control.

### Q: How to optimize mobile performance?
A: Use mobile-first strategy and avoid loading unnecessary styles on small screen devices.

## Related Files

- `src/app/styles/_responsive.scss` - Responsive configuration
- `src/styles.scss` - Global styles
- `src/app/app.scss` - Application-level styles
- Component `.scss` files - Component-level responsive implementation
