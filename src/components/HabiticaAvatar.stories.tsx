import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from './HabiticaAvatar';
import userDataRaw from '../mocks/user.json';
import withGifBackgroundRaw from '../mocks/withGifBackground.json';
import emptyUserRaw from '../mocks/emptyUser.json';
import type { HabiticaMember } from '../types/HabiticaMember';

// Fix type mismatches for hair fields (convert numbers to strings)
const userData: HabiticaMember = userDataRaw as any;
const withGifBackground: HabiticaMember = withGifBackgroundRaw as any;
const emptyUser: HabiticaMember = emptyUserRaw as any;

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar',
  component: HabiticaAvatar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    member: userData,
  },
};

export const WithMount: Story = {
  args: {
    member: { ...userData, items: { ...userData.items, currentMount: 'Fox-AutumnLeaf' } },
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

export const Sleeping: Story = {
  args: {
    member: {...userData, preferences: { ...userData.preferences, sleep: true }},
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

export const WithGifBackground: Story = {
  args: {
    member: withGifBackground,
  },
};

export const EmptyUser: Story = {
  args: {
    member: emptyUser,
  },
};