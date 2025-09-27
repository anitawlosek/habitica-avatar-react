# Habitica Avatar React

A React component library for rendering Habitica game avatars with customizable appearance, gear, pets, mounts, and visual effects.

## Features

- ✅ Full TypeScript support
- 🎨 Customizable avatar rendering
- 🐾 Pet and mount display
- ⚔️ Equipment and gear visualization
- ✨ Visual buff effects
- 📱 Responsive design
- 🧪 Comprehensive test coverage
- 📚 Storybook integration
- 🔧 ESLint and Prettier configured

## Installation

```bash
npm install habitica-avatar-react
# or
yarn add habitica-avatar-react
# or
pnpm add habitica-avatar-react
```

> **Note**: This library is currently in development and not yet published to npm. For now, you can install it directly from GitHub or clone and link locally.

## Usage

```tsx
import React from 'react';
import { HabiticaAvatar } from 'habitica-avatar-react';

const member = {
  preferences: {
    skin: 'f5d5ae',
    hair: {
      color: '8b4513',
      base: '1',
      bangs: '2',
      flower: '0',
    },
    shirt: 'blue',
    size: 'broad',
    chair: 'none',
    background: 'blue',
    costume: false,
    sleep: false,
  },
  items: {
    gear: {
      equipped: {
        armor: 'armor_warrior_1',
        weapon: 'weapon_warrior_1',
        shield: 'shield_warrior_1',
        head: 'head_warrior_1',
      },
      costume: {
        // costume gear...
      },
    },
    currentPet: 'Wolf-Base',
    currentMount: '',
  },
  stats: {
    class: 'warrior',
    buffs: {
      snowball: false,
      spookySparkles: false,
      shinySeed: false,
      seafoam: false,
    },
  },
};

function App() {
  return (
    <HabiticaAvatar
      member={member}
      onClick={(member) => console.log('Avatar clicked!', member)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `member` | `HabiticaMember` | Required | The Habitica member object containing all avatar data |
| `debugMode` | `boolean` | `false` | Enable debug mode to show borders around elements |
| `avatarOnly` | `boolean` | `false` | Show only the avatar without pets or mounts |
| `hideClassBadge` | `boolean` | `false` | Hide the class badge below the avatar |
| `withBackground` | `boolean` | `false` | Show background even in avatar-only mode |
| `width` | `string` | `'141px'` | Width of the avatar container |
| `height` | `string` | `'147px'` | Height of the avatar container |
| `centerAvatar` | `boolean` | `false` | Center the avatar horizontally |
| `spritesMargin` | `string` | `'0 auto 0 24px'` | CSS margin for the sprites container |
| `overrideTopPadding` | `string` | `undefined` | Override the calculated top padding |
| `showVisualBuffs` | `boolean` | `true` | Show visual effects from buffs |
| `showWeapon` | `boolean` | `true` | Show equipped weapons |
| `flatGear` | `FlatGear` | `{}` | Gear configuration object |
| `currentEventList` | `CurrentEvent[]` | `[]` | List of current events for special effects |
| `overrideAvatarGear` | `OverrideAvatarGear` | `undefined` | Override specific gear pieces |
| `onClick` | `(member: HabiticaMember) => void` | `undefined` | Callback when avatar is clicked |

## Types

The library exports all necessary TypeScript types:

```tsx
import { 
  HabiticaMember, 
  HabiticaAvatarProps, 
  OverrideAvatarGear,
  FlatGear,
  CurrentEvent 
} from 'habitica-avatar-react';
```

## Development

### Setup

```bash
git clone https://github.com/yourusername/habitica-avatar-react.git
cd habitica-avatar-react
npm install
```

### Available Scripts

- `npm run dev` - Start Storybook development server
- `npm run build` - Build the library
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

### Storybook

To view the component library in Storybook:

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006`.

## Sprite Configuration

The library includes a simple sprite configuration system that automatically maps CSS class names to Habitica sprite URLs:

```javascript
import { updateSpriteConfig } from 'habitica-avatar-react';

// Customize the sprite configuration (optional)
updateSpriteConfig({
  baseUrl: 'https://habitica-assets.s3.amazonaws.com/mobileApp/images',
  defaultExtension: 'png',
  gifExtensions: ['some_animated_sprite'], // Class names that should use .gif
});
```

**How it works**: Class name `skin_f5d5ae` automatically becomes URL:
`https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png`

You can also use the individual sprite utilities:

```javascript
import { getSpriteUrl, getSpriteStyle } from 'habitica-avatar-react';

// Get a sprite URL (automatically generated from class name)
const url = getSpriteUrl('skin_f5d5ae');
// Returns: 'https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png'

// Get inline styles for a sprite
const style = getSpriteStyle('hair_bangs_1_8b4513');
```

## CSS Requirements

This library requires Habitica's sprite CSS files to display avatars correctly. The component uses CSS classes that correspond to Habitica's sprite system. You can either:

1. Include the appropriate CSS files in your project, or
2. Use the sprite configuration system above to provide background-image URLs dynamically

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on the original Vue.js Habitica avatar component
- Built for the Habitica community
- Inspired by the Habitica game's avatar system