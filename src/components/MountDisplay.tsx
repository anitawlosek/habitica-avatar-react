import React from 'react';
import { HabiticaMember } from '../types';
import Sprite from './Sprite';

interface MountDisplayProps {
  member: HabiticaMember;
  avatarOnly: boolean;
}

const MountDisplay: React.FC<MountDisplayProps> = ({ member, avatarOnly }) => {
  if (avatarOnly || !member.items.currentMount) {
    return null;
  }

  return (
    <>
      {/* Mount Body */}
      <Sprite className={`Mount_Body_${member.items.currentMount}`} />
      {/* Mount Head - rendered later in the component tree */}
    </>
  );
};

export const MountHead: React.FC<MountDisplayProps> = ({ member, avatarOnly }) => {
  if (avatarOnly || !member.items.currentMount) {
    return null;
  }

  return <Sprite className={`Mount_Head_${member.items.currentMount}`} />;
};

export default MountDisplay;