# Golden Ratio Font Sizing System

## Overview
Your website now uses a **golden ratio-based typographic system** that ensures consistent, beautiful text scaling across all pages. All font sizes are controlled by CSS custom properties, making it easy to adjust them globally through the accessibility settings.

## Font Size Variables

The golden ratio font sizes are defined in `:root` and scale proportionally:

```css
:root {
  --name1: 6.875rem;    /* Largest - Main headings */
  --name2: 4.25rem;     /* Large headings */
  --name3: 2.625rem;    /* Section headings */
  --name4: 1.625rem;    /* Subheadings */
  --name5: 1rem;        /* Body text (default) */
  --name6: 0.625rem;    /* Small text, captions */
  --name7: 0.3875rem;   /* Extra small text */
}
```

These are then converted to computed sizes:

```css
--font-size-1: calc(var(--name1) * var(--text-scale));
--font-size-2: calc(var(--name2) * var(--text-scale));
--font-size-3: calc(var(--name3) * var(--text-scale));
--font-size-4: calc(var(--name4) * var(--text-scale));
--font-size-5: calc(var(--name5) * var(--text-scale));
--font-size-6: calc(var(--name6) * var(--text-scale));
--font-size-7: calc(var(--name7) * var(--text-scale));
```

## Text Scaling Multipliers

All fonts scale based on the user's accessibility preference:

- **normal**: `--text-scale: 1` (100% of default)
- **large**: `--text-scale: 1.25` (125% - 25% larger)
- **xlarge**: `--text-scale: 1.5` (150% - 50% larger)

## How to Use in CSS

### For Element Sizing
Simply replace hardcoded font sizes with the appropriate variable:

```css
/* BEFORE */
.heading {
  font-size: 36px;  /* Not scalable */
}

/* AFTER */
.heading {
  font-size: var(--font-size-3);  /* Scales with user preferences */
}
```

### Mapping Guide
- **Page headings/titles**: Use `var(--font-size-3)` or `var(--font-size-2)`
- **Section headings**: Use `var(--font-size-4)`
- **Body text/paragraphs**: Use `var(--font-size-5)`
- **Small text/labels**: Use `var(--font-size-6)`
- **Extra small text**: Use `var(--font-size-7)`

## How Users Control Text Size

### Via Accessibility Settings (Recommended)
Users can change text size through your accessibility settings page with these options:
- **Normal** - Default size
- **Large** - 25% larger
- **Extra Large** - 50% larger

### Programmatic Control (For Developers)
```javascript
// Set text size
window.setTextSize('normal');   // Reset to normal
window.setTextSize('large');    // Make 25% larger
window.setTextSize('xlarge');   // Make 50% larger

// Get current text size
const currentSize = window.getTextSize();  // Returns: "normal", "large", or "xlarge"

// Update all preferences at once
window.updateAccessibilityPrefs({ 
  textSize: 'large',
  grayscale: true,
  fontFamily: 'opendyslexic',
  lineReader: false 
});

// Get all preferences
const prefs = window.getAccessibilityPrefs();
```

## Implementation Checklist

✅ Golden ratio variables defined in `:root`
✅ Computed font sizes with scaling
✅ All CSS files updated to use `var(--font-size-X)`
✅ Accessibility.js updated with text sizing functions
✅ Text scaling works for all three sizes: normal, large, xlarge

## Benefits

1. **Consistency**: All text scales proportionally, maintaining visual hierarchy
2. **Accessibility**: Users can easily adjust text for better readability
3. **Golden Ratio**: Based on proven mathematical proportions for aesthetic typography
4. **Easy to Maintain**: Change values in one place, affects entire website
5. **Responsive**: Scales automatically across all devices

## Persistence

All user accessibility preferences are automatically saved to:
- **LocalStorage**: For immediate persistence across sessions
- **Firestore**: (Optional) If user is authenticated, preferences sync across devices

## Testing

To verify the system is working:
1. Open your website
2. Open browser DevTools (F12)
3. Go to the Console tab
4. Run: `window.setTextSize('large')`
5. All text should increase by 25%
6. Run: `window.setTextSize('normal')`
7. Text should return to normal size

## CSS Variables Location

- **Golden ratio definitions**: `/css/accessibility.css` (`:root`)
- **Scaling rules**: `/css/accessibility.css` (`.text-size-*` classes)
- **Usage throughout**: All CSS files (`/css/*.css`)

## Notes

- The font-size calculations happen in CSS, so they're performant
- No JavaScript recalculation needed per element
- The `--text-scale` multiplier is the single control point for all sizing
- Proportions are maintained perfectly at all scales (ratio preserved)
