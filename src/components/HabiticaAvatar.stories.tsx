import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from './HabiticaAvatar';
import userDataRaw from '../mocks/user.json';
import type { HabiticaMember } from '../types/HabiticaMember';

// Fix type mismatches for hair fields (convert numbers to strings)
const userData: HabiticaMember = {
  ...userDataRaw,
  preferences: {
    ...userDataRaw.preferences,
    hair: {
      ...userDataRaw.preferences.hair,
      base: String(userDataRaw.preferences.hair.base),
      bangs: String(userDataRaw.preferences.hair.bangs),
      beard: String(userDataRaw.preferences.hair.beard),
      mustache: String(userDataRaw.preferences.hair.mustache),
      flower: String(userDataRaw.preferences.hair.flower),
    },
  },
};

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar/UserJson',
  component: HabiticaAvatar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FromUserJson: Story = {
  args: {
    member: userData,
  },
};

export const WithVisualBuff: Story = {
  args: {
    member: {
      ...userData, stats: {
        ...userData.stats, buffs: {
          ...userData.stats.buffs,
          spookySparkles: true
        }
      }
    },
  },
};

export const WithClassBadge: Story = {
  args: {
    member: userData,
    showClassBadge: true,
  },
};

export const DebugMode: Story = {
  args: {
    member: userData,
    debugMode: true,
  },
};

export const AvatarOnly: Story = {
  args: {
    member: userData,
    avatarOnly: true,
  },
};

export const AvatarOnlyWithBackground: Story = {
  args: {
    member: userData,
    withBackground: true,
    avatarOnly: true,
  },
};

export const WithOnClick: Story = {
  args: {
    member: userData,
    onClick: (member) => {
      alert(`Avatar clicked! Class: ${member.stats.class}`);
    },
  },
};
