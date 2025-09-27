import React, { useMemo } from 'react';
import { HabiticaAvatarProps } from '../types';
import ClassBadge from './ClassBadge';
import AvatarSprites from './AvatarSprites';
import Sprite from './Sprite';
import './HabiticaAvatar.scss';

const HabiticaAvatar: React.FC<HabiticaAvatarProps> = ({
  member,
  debugMode = false,
  avatarOnly = false,
  hideClassBadge = true,
  withBackground = true,
  overrideAvatarGear,
  width = '141px',
  height = '147px',
  centerAvatar = false,
  spritesMargin = '0 auto 0 24px',
  overrideTopPadding,
  showVisualBuffs = true,
  showWeapon = true,
  flatGear = {},
  currentEventList = [],
  onClick,
}) => {
  // Check if member has a class
  const hasClass = useMemo(() => {
    return Boolean(member.stats.class);
  }, [member.stats.class]);

  // Calculate padding top
  const paddingTop = useMemo(() => {
    if (overrideTopPadding) {
      return overrideTopPadding;
    }

    let val = '24px';
    if (!avatarOnly) {
      if (member.items.currentPet) val = '24px';
      if (member.items.currentMount) val = '0px';
    }
    
    return val;
  }, [overrideTopPadding, avatarOnly, member.items]);

  // Background class
  const backgroundClass = useMemo(() => {
    if (!member.preferences) return '';
    
    const { background } = member.preferences;
    const allowToShowBackground = !avatarOnly || withBackground;

    if (overrideAvatarGear?.background) {
      return `background_${overrideAvatarGear.background}`;
    }

    if (background && allowToShowBackground) {
      return `background_${background}`;
    }
    
    return '';
  }, [member.preferences, avatarOnly, withBackground, overrideAvatarGear]);

  // Top level class list
  const topLevelClassList = useMemo(() => {
    const classes = [backgroundClass];
    
    if (debugMode) {
      classes.push('debug');
    }
    
    if (centerAvatar) {
      classes.push('centered-avatar');
    }
    
    return classes.filter(Boolean).join(' ');
  }, [backgroundClass, debugMode, centerAvatar]);

  // Skin class
  const skinClass = useMemo(() => {
    if (!member.preferences) return '';
    
    if (overrideAvatarGear?.skin) {
      return `skin_${overrideAvatarGear.skin}`;
    }
    
    const baseClass = `skin_${member.preferences.skin}`;
    return `${baseClass}${member.preferences.sleep ? '_sleep' : ''}`;
  }, [member.preferences, overrideAvatarGear]);

  // Shirt class
  const shirtClass = useMemo(() => {
    if (!member.preferences) return '';
    
    if (overrideAvatarGear?.shirt) {
      return `${member.preferences.size}_shirt_${overrideAvatarGear.shirt}`;
    }
    
    return `${member.preferences.size}_shirt_${member.preferences.shirt}`;
  }, [member.preferences, overrideAvatarGear]);

  // Costume class
  const costumeClass = useMemo(() => {
    return member.preferences?.costume ? 'costume' : 'equipped';
  }, [member.preferences?.costume]);

  // Special mount class
  const specialMountClass = useMemo(() => {
    if (!avatarOnly && member.items.currentMount?.includes('Kangaroo')) {
      return 'offset-kangaroo';
    }
    return '';
  }, [avatarOnly, member.items.currentMount]);

  // Show avatar logic
  const showAvatar = () => {
    if (!member.stats.buffs || !showVisualBuffs) return true;
    
    const { buffs } = member.stats;
    return !buffs.snowball && !buffs.spookySparkles && !buffs.shinySeed && !buffs.seafoam;
  };

  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(member);
    }
  };

  if (!member.preferences) {
    return null;
  }

  return (
    <Sprite
      className={`avatar ${topLevelClassList}`}
      style={{ width, height, paddingTop }}
      onClick={handleClick}
    >
      <AvatarSprites
        member={member}
        avatarOnly={avatarOnly}
        showVisualBuffs={showVisualBuffs}
        showWeapon={showWeapon}
        overrideAvatarGear={overrideAvatarGear}
        spritesMargin={spritesMargin}
        specialMountClass={specialMountClass}
        skinClass={skinClass}
        shirtClass={shirtClass}
        costumeClass={costumeClass}
        flatGear={flatGear}
        currentEventList={currentEventList}
        showAvatar={showAvatar()}
      />

      {/* Class Badge */}
      {hasClass && !hideClassBadge && (
        <ClassBadge className="under-avatar" memberClass={member.stats.class} />
      )}
    </Sprite>
  );
};

export default HabiticaAvatar;