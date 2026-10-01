# Google Sans Font Integration

This document explains how Google Sans fonts are integrated throughout the SupriAI extension.

## Font Files

The following Google Sans font files are included in the `fonts/` directory:

- **GoogleSans-Regular.woff** (400 weight) - For body text
- **GoogleSans-Medium.woff** (500 weight) - For emphasis and subheadings
- **GoogleSans-Bold.woff** (700 weight) - For headings and strong emphasis

## Implementation

### 1. Font Definitions (`styles/fonts.css`)

All font-face declarations are centralized in `styles/fonts.css`:

```css
@font-face {
  font-family: "Google Sans";
  src: url("../fonts/GoogleSans-Regular.woff") format("woff");
  font-weight: 400;
}

@font-face {
  font-family: "Google Sans";
  src: url("../fonts/GoogleSans-Medium.woff") format("woff");
  font-weight: 500;
}

@font-face {
  font-family: "Google Sans";
  src: url("../fonts/GoogleSans-Bold.woff") format("woff");
  font-weight: 700;
}
```

### 2. Global Application

The font is applied globally with fallbacks:

```css
* {
  font-family:
    "Google Sans",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}
```

### 3. CSS Files Integration

- **popup.css** - Imports fonts.css and applies Google Sans to the main popup
- **styles/curation.css** - Imports fonts.css for curation workflow
- **styles/fonts.css** - Central font definitions file

### 4. Manifest Configuration

The fonts are declared in `manifest.json` as web-accessible resources:

```json
"web_accessible_resources": [{
  "resources": [
    "styles/fonts.css",
    "fonts/GoogleSans-Regular.woff",
    "fonts/GoogleSans-Medium.woff",
    "fonts/GoogleSans-Bold.woff"
  ],
  "matches": ["<all_urls>"]
}]
```

## Typography Utilities

Helper classes are available for font weight control:

- `.font-regular` - 400 weight
- `.font-medium` - 500 weight
- `.font-bold` - 700 weight

## Usage Examples

### HTML

```html
<h1>SupriAI</h1>
<!-- Automatically uses Google Sans -->
<p class="font-medium">Medium weight text</p>
<strong class="font-bold">Bold text</strong>
```

### CSS

```css
.custom-element {
  font-family: "Google Sans", sans-serif;
  font-weight: 500; /* Medium */
}
```

## Browser Support

The WOFF format is supported in:

- Chrome/Edge 5+
- Firefox 3.6+
- Safari 5.1+
- Opera 11.5+

## Performance

- **font-display: swap** - Ensures text remains visible during font load
- **WOFF format** - Optimized file size for web delivery
- **Preloading** - Fonts are loaded with the initial CSS

## Troubleshooting

If fonts don't load:

1. Check browser console for 404 errors
2. Verify font files exist in `fonts/` directory
3. Ensure `styles/fonts.css` is imported in your CSS
4. Reload the extension in `chrome://extensions/`
5. Clear browser cache and reload

## License

Google Sans is a proprietary typeface owned by Google. Ensure you have proper licensing for your use case.
