import React from 'react';
import { HabiticaMember, OverrideAvatarGear } from '../types';
import Sprite from './Sprite';

interface HairDisplayProps {
  member: HabiticaMember;
  overrideAvatarGear?: OverrideAvatarGear;
  specialMountClass: string;
}

const HairDisplay: React.FC<HairDisplayProps> = ({ 
  member, 
  overrideAvatarGear, 
  specialMountClass 
}) => {
  if (!member.preferences?.hair) {
    return null;
  }

  const getHairClass = (slot: 'bangs' | 'base' | 'mustache' | 'beard') => {
    if (overrideAvatarGear?.hair) {
      if (overrideAvatarGear.hair[slot]) {
        return `hair_${slot}_${overrideAvatarGear.hair[slot]}_${member.preferences.hair.color}`;
      }
      if (overrideAvatarGear.hair.color) {
        return `hair_${slot}_${member.preferences.hair[slot]}_${overrideAvatarGear.hair.color}`;
      }
    }
    
    return `hair_${slot}_${member.preferences.hair[slot]}_${member.preferences.hair.color}`;
  };

  return (
    <>
      {/* Hair Elements */}
      {(['bangs', 'base', 'mustache', 'beard'] as const).map((type) => (
        <Sprite
          key={type}
          className={`${getHairClass(type)} ${specialMountClass}`.trim()}
        />
      ))}
    </>
  );
};

export const HairFlower: React.FC<{ member: HabiticaMember; specialMountClass?: string }> = ({ 
  member, 
  specialMountClass = '' 
}) => {
  if (!member.preferences?.hair) {
    return null;
  }

  return (
    <Sprite className={`hair_flower_${member.preferences.hair.flower} ${specialMountClass}`.trim()} />
  );
};

export default HairDisplay;