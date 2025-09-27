# Simple Sprite URL Generation Example

```javascript
import { getSpriteUrl } from 'habitica-avatar-react';

// These automatically generate the correct Habitica URLs:

console.log(getSpriteUrl('skin_f5d5ae'));
// → 'https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png'

console.log(getSpriteUrl('hair_bangs_1_8b4513'));
// → 'https://habitica-assets.s3.amazonaws.com/mobileApp/images/hair_bangs_1_8b4513.png'

console.log(getSpriteUrl('Pet-Wolf-Base'));
// → 'https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-Wolf-Base.png'

console.log(getSpriteUrl('Mount_Body_Dragon-Red'));
// → 'https://habitica-assets.s3.amazonaws.com/mobileApp/images/Mount_Body_Dragon-Red.png'

// The Sprite component automatically applies these URLs as background-image:
<Sprite className="skin_f5d5ae" />
// Renders: <span className="skin_f5d5ae" style={{ backgroundImage: 'url(https://...)' }} />
```

## Custom Configuration (Optional)

```javascript
import { updateSpriteConfig } from 'habitica-avatar-react';

// Use your own CDN or different settings
updateSpriteConfig({
  baseUrl: 'https://my-cdn.com/habitica-sprites',
  defaultExtension: 'png',
  gifExtensions: ['animated_sparkles', 'flying_pet'], // These will use .gif
});
```