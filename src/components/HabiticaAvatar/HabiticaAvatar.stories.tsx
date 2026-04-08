import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from './HabiticaAvatar';
import userDataRaw from '../../mocks/user.json';
import withGifBackgroundRaw from '../../mocks/withGifBackground.json';
import emptyUserRaw from '../../mocks/emptyUser.json';
import type { HabiticaMember } from '../../types/HabiticaMember';

// Fix type mismatches for hair fields (convert numbers to strings)
const userData = userDataRaw as HabiticaMember;
const withGifBackground = withGifBackgroundRaw as HabiticaMember;
const emptyUser = emptyUserRaw as HabiticaMember;

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar',
  component: HabiticaAvatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    member: {
      control: 'object',
      description: 'The user/member object to render. Required.',
      table: {
        type: { summary: 'HabiticaMember' },
      },
    },
    debugMode: {
      control: 'boolean',
      description: 'Adds debug class for styling/debugging.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClassBadge: {
      control: 'boolean',
      description: 'Show the class badge under the avatar.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    avatarOnly: {
      control: 'boolean',
      description: 'Show only the avatar (no pet/mount/background).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    withBackground: {
      control: 'boolean',
      description: 'Show background even if avatarOnly is true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    overrideAvatarGear: {
      control: 'object',
      description: 'Override gear, hair, skin, etc. for the avatar.',
      table: {
        type: { summary: 'OverrideAvatarGear' },
        defaultValue: { summary: '{}' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the avatar container. Accepts a CSS string ("282px") or a plain number (282). Height is derived automatically from the aspect ratio.',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'141px'" },
      },
    },
    centerAvatar: {
      control: 'boolean',
      description: 'Center the avatar in its container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    spritesMargin: {
      control: 'text',
      description: 'Margin for the sprites container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'0 auto 0 24px'" },
      },
    },
    overrideTopPadding: {
      control: 'text',
      description: 'Override the top padding of the avatar.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    showVisualBuffs: {
      control: 'boolean',
      description: 'Show visual buffs (snowball, ghost, etc).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showWeapon: {
      control: 'boolean',
      description: 'Show weapon/shield sprites.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    flatGear: {
      control: 'object',
      description: 'Flat gear data for two-handed weapon logic.',
      table: {
        type: { summary: 'FlatGear' },
        defaultValue: { summary: '{}' },
      },
    },
    currentEventList: {
      control: 'object',
      description: 'List of current events (for April Fools, etc).',
      table: {
        type: { summary: 'CurrentEventList' },
        defaultValue: { summary: '[]' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the avatar.',
      table: {
        type: { summary: '(member: HabiticaMember) => void' },
      },
    },
    onLoadingStart: {
      action: 'avatar-start-loading',
      description: 'Called when avatar starts loading.',
      table: {
        type: { summary: '() => void' },
      },
    },
    onLoadingEnd: {
      action: 'avatar-end-loading',
      description: 'Called when all avatar images finish loading.',
      table: {
        type: { summary: '() => void' },
      },
    },
    gearOnly: {
      control: 'boolean',
      description: 'Show only gear sprites — hides skin, hair, head, mount, pet, background, and other non-gear elements.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
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

// Component to demonstrate loading callbacks
const AvatarWithLoadingState = (args: React.ComponentProps<typeof HabiticaAvatar>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadStartTime, setLoadStartTime] = useState<number | null>(null);
  const [loadDuration, setLoadDuration] = useState<number | null>(null);

  const handleStartLoading = useCallback(() => {
    setIsLoading(true);
    setLoadStartTime(Date.now());
    setLoadDuration(null);
    console.log('🚀 Avatar started loading');
  }, []);

  const handleEndLoading = useCallback(() => {
    setIsLoading(false);
    const duration = loadStartTime ? Date.now() - loadStartTime : 0;
    setLoadDuration(duration);
    console.log(`✅ Avatar finished loading in ${duration}ms`);
  }, [loadStartTime]);

  return (
    <div>
      <div style={{ marginBottom: '16px', minHeight: '60px', textAlign: 'center' }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: isLoading ? '#ff6b35' : '#28a745',
          marginBottom: '8px'
        }}>
          {isLoading ? '⏳ Loading Avatar...' : '✅ Avatar Ready!'}
        </div>
        
        {loadDuration !== null && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            Last load took: {loadDuration}ms
          </div>
        )}
        
        <div style={{ 
          fontSize: '12px', 
          color: '#999',
          marginTop: '4px'
        }}>
          Check the console and Actions panel for callback logs
        </div>
      </div>
      
      <HabiticaAvatar
        {...args}
        centerAvatar
        onLoadingStart={handleStartLoading}
        onLoadingEnd={handleEndLoading}
      />
    </div>
  );
};

export const WithLoadingCallbacks: Story = {
  render: AvatarWithLoadingState,
  args: {
    member: userData,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the loading callbacks. Watch the loading indicator above the avatar and check the console/Actions panel for callback logs. The callbacks track when avatar loading starts and when all background images finish loading.',
      },
    },
  },
};

export const GearOnly: Story = {
  args: {
    member: userData,
    gearOnly: true,
  },
};

export const CustomWidth: Story = {
  args: {
    member: userData,
    width: '282px',
  },
};

export const LoadingCallbacksWithGifBackground: Story = {
  render: AvatarWithLoadingState,
  args: {
    member: withGifBackground,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading callbacks with a mounted avatar - this will have more images to load, so you can see the loading duration difference.',
      },
    },
  },
};