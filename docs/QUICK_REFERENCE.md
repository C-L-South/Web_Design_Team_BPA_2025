# Quick Reference: Golden Ratio Typography

## 🎯 Quick Start

Your website now automatically scales all text through the accessibility settings. Users can choose from:
- **Normal** - Default (100%)
- **Large** - 25% bigger
- **Extra Large** - 50% bigger

## 📏 Font Size Map

| Use Case | CSS Variable | Size (Normal) | Sass/Less |
|----------|-------------|--------------|-----------|
| Main heading | `--font-size-1` | 6.875rem | 110px |
| Large heading | `--font-size-2` | 4.25rem | 68px |
| Section title | `--font-size-3` | 2.625rem | 42px |
| Subheading | `--font-size-4` | 1.625rem | 26px |
| Body text | `--font-size-5` | 1rem | 16px |
| Small text | `--font-size-6` | 0.625rem | 10px |
| Extra small | `--font-size-7` | 0.3875rem | 6.2px |

## 💻 Usage Examples

```css
/* Headings */
h1 { font-size: var(--font-size-3); }
h2 { font-size: var(--font-size-4); }
h3 { font-size: var(--font-size-4); }

/* Body */
p { font-size: var(--font-size-5); }
a { font-size: var(--font-size-5); }
label { font-size: var(--font-size-5); }

/* Small text */
small, .caption { font-size: var(--font-size-6); }
.helper-text { font-size: var(--font-size-6); }

/* Extra small */
.micro { font-size: var(--font-size-7); }
```

## 🎮 JavaScript Control

```javascript
// Change text size
window.setTextSize('normal');    // 100%
window.setTextSize('large');     // 125%
window.setTextSize('xlarge');    // 150%

// Get current size
const size = window.getTextSize();  // Returns: "normal" | "large" | "xlarge"

// Get all preferences
const prefs = window.getAccessibilityPrefs();  // { textSize, fontFamily, grayscale, lineReader }

// Set multiple options
window.updateAccessibilityPrefs({
  textSize: 'large',
  fontFamily: 'opendyslexic',
  grayscale: false,
  lineReader: false
});
```

## ✅ What's Included

- ✅ CSS variables for all 7 font sizes
- ✅ Dynamic scaling (normal, large, xlarge)
- ✅ All CSS files updated with variables
- ✅ JavaScript API ready to use
- ✅ LocalStorage persistence
- ✅ Golden ratio proportions maintained

## 📝 Files Modified

1. `/css/accessibility.css` - Golden ratio variables & scaling
2. `/css/style.css` - Uses font-size variables
3. `/css/home.css` - Uses font-size variables
4. `/css/auth.css` - Uses font-size variables
5. `/css/blog.css` - Uses font-size variables
6. `/css/forum.css` - Uses font-size variables
7. `/css/appointment.css` - Uses font-size variables
8. `/css/helplines.css` - Uses font-size variables
9. `/css/information.css` - Uses font-size variables
10. `/css/navigation.css` - Uses font-size variables
11. `/css/settings_info.css` - Uses font-size variables
12. `/js/accessibility.js` - Enhanced with text sizing

## 🔧 Adding to New Elements

Always use variables instead of hardcoded sizes:

```css
/* ❌ DON'T DO THIS */
.new-element { font-size: 20px; }

/* ✅ DO THIS */
.new-element { font-size: var(--font-size-4); }
```

## 🚀 Implementation in Settings

Add this to your accessibility/settings page:

```html
<div class="settings-card">
  <h2>Text Size</h2>
  <button onclick="window.setTextSize('normal')">Normal</button>
  <button onclick="window.setTextSize('large')">Large</button>
  <button onclick="window.setTextSize('xlarge')">Extra Large</button>
</div>
```

## 🎨 Scaling Math

All sizes use this formula:
```
computed-size = base-size × scale-multiplier
```

- **Normal**: base × 1 = base
- **Large**: base × 1.25 = base + 25%
- **Extra Large**: base × 1.5 = base + 50%

Perfect ratios maintained at all scales!

## 📱 Responsive Behavior

The font sizes scale smoothly across devices:
- Mobile phones: All sizes responsive
- Tablets: All sizes responsive
- Desktop: All sizes responsive
- Zoom-friendly: Works with browser zoom

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Text not scaling | Check element uses `var(--font-size-X)` |
| Can't find variable | Verify accessibility.css is imported |
| Preference not saving | Check localStorage isn't disabled |
| Size resets on refresh | Might be private mode - normal behavior |

## 📚 Documentation

- Full documentation: `GOLDEN_RATIO_FONTS.md`
- Settings integration guide: `SETTINGS_INTEGRATION.md`
- This quick reference: `QUICK_REFERENCE.md`

---

**Ready to use!** The system is fully implemented and working. Just add UI controls to your settings page, and you're done! 🎉
