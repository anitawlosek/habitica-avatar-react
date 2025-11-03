# Habitica Avatar React

A React component library for rendering Habitica game avatars with customizable appearance, gear, pets, mounts, and visual effects.

## Features
- Render Habitica avatars with all gear, pets, mounts, and backgrounds
- Supports visual buffs (snowball, ghost, flower, seafoam, etc.)
- Customizable via props: override gear, show/hide class badge, debug mode, and more
- TypeScript support with exported types
- Easily embeddable in any React project

## Installation

This package is **not published on npm**. Install it directly from GitHub:

```bash
npm install anitawlosek/habitica-avatar-react#release
```

or with yarn:

```bash
yarn add anitawlosek/habitica-avatar-react#release
```

## Usage

```tsx
import { HabiticaAvatar } from 'habitica-avatar-react';
import type { HabiticaMember } from 'habitica-avatar-react';

const member: HabiticaMember = {
  // ...see /src/mocks/user.json for example structure
};

export default function Example() {
  return (
    <HabiticaAvatar member={member} showClassBadge withBackground />
  );
}
```

### Props

| Prop                | Type                                   | Default         | Description                                                                 |
|---------------------|----------------------------------------|-----------------|-----------------------------------------------------------------------------|
| `member`            | `HabiticaMember`                       | —               | The user/member object to render. Required.                                  |
| `debugMode`         | `boolean`                              | `false`         | Adds debug class for styling/debugging.                                      |
| `showClassBadge`    | `boolean`                              | `false`         | Show the class badge under the avatar.                                       |
| `avatarOnly`        | `boolean`                              | `false`         | Show only the avatar (no pet/mount/background).                              |
| `withBackground`    | `boolean`                              | `false`         | Show background even if `avatarOnly` is true.                                |
| `overrideAvatarGear`| `OverrideAvatarGear`                   | `{}`            | Override gear, hair, skin, etc. for the avatar.                              |
| `width`             | `string`                               | `'141px'`       | Width of the avatar container.                                               |
| `height`            | `string`                               | `'147px'`       | Height of the avatar container.                                              |
| `centerAvatar`      | `boolean`                              | `false`         | Center the avatar in its container.                                          |
| `spritesMargin`     | `string`                               | `'0 auto 0 24px'`| Margin for the sprites container.                                            |
| `overrideTopPadding`| `string \| null`                       | `null`          | Override the top padding of the avatar.                                      |
| `showVisualBuffs`   | `boolean`                              | `true`          | Show visual buffs (snowball, ghost, etc).                                    |
| `showWeapon`        | `boolean`                              | `true`          | Show weapon/shield sprites.                                                  |
| `flatGear`          | `FlatGear`                             | `{}`            | Flat gear data for two-handed weapon logic.                                  |
| `currentEventList`  | `CurrentEventList`                     | `[]`            | List of current events (for April Fools, etc).                               |
| `onClick`           | `(member: HabiticaMember) => void`     | —               | Click handler for the avatar.                                                |

### Example Data
Example user objects can be found in [`src/mocks/`](src/mocks/).

## Development

- Run Storybook for local development:
  ```bash
  npm run dev
  ```
- Build the library:
  ```bash
  npm run build
  ```

## License

### Code License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

Copyright (c) 2025 Anita Włosek

See the [LICENSE](LICENSE) file for the full license text.

### Disclaimer

This project is **not affiliated with, endorsed by, or sponsored by HabitRPG, Inc. or Habitica**. Habitica is a trademark of HabitRPG, Inc.
