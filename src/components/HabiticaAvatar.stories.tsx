import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from './HabiticaAvatar';
import { 
    wizardMemberData,
  warriorMockMember, 
  mockMemberWithMount, 
  mockMemberSleeping, 
  mockMemberWithBuffs 
} from '../mocks/memberData';

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar',
  component: HabiticaAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    member: {
      description: 'The Habitica member object containing all avatar data',
    },
    debugMode: {
      control: 'boolean',
      description: 'Enable debug mode to show borders around elements',
    },
    avatarOnly: {
      control: 'boolean',
      description: 'Show only the avatar without pets or mounts',
    },
    hideClassBadge: {
      control: 'boolean',
      description: 'Hide the class badge below the avatar',
    },
    withBackground: {
      control: 'boolean',
      description: 'Show background even in avatar-only mode',
    },
    width: {
      control: 'text',
      description: 'Width of the avatar container',
    },
    height: {
      control: 'text',
      description: 'Height of the avatar container',
    },
    centerAvatar: {
      control: 'boolean',
      description: 'Center the avatar horizontally',
    },
    showVisualBuffs: {
      control: 'boolean',
      description: 'Show visual effects from buffs',
    },
    showWeapon: {
      control: 'boolean',
      description: 'Show equipped weapons',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when avatar is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    member: wizardMemberData,
  },
};

export const WithMount: Story = {
  args: {
    member: mockMemberWithMount,
  },
};

export const Sleeping: Story = {
  args: {
    member: mockMemberSleeping,
  },
};

export const WithBuffs: Story = {
  args: {
    member: mockMemberWithBuffs,
    showVisualBuffs: true,
  },
};

export const Warrior: Story = {
  args: {
    member: warriorMockMember,
  },
};

export const AvatarOnly: Story = {
  args: {
    member: warriorMockMember,
    avatarOnly: true,
  },
};

export const WithoutBackground: Story = {
  args: {
    member: warriorMockMember,
    avatarOnly: true,
    withBackground: false,
  },
};

export const DebugMode: Story = {
  args: {
    member: warriorMockMember,
    debugMode: true,
  },
};

export const Centered: Story = {
  args: {
    member: warriorMockMember,
    centerAvatar: true,
  },
};

// export const CustomSize: Story = {
//   args: {
//     member: warriorMockMember,
//     width: '200px',
//     height: '220px',
//   },
// };

// export const WithCustomSpriteUrls: Story = {
//   args: {
//     member: warriorMockMember,
//   },
//   decorators: [
//     (Story) => {
//       // Example of how you might update sprite configuration
//       // In a real app, you'd do this once at startup
//       React.useEffect(() => {
//         // This is just for demonstration - in practice you'd call updateSpriteConfig
//         // with real Habitica sprite URLs
//         console.log('Sprite configuration can be updated for dynamic background images');
//       }, []);
      
//       return <Story />;
//     },
//   ],
// };