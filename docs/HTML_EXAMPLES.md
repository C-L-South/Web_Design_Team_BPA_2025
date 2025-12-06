# HTML Implementation Examples

## Complete Working Examples

Here are real examples showing how the golden ratio typography system works in practice.

---

## Example 1: Hero Section

```html
<section class="hero-section">
  <div class="hero-container">
    <div class="hero-text">
      <h1 style="font-size: var(--font-size-2);">
        Welcome to Your Website
      </h1>
      <p style="font-size: var(--font-size-5);">
        This is the main description using the body text size.
        It scales automatically with user preferences.
      </p>
      <button style="font-size: var(--font-size-5);">
        Get Started
      </button>
    </div>
  </div>
</section>
```

**How it scales:**
- Heading: 68px → 85px → 102px
- Text: 16px → 20px → 24px
- Button: 16px → 20px → 24px

---

## Example 2: Card Component

```html
<div class="card">
  <img src="image.jpg" alt="Card image">
  
  <h3 style="font-size: var(--font-size-4); margin-bottom: 12px;">
    Card Title Here
  </h3>
  
  <p style="font-size: var(--font-size-5); color: #666;">
    This is the card description text. It uses the standard body
    text size and will scale proportionally with user preferences.
  </p>
  
  <small style="font-size: var(--font-size-6); color: #999;">
    Posted on March 15, 2024
  </small>
</div>
```

**How it scales:**
- Title: 26px → 32.5px → 39px
- Description: 16px → 20px → 24px
- Meta: 10px → 12.5px → 15px

---

## Example 3: Form

```html
<form class="contact-form">
  <div class="form-group">
    <label style="font-size: var(--font-size-5);">
      Full Name
    </label>
    <input 
      type="text"
      style="font-size: var(--font-size-5);"
      placeholder="Enter your name"
    >
  </div>
  
  <div class="form-group">
    <label style="font-size: var(--font-size-5);">
      Email Address
    </label>
    <input 
      type="email"
      style="font-size: var(--font-size-5);"
      placeholder="your@email.com"
    >
  </div>
  
  <button style="font-size: var(--font-size-5);">
    Submit
  </button>
</form>
```

**How it scales:**
- Labels: 16px → 20px → 24px
- Inputs: 16px → 20px → 24px
- Button: 16px → 20px → 24px

---

## Example 4: Navigation Bar

```html
<nav class="navbar">
  <div class="logo">
    <img src="logo.png" alt="Logo">
    <span style="font-size: var(--font-size-4);">
      BPA Website
    </span>
  </div>
  
  <ul class="nav-links">
    <li>
      <a href="/" style="font-size: var(--font-size-5);">
        Home
      </a>
    </li>
    <li>
      <a href="/about" style="font-size: var(--font-size-5);">
        About
      </a>
    </li>
    <li>
      <a href="/contact" style="font-size: var(--font-size-5);">
        Contact
      </a>
    </li>
  </ul>
  
  <button style="font-size: var(--font-size-5);">
    Login
  </button>
</nav>
```

**How it scales:**
- Logo text: 26px → 32.5px → 39px
- Nav links: 16px → 20px → 24px
- Button: 16px → 20px → 24px

---

## Example 5: Blog Post

```html
<article class="blog-post">
  <header>
    <h1 style="font-size: var(--font-size-3);">
      Understanding the Golden Ratio in Typography
    </h1>
    
    <div class="post-meta">
      <span style="font-size: var(--font-size-6);">
        By John Doe
      </span>
      <span style="font-size: var(--font-size-6);">
        March 20, 2024
      </span>
    </div>
  </header>
  
  <section class="post-content">
    <p style="font-size: var(--font-size-5); line-height: 1.7;">
      The golden ratio is a mathematical proportion found throughout nature
      and used in art and architecture. In typography, it creates visually
      pleasing font size relationships...
    </p>
    
    <h2 style="font-size: var(--font-size-4); margin-top: 30px;">
      Why It Matters
    </h2>
    
    <p style="font-size: var(--font-size-5); line-height: 1.7;">
      Good typography isn't just about aesthetics. It's about readability,
      accessibility, and creating a pleasant experience for your users.
    </p>
  </section>
</article>
```

**How it scales:**
- Main heading: 42px → 52.5px → 63px
- Subheading: 26px → 32.5px → 39px
- Body text: 16px → 20px → 24px
- Meta text: 10px → 12.5px → 15px

---

## Example 6: Testimonial Section

```html
<section class="testimonials">
  <h2 style="font-size: var(--font-size-3);">
    What Users Say
  </h2>
  
  <div class="testimonial-card">
    <p style="font-size: var(--font-size-5); font-style: italic;">
      "This accessibility feature has made a huge difference for me.
      I can now read the website comfortably."
    </p>
    
    <div class="testimonial-author">
      <strong style="font-size: var(--font-size-4);">
        Sarah Johnson
      </strong>
      <p style="font-size: var(--font-size-6);">
        User from New York
      </p>
    </div>
  </div>
</section>
```

**How it scales:**
- Section title: 42px → 52.5px → 63px
- Quote: 16px → 20px → 24px
- Author name: 26px → 32.5px → 39px
- Author location: 10px → 12.5px → 15px

---

## Example 7: Complete Settings Panel

```html
<div class="settings-panel">
  <h1 style="font-size: var(--font-size-3);">
    Accessibility Settings
  </h1>
  
  <div class="settings-group">
    <h2 style="font-size: var(--font-size-4);">
      Text Size
    </h2>
    
    <p style="font-size: var(--font-size-5); color: #666;">
      Choose your preferred text size for better readability.
    </p>
    
    <div class="button-group">
      <button 
        onclick="window.setTextSize('normal')"
        style="font-size: var(--font-size-5);"
      >
        Normal
      </button>
      
      <button 
        onclick="window.setTextSize('large')"
        style="font-size: var(--font-size-5);"
      >
        Large (125%)
      </button>
      
      <button 
        onclick="window.setTextSize('xlarge')"
        style="font-size: var(--font-size-5);"
      >
        Extra Large (150%)
      </button>
    </div>
  </div>
  
  <div class="settings-group">
    <h2 style="font-size: var(--font-size-4);">
      Preview
    </h2>
    
    <div style="padding: 16px; background: #f5f5f5; border-radius: 8px;">
      <p style="font-size: var(--font-size-5); margin-bottom: 8px;">
        This is how your text will look at the selected size.
      </p>
      <small style="font-size: var(--font-size-6); color: #666;">
        The entire website will scale to match your preference.
      </small>
    </div>
  </div>
</div>
```

---

## Example 8: Footer

```html
<footer class="footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3 style="font-size: var(--font-size-4);">
        Quick Links
      </h3>
      
      <ul style="list-style: none; padding: 0;">
        <li>
          <a href="/privacy" style="font-size: var(--font-size-5);">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="/terms" style="font-size: var(--font-size-5);">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="/contact" style="font-size: var(--font-size-5);">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p style="font-size: var(--font-size-6);">
      © 2024 Your Website. All rights reserved.
    </p>
  </div>
</footer>
```

**How it scales:**
- Section titles: 26px → 32.5px → 39px
- Links: 16px → 20px → 24px
- Copyright: 10px → 12.5px → 15px

---

## CSS Only Version (Recommended)

Instead of inline styles, define classes in CSS:

```css
/* In your CSS file */
.hero-title { font-size: var(--font-size-2); }
.section-title { font-size: var(--font-size-3); }
.heading { font-size: var(--font-size-4); }
.body-text { font-size: var(--font-size-5); }
.small-text { font-size: var(--font-size-6); }
.tiny-text { font-size: var(--font-size-7); }

/* Then use in HTML */
<h1 class="hero-title">Welcome</h1>
<p class="body-text">Description text</p>
<small class="small-text">Meta information</small>
```

This is cleaner and follows best practices! 🎯

---

## Testing Your Implementation

Open browser console (F12) and try:

```javascript
// Test size 1
window.setTextSize('normal');
// Check: all text at base size

// Test size 2
window.setTextSize('large');
// Check: all text 25% larger, proportions maintained

// Test size 3
window.setTextSize('xlarge');
// Check: all text 50% larger, still readable

// Reset
window.setTextSize('normal');
// Check: back to original size
```

---

## Real-World Checklist

When implementing on your pages:

- ✅ Replace all hardcoded `font-size: 16px` with `var(--font-size-5)`
- ✅ Use `var(--font-size-3)` or `var(--font-size-2)` for main headings
- ✅ Use `var(--font-size-4)` for subheadings
- ✅ Use `var(--font-size-5)` for body text and links
- ✅ Use `var(--font-size-6)` for small text and labels
- ✅ Use `var(--font-size-7)` for extra small text only
- ✅ Test all three sizes (normal, large, xlarge)
- ✅ Verify no text gets cut off
- ✅ Check layout doesn't break
- ✅ Verify colors and contrast still work

---

## Summary

The golden ratio typography system makes it simple:

1. **Use the right variable** - Pick font-size-1 through font-size-7
2. **Everything scales together** - User picks their size preference
