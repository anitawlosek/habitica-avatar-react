# Sprite System

The Habitica Avatar React library includes a comprehensive sprite system that allows you to dynamically provide background-image URLs for all avatar elements.

## Overview

All visual elements in the avatar (hair, skin, gear, pets, mounts, etc.) are rendered using the `Sprite` component, which automatically applies background-image styles based on CSS class names.

## Components

### Sprite Component

The `Sprite` component is a simple wrapper around a `<span>` element that automatically applies background-image styles:

```jsx
import { Sprite } from 'habitica-avatar-react';

// This will render a span with a background image if configured
<Sprite className="skin_f5d5ae" />
```

### Sprite Configuration

The sprite configuration system automatically maps CSS class names to Habitica image URLs using a simple pattern:

**Pattern**: `{baseUrl}/{className}.{extension}`

```javascript
import { updateSpriteConfig } from 'habitica-avatar-react';

// Default configuration (you can customize if needed)
updateSpriteConfig({
  baseUrl: 'https://habitica-assets.s3.amazonaws.com/mobileApp/images',
  defaultExtension: 'png',
  gifExtensions: ['animated_sprite_class'], // Classes that should use .gif
});
```

**Examples**:
- `skin_f5d5ae` → `https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png`
- `hair_bangs_1_8b4513` → `https://habitica-assets.s3.amazonaws.com/mobileApp/images/hair_bangs_1_8b4513.png`
- `Pet-Wolf-Base` → `https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-Wolf-Base.png`

### Sprite Dimensions and Format Detection

Each Habitica sprite has unique dimensions (e.g., some hair flowers are 90x90, others are 114x90) and may be PNG or GIF format. The system automatically detects both:

```javascript
import { loadSpriteDimensions, autoDetectSpriteFormat } from 'habitica-avatar-react';

// Load actual image dimensions and detect format (async)
const result = await loadSpriteDimensions('hair_flower_10');
// Returns: { width: 114, height: 90, format: 'png' } or null if failed

// Auto-detect format and update configuration
const format = await autoDetectSpriteFormat('some_animated_sprite');
// Returns: 'gif' | 'png' | null, and automatically adds GIFs to config

// Check if dimensions are already cached (sync)
const cached = getCachedSpriteDimensions('hair_flower_10');
// Returns: { width: 114, height: 90, format: 'png' } or null
```

**Format Detection Process:**
1. Tries PNG first (most common)
2. If PNG fails, tries GIF
3. Caches successful result
4. Automatically updates `gifExtensions` config for GIFs

## Utilities

### getSpriteUrl

Get the full URL for a sprite based on its class name:

```javascript
import { getSpriteUrl } from 'habitica-avatar-react';

const url = getSpriteUrl('skin_f5d5ae');
// Returns: 'https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin/f5d5ae.png'
```

### getSpriteStyle

Get inline CSS styles for a sprite:

```javascript
import { getSpriteStyle } from 'habitica-avatar-react';

const style = getSpriteStyle('hair_bangs_1_8b4513');
// Returns: { backgroundImage: 'url(https://...)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }
```

## Integration Options

### Option 1: CSS Files (Traditional)

If you have Habitica's CSS files, you can include them in your project and the components will work with existing CSS classes.

### Option 2: Dynamic URLs (Recommended)

Configure sprite URLs dynamically for better control and performance:

```javascript
// At app startup (optional - works with defaults)
import { updateSpriteConfig } from 'habitica-avatar-react';

updateSpriteConfig({
  baseUrl: 'https://your-cdn.com/habitica-sprites', // Custom CDN
  defaultExtension: 'png',
  gifExtensions: ['some_animated_class'], // Any animated sprites
});
```

### Option 3: Hybrid Approach

Use both CSS files for some sprites and dynamic URLs for others. The dynamic URLs will take precedence when configured.

## Class Name Patterns

The library uses consistent class name patterns for different avatar elements:

- **Skin**: `skin_{color}` (e.g., `skin_f5d5ae`)
- **Hair Bangs**: `hair_bangs_{style}_{color}` (e.g., `hair_bangs_1_8b4513`)
- **Hair Base**: `hair_base_{style}_{color}` (e.g., `hair_base_1_8b4513`) 
- **Hair Flower**: `hair_flower_{type}` (e.g., `hair_flower_0`)
- **Gear**: `{size}_{type}_{class}_{variant}` (e.g., `broad_armor_warrior_1`)
- **Pets**: `Pet-{species}-{color}` (e.g., `Pet-Wolf-Base`)
- **Mounts**: `Mount_{part}_{species}-{color}` (e.g., `Mount_Body_Dragon-Red`)
- **Effects**: Various patterns for visual buffs and special effects

## Performance Considerations

- Configure sprites once at application startup
- Use a CDN for sprite images
- Consider lazy loading for non-critical sprites
- The `Sprite` component only applies background-image styles when URLs are configured

## Contributing Sprites

If you're adding new sprite types or patterns:

1. Add the class name pattern to the sprite configuration
2. Update the relevant component to use the `Sprite` component
3. Add appropriate TypeScript types if needed
4. Test with both CSS and dynamic URL approaches