import React from 'react';
import { HabiticaMember, OverrideAvatarGear, FlatGear } from '../types';
import Sprite from './Sprite';

interface GearDisplayProps {
  member: HabiticaMember;
  overrideAvatarGear?: OverrideAvatarGear;
  specialMountClass: string;
  showWeapon: boolean;
  flatGear: FlatGear;
  costumeClass: 'costume' | 'equipped';
}

const GearDisplay: React.FC<GearDisplayProps> = ({ 
  member, 
  overrideAvatarGear, 
  specialMountClass, 
  showWeapon, 
  flatGear, 
  costumeClass 
}) => {
  const getGearClass = (gearType: keyof typeof member.items.gear.equipped) => {
    if (!member.items.gear) return '';
    
    let result = member.items.gear[costumeClass as keyof typeof member.items.gear]?.[gearType] || '';
    
    if (overrideAvatarGear?.[gearType]) {
      result = overrideAvatarGear[gearType] || '';
    }
    
    return result;
  };

  const hideGear = (gearType: 'weapon' | 'shield') => {
    if (!member.items.gear || !showWeapon) return true;
    
    if (gearType === 'weapon') {
      const equippedWeapon = member.items.gear[costumeClass as keyof typeof member.items.gear]?.weapon;
      
      if (!equippedWeapon) return false;
      
      const equippedIsTwoHanded = flatGear[equippedWeapon]?.twoHanded;
      const hasOverrideShield = overrideAvatarGear?.shield;
      
      return Boolean(equippedIsTwoHanded && hasOverrideShield);
    }
    
    if (gearType === 'shield') {
      const overrideWeapon = overrideAvatarGear?.weapon;
      const overrideIsTwoHanded = overrideWeapon && flatGear[overrideWeapon]?.twoHanded;
      
      return Boolean(overrideIsTwoHanded);
    }
    
    return false;
  };

  return (
    <>
      {/* Back gear */}
      <Sprite className={`${getGearClass('back')} ${specialMountClass}`.trim()} />
      
      {/* Armor */}
      <Sprite className={`${member.preferences.size}_${getGearClass('armor')} ${specialMountClass}`.trim()} />
      
      {/* Back collar */}
      <Sprite className={`${getGearClass('back_collar')} ${specialMountClass}`.trim()} />
      
      {/* Body gear */}
      <Sprite className={`${getGearClass('body')} ${specialMountClass}`.trim()} />
      
      {/* Eyewear */}
      <Sprite className={`${getGearClass('eyewear')} ${specialMountClass}`.trim()} />
      
      {/* Head gear */}
      <Sprite className={`${getGearClass('head')} ${specialMountClass}`.trim()} />
      
      {/* Head accessory */}
      <Sprite className={`${getGearClass('headAccessory')} ${specialMountClass}`.trim()} />
      
      {/* Weapons and Shield */}
      {!hideGear('shield') && (
        <Sprite className={`${getGearClass('shield')} ${specialMountClass}`.trim()} />
      )}
      {!hideGear('weapon') && (
        <Sprite className={`${getGearClass('weapon')} ${specialMountClass} weapon`.trim()} />
      )}
    </>
  );
};

export default GearDisplay;