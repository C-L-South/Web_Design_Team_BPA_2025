# Accessibility Settings Integration Guide

## How to Add Text Size Control to Your Settings Page

The golden ratio font system is ready to use! Here's how to integrate text size controls into your accessibility settings page.

## HTML Example (for your settings page)

```html
<!-- Text Size Control Section -->
<div class="settings-card">
  <h2>Text Size</h2>
  <p>Adjust the size of text throughout the website</p>
  
  <div class="form-group">
    <label>Choose text size:</label>
    
    <div style="display: flex; gap: 12px; margin-top: 12px;">
      <button 
        class="text-size-btn" 
        data-size="normal"
        onclick="window.setTextSize('normal')"
      >
        Normal
      </button>
      
      <button 
        class="text-size-btn" 
        data-size="large"
        onclick="window.setTextSize('large')"
      >
        Large (125%)
      </button>
      
      <button 
        class="text-size-btn" 
        data-size="xlarge"
        onclick="window.setTextSize('xlarge')"
      >
        Extra Large (150%)
      </button>
    </div>
  </div>
</div>
```

## CSS Styling for Buttons (Optional)

```css
.text-size-btn {
  padding: 10px 20px;
  border: 2px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  font-size: var(--font-size-5);
  font-weight: 500;
  transition: all 0.3s;
}

.text-size-btn:hover {
  border-color: #1E90FF;
  background-color: #f0f8ff;
}

.text-size-btn.active {
  background-color: #1E90FF;
  color: white;
  border-color: #1E90FF;
}
```

## JavaScript to Track Active Button

```javascript
// Add this to mark the currently active text size button
function updateTextSizeButtons() {
  const currentSize = window.getTextSize();
  
  document.querySelectorAll('.text-size-btn').forEach(btn => {
    if (btn.dataset.size === currentSize) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', updateTextSizeButtons);

// Call this whenever text size changes
window.setTextSize = function(size) {
  // ... existing code ...
  updateTextSizeButtons();  // Update button states
};
```

## Alternative: Radio Buttons

```html
<div class="settings-card">
  <h2>Text Size</h2>
  
  <form>
    <label style="margin: 8px 0; display: block;">
      <input 
        type="radio" 
        name="textSize" 
        value="normal"
        onchange="window.setTextSize(this.value)"
      />
      Normal
    </label>
    
    <label style="margin: 8px 0; display: block;">
      <input 
        type="radio" 
        name="textSize" 
        value="large"
        onchange="window.setTextSize(this.value)"
      />
      Large (125% bigger)
    </label>
    
    <label style="margin: 8px 0; display: block;">
      <input 
        type="radio" 
        name="textSize" 
        value="xlarge"
        onchange="window.setTextSize(this.value)"
      />
      Extra Large (150% bigger)
    </label>
  </form>
</div>
```

## Loading Saved Preference

```javascript
// This happens automatically, but here's how it works:
// When your page loads, accessibility.js calls initAccessibility()
// which loads the user's saved text size preference

// You can also manually check the saved preference:
const currentPref = window.getTextSize();
console.log('User has text size set to:', currentPref);
```

## Complete Example for Settings Page

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize text size buttons with current preference
  const currentSize = window.getTextSize();
  
  document.querySelectorAll('[data-size]').forEach(btn => {
    const btnSize = btn.getAttribute('data-size');
    if (btnSize === currentSize) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', function() {
      const newSize = this.getAttribute('data-size');
      window.setTextSize(newSize);
      
      // Update button states
      document.querySelectorAll('[data-size]').forEach(b => {
        b.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
});
```

## Testing

1. Open your settings page
2. Click a text size button
3. All text on the page should immediately scale
4. Refresh the page - your choice should be remembered
5. Open another page - your text size preference should apply everywhere

## What Gets Scaled

✅ All headings
✅ All body text
✅ All button text
✅ All form labels
✅ Navigation text
✅ Footer text
✅ Card titles and descriptions
✅ Any other text using `var(--font-size-X)`

## Troubleshooting

**Text not scaling?**
- Check that the HTML/CSS imports `accessibility.css`
- Verify that text elements use `var(--font-size-X)` instead of hardcoded sizes
- Check browser console for errors

**Button doesn't stay active?**
- Make sure you're calling `updateTextSizeButtons()` after `window.setTextSize()`
- Check that button's `data-size` attribute matches the size value

**Preference not saving?**
- Check browser console for localStorage errors
- Verify that `localStorage` is not disabled in user's browser
- Check if using private/incognito mode (localStorage may be disabled)

## Next Steps

1. Add text size control to your accessibility/settings page
2. Test all three sizes (normal, large, xlarge)
3. Verify text stays readable at all scales
4. Consider adding a preview of what each size looks like

All the CSS and JavaScript is already in place - you just need to add the HTML controls!
