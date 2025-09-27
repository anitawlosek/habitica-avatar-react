import React from 'react';
import { HabiticaMember, OverrideAvatarGear } from '../types';
import VisualBuffs from './VisualBuffs';
import MountDisplay, { MountHead } from './MountDisplay';
import PetDisplay from './PetDisplay';
import HairDisplay, { HairFlower } from './HairDisplay';
import GearDisplay from './GearDisplay';
import Sprite from './Sprite';

interface AvatarSpritesProps {
  member: HabiticaMember;
  avatarOnly: boolean;
  showVisualBuffs: boolean;
  showWeapon: boolean;
  overrideAvatarGear?: OverrideAvatarGear;
  spritesMargin: string;
  specialMountClass: string;
  skinClass: string;
  shirtClass: string;
  costumeClass: 'costume' | 'equipped';
  flatGear: Record<string, { twoHanded?: boolean }>;
  currentEventList: { aprilFools?: string; start: string; end: string }[];
  showAvatar: boolean;
}

const AvatarSprites: React.FC<AvatarSpritesProps> = ({
  member,
  avatarOnly,
  showVisualBuffs,
  showWeapon,
  overrideAvatarGear,
  spritesMargin,
  specialMountClass,
  skinClass,
  shirtClass,
  costumeClass,
  flatGear,
  currentEventList,
  showAvatar,
}) => {
  return (
    <div
      className="character-sprites"
      style={{ margin: spritesMargin }}
    >
      {/* Mount Body */}
      <MountDisplay member={member} avatarOnly={avatarOnly} />

      {/* Visual Buffs */}
      <VisualBuffs member={member} showVisualBuffs={showVisualBuffs} />

      {/* Hair Flower - Always shown first */}
      <HairFlower member={member} />

      {/* Avatar Elements */}
      {showAvatar && (
        <>
          <Sprite className={`chair_${member.preferences.chair} ${specialMountClass}`.trim()} />
          <Sprite className={`${skinClass} ${specialMountClass}`.trim()} />
          <Sprite className={`${shirtClass} ${specialMountClass}`.trim()} />
          <Sprite className={`head_0 ${specialMountClass}`.trim()} />
          
          {/* Hair Elements */}
          <HairDisplay 
            member={member} 
            overrideAvatarGear={overrideAvatarGear} 
            specialMountClass={specialMountClass}
          />
          
          {/* Gear */}
          <GearDisplay
            member={member}
            overrideAvatarGear={overrideAvatarGear}
            specialMountClass={specialMountClass}
            showWeapon={showWeapon}
            flatGear={flatGear}
            costumeClass={costumeClass}
          />
          
          {/* Hair Flower - Shown again later in z-order */}
          <HairFlower member={member} specialMountClass={specialMountClass} />
        </>
      )}

      {/* Sleep indicator */}
      {member.preferences.sleep && <Sprite className="zzz" />}

      {/* Mount Head */}
      <MountHead member={member} avatarOnly={avatarOnly} />
      
      {/* Pet */}
      <PetDisplay 
        member={member} 
        avatarOnly={avatarOnly} 
        currentEventList={currentEventList} 
      />
    </div>
  );
};

export default AvatarSprites;