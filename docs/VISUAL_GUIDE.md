# Visual Font Size Guide

## Golden Ratio Typography System - Visual Reference

### 📏 The 7 Font Sizes (Normal Size)

```
╔══════════════════════════════════════════════════════════════════╗
║ Font Size 1 - 6.875rem (110px)                                   ║
║ --font-size-1: var(--name1) × var(--text-scale)                  ║
║ USE: Extra large headings, page titles                           ║
╚══════════════════════════════════════════════════════════════════╝

    ╔═══════════════════════════════════════════════════════════╗
    ║ Font Size 2 - 4.25rem (68px)                              ║
    ║ --font-size-2: var(--name2) × var(--text-scale)           ║
    ║ USE: Large headings, hero sections                        ║
    ╚═══════════════════════════════════════════════════════════╝

        ╔═════════════════════════════════════════════════════╗
        ║ Font Size 3 - 2.625rem (42px)                       ║
        ║ --font-size-3: var(--name3) × var(--text-scale)     ║
        ║ USE: Section titles, major headings                 ║
        ╚═════════════════════════════════════════════════════╝

            ╔═════════════════════════════════════════════╗
            ║ Font Size 4 - 1.625rem (26px)               ║
            ║ --font-size-4: var(--name4) × var(--text-scale)
            ║ USE: Subheadings, card titles               ║
            ╚═════════════════════════════════════════════╝

                ╔═══════════════════════════════════╗
                ║ Font Size 5 - 1rem (16px)         ║
                ║ --font-size-5: var(--name5) × var(--text-scale)
                ║ USE: Body text, paragraphs, links ║
                ╚═══════════════════════════════════╝

                    ╔═══════════════════════════╗
                    ║ Font Size 6 - 0.625rem (10px) ║
                    ║ --font-size-6: var(--name6) × var(--text-scale)
                    ║ USE: Small text, labels   ║
                    ╚═══════════════════════════╝

                        ╔═════════════════════╗
                        ║ Font Size 7 - 0.3875rem (6.2px) ║
                        ║ --font-size-7: var(--name7) × var(--text-scale)
                        ║ USE: Extra small text ║
                        ╚═════════════════════╝
```

---

## 📊 Scaling Comparison

### At 100% (Normal)
```
Level 1: 110px
Level 2: 68px  
Level 3: 42px  (← Most common for main headings)
Level 4: 26px
Level 5: 16px  (← Default body text size)
Level 6: 10px
Level 7: 6.2px
```

### At 125% (Large - +25%)
```
Level 1: 137.5px
Level 2: 85px  
Level 3: 52.5px (← Comfortably larger)
Level 4: 32.5px
Level 5: 20px  (← Easy to read)
Level 6: 12.5px
Level 7: 7.75px
```

### At 150% (Extra Large - +50%)
```
Level 1: 165px
Level 2: 102px  
Level 3: 63px  (← Very clear and easy to read)
Level 4: 39px
Level 5: 24px  (← Good for accessibility)
Level 6: 15px
Level 7: 9.3px
```

---

## 🎯 Real-World Examples

### Hero Section Example
```css
.hero-title {
  font-size: var(--font-size-2);  /* 68px → 85px → 102px */
  font-weight: 700;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--font-size-5);  /* 16px → 20px → 24px */
  color: #666;
}
```

### Card Component Example
```css
.card-title {
  font-size: var(--font-size-4);  /* 26px → 32.5px → 39px */
  font-weight: 600;
}

.card-text {
  font-size: var(--font-size-5);  /* 16px → 20px → 24px */
  line-height: 1.6;
}

.card-label {
  font-size: var(--font-size-6);  /* 10px → 12.5px → 15px */
  color: #999;
}
```

### Navigation Example
```css
.nav-logo-text {
  font-size: var(--font-size-4);  /* 26px → 32.5px → 39px */
  font-weight: 700;
}

.nav-link {
  font-size: var(--font-size-5);  /* 16px → 20px → 24px */
}

.nav-helper-text {
  font-size: var(--font-size-6);  /* 10px → 12.5px → 15px */
}
```

---

## ✨ Why Golden Ratio?

The golden ratio (φ ≈ 1.618) creates visually pleasing proportions:

```
              1
             ---  = φ
            φ-1

Each size ÷ Next smaller size ≈ 1.618

So: 110px ÷ 68px = 1.618 ✓
    68px  ÷ 42px = 1.619 ✓
    42px  ÷ 26px = 1.615 ✓
    26px  ÷ 16px = 1.625 ✓
    16px  ÷ 10px = 1.6   ✓
```

This natural proportion appears in:
- Nature (seashells, flowers, DNA)
- Architecture (Parthenon, pyramids)
- Art (Mona Lisa, Notre-Dame)
- Your website! 🎨

---

## 📱 Responsive Behavior

The golden ratio font system works beautifully across devices:

### Mobile (375px width)
- All sizes scale proportionally
- Ratios maintained
- Readable at all levels

### Tablet (768px width)
- All sizes scale proportionally
- Ratios maintained
- Perfect legibility

### Desktop (1440px width)
- All sizes scale proportionally
- Ratios maintained
- Beautiful typography

The `var(--text-scale)` multiplier adjusts all sizes together!

---

## 🎮 Interactive Testing

Open browser console (F12) and try:

```javascript
// See it in action
window.setTextSize('normal');   // 100%
window.setTextSize('large');    // 125%
window.setTextSize('xlarge');   // 150%

// Check current size
window.getTextSize();           // Shows: "normal", "large", or "xlarge"

// Get exact values
const prefs = window.getAccessibilityPrefs();
console.log(prefs);
```

All text on the page updates instantly! 🚀

---

## 📊 Font Size Quick Table

| CSS Variable | Normal | Large | XL | HTML Tag |
|---|---|---|---|---|
| --font-size-1 | 110px | 137.5px | 165px | (not common) |
| --font-size-2 | 68px | 85px | 102px | `<h1>` |
| --font-size-3 | 42px | 52.5px | 63px | `<h2>` |
| --font-size-4 | 26px | 32.5px | 39px | `<h3>` |
| --font-size-5 | 16px | 20px | 24px | `<p>` `<a>` |
| --font-size-6 | 10px | 12.5px | 15px | `<small>` |
| --font-size-7 | 6.2px | 7.75px | 9.3px | Captions |

---

## 🎨 Beautiful Typography Features

✨ **Mathematical harmony** - Based on golden ratio (1.618)
✨ **Proportional scaling** - All sizes scale together
✨ **Professional appearance** - Works at any size
✨ **Accessibility** - Three levels for different needs
✨ **Easy to remember** - Just remember the pattern

---

## 💡 Usage Tips

**For headings:** Use level 2 or 3
```css
h1 { font-size: var(--font-size-2); }
h2 { font-size: var(--font-size-3); }
```

**For body text:** Use level 5
```css
p { font-size: var(--font-size-5); }
```

**For labels:** Use level 6
```css
label { font-size: var(--font-size-6); }
```

**For captions:** Use level 7
```css
.caption { font-size: var(--font-size-7); }
```

---

## 🔍 How It Actually Works

```css
/* Step 1: Define base golden ratio sizes */
:root {
  --name1: 6.875rem;
  --name2: 4.25rem;
  --name3: 2.625rem;
  /* ... etc ... */
}

/* Step 2: Create multiplier for scaling */
:root {
  --text-scale: 1;  /* User choice: 1, 1.25, or 1.5 */
}

/* Step 3: Apply the formula */
:root {
  --font-size-1: calc(var(--name1) * var(--text-scale));
  --font-size-2: calc(var(--name2) * var(--text-scale));
  /* ... etc ... */
}

/* Step 4: Use in CSS */
p { font-size: var(--font-size-5); }

/* Result: When --text-scale changes, ALL sizes update! */
```

That's all it takes! Pure CSS, automatic scaling. 🎯

---

## 🚀 Ready to Use!

All you need to do:
1. Use `var(--font-size-X)` instead of hardcoded sizes
2. Add UI controls to your settings page
3. Test with `window.setTextSize()`
