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
npm install anitawlosek/habitica-avatar-react#v0.0.6-alpha
```

or with yarn:

```bash
yarn add anitawlosek/habitica-avatar-react#v0.0.6-alpha
```

## Usage

```tsx
import { HabiticaAvatar } from 'habitica-avatar-react';
import type { HabiticaMember } from 'habitica-avatar-react';
// For performance optimization, also import:
// import type { ImagesMeta, AvatarManifestItems } from 'habitica-avatar-manifest';

const member: HabiticaMember = {
  // ...see /src/mocks/user.json for example structure
};

export default function Example() {
  return (
    <HabiticaAvatar member={member} showClassBadge withBackground />
  );
}
```

### Loading Callbacks

You can track avatar loading state using the loading callback props:

```tsx
import { HabiticaAvatar } from 'habitica-avatar-react';
import { useState } from 'react';

export default function LoadingExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && <div>Loading avatar...</div>}
      <HabiticaAvatar 
        member={member}
        onLoadingStart={() => setIsLoading(true)}
        onLoadingEnd={() => setIsLoading(false)}
      />
    </div>
  );
}
```

### Performance Optimization

For better performance when rendering multiple avatars, you can pre-fetch the manifest data once and pass it to all avatar components:

```tsx
import { HabiticaAvatar } from 'habitica-avatar-react';
import { getHabiticaImagesMeta, getHabiticaAvatarManifestItems } from 'habitica-avatar-manifest';
import { useEffect, useState } from 'react';

export default function MultipleAvatars({ members }) {
  const [manifestData, setManifestData] = useState(null);

  useEffect(() => {
    const loadManifestData = async () => {
      const [imagesMeta, avatarManifestItems] = await Promise.all([
        getHabiticaImagesMeta(),
        getHabiticaAvatarManifestItems()
      ]);
      setManifestData({ imagesMeta, avatarManifestItems });
    };

    loadManifestData();
  }, []);

  if (!manifestData) return <div>Loading...</div>;

  return (
    <div>
      {members.map(member => (
        <HabiticaAvatar 
          key={member.id}
          member={member}
          imagesMeta={manifestData.imagesMeta}
          avatarManifestItems={manifestData.avatarManifestItems}
        />
      ))}
    </div>
  );
}
```

This approach prevents each avatar from individually fetching the same manifest data, significantly improving performance when rendering multiple avatars.

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
| `imagesMeta`        | `ImagesMeta`                           | —               | Pre-fetched images metadata for performance optimization.                     |
| `avatarManifestItems` | `AvatarManifestItems`                | —               | Pre-fetched avatar manifest items for performance optimization.               |
| `onLoadingStart`    | `() => void`                           | —               | Callback fired when avatar loading starts.                                   |
| `onLoadingEnd`      | `() => void`                           | —               | Callback fired when avatar loading ends (all images loaded).                 |
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
