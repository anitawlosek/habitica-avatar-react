import { useMemo, useCallback } from 'react';
import moment from 'moment';

import HabiticaSprite from '../HabiticaSprite/HabiticaSprite';
import ClassBadge from '../ClassBadge/ClassBadge';

import foolPet from '../../lib/foolPet';
import { createClassName } from '../../lib/helpers';

import { HabiticaMember } from '../../types/HabiticaMember';
import { OverrideAvatarGear } from '../../types/OverrideAvatarGear';
import { FlatGear } from '../../types/FlatGear';
import { CurrentEvent, CurrentEventList } from '../../types/CurrentEventList';

import './HabiticaAvatar.css';

export interface HabiticaAvatarProps {
  debugMode?: boolean;
  member: HabiticaMember;
  showClassBadge?: boolean;
  avatarOnly?: boolean;
  withBackground?: boolean;
  overrideAvatarGear?: OverrideAvatarGear;
  width?: string;
  height?: string;
  centerAvatar?: boolean;
  spritesMargin?: string;
  overrideTopPadding?: string | null;
  showVisualBuffs?: boolean;
  showWeapon?: boolean;
  flatGear?: FlatGear;
  currentEventList?: CurrentEventList;
  onClick?: (member: HabiticaMember) => void;
}

const HabiticaAvatar: React.FC<HabiticaAvatarProps> = ({
  debugMode = false,
  member,
  avatarOnly = false,
  showClassBadge = false,
  withBackground = false,
  overrideAvatarGear = {},
  width = '141px',
  height = '147px',
  centerAvatar = false,
  spritesMargin = '0 auto 0 24px',
  overrideTopPadding = null,
  showVisualBuffs = true,
  showWeapon = true,
  flatGear = {},
  currentEventList = [],
  onClick,
}) => {
  const costumeClass = useMemo(
    () => (member.preferences?.costume ? 'costume' : 'equipped'),
    [member.preferences?.costume]
  );

  const getGearClass = useCallback(
    (gearType: string) => {
      if (!member) return '';
      let result = member.items.gear[costumeClass][gearType];
      if (overrideAvatarGear && overrideAvatarGear[gearType]) {
        result = overrideAvatarGear[gearType];
      }
      return result;
    },
    [member, costumeClass, overrideAvatarGear]
  );

  const hairClass = useCallback(
    (
      slot: keyof typeof member.preferences.hair
    ) => {
      if (overrideAvatarGear?.hair) {
        if (overrideAvatarGear.hair[slot]) {
          return `hair_${slot}_${overrideAvatarGear.hair[slot]}_${member.preferences.hair.color}`;
        }
        if (overrideAvatarGear.hair.color) {
          return `hair_${slot}_${member.preferences.hair[slot]}_${overrideAvatarGear.hair.color}`;
        }
      }
      return `hair_${slot}_${member.preferences.hair[slot]}_${member.preferences.hair.color}`;
    },
    [member, overrideAvatarGear]
  );

  const hideGear = useCallback(
    (gearType: string) => {
      if (!member) return true;
      if (!showWeapon) return true;
      if (gearType === 'weapon') {
        const equippedWeapon = member.items.gear[costumeClass][gearType];
        if (!equippedWeapon) return false;
        const equippedIsTwoHanded = flatGear[equippedWeapon]?.twoHanded;
        const hasOverrideShield = overrideAvatarGear && overrideAvatarGear.shield;
        return equippedIsTwoHanded && hasOverrideShield;
      } else if (gearType === 'shield') {
        const overrideWeapon = overrideAvatarGear && overrideAvatarGear.weapon;
        const overrideIsTwoHanded = overrideWeapon && flatGear[overrideWeapon]?.twoHanded;
        return overrideIsTwoHanded;
      }
      return false;
    },
    [member, showWeapon, costumeClass, flatGear, overrideAvatarGear]
  );

  const showAvatar = useCallback(() => {
    if (!member) return false;
    if (!showVisualBuffs) return true;
    const { buffs } = member.stats;
    return !buffs.snowball && !buffs.spookySparkles && !buffs.shinySeed && !buffs.seafoam;
  }, [member, showVisualBuffs]);

  const getPetClass = useCallback(() => {
    const foolEvent = currentEventList?.find(
      (event: CurrentEvent) => event.aprilFools && moment().isBetween(event.start, event.end)
    );
    if (foolEvent) {
      return foolPet(member.items.currentPet, foolEvent.aprilFools);
    }
    if (member.items.currentPet) return `Pet-${member.items.currentPet}`;
    return '';
  }, [member, currentEventList]);

  const hasClass = useMemo(() => {
    if (!member) return false;
    return !!member.stats.class;
  }, [member]);

  const paddingTop = useMemo(() => {
    if (overrideTopPadding) return overrideTopPadding;

    let val = '24px';

    if (!avatarOnly) {
      if (member.items.currentPet) val = '24px';
      if (member.items.currentMount) val = '0px';
    }

    return val;
  }, [overrideTopPadding, avatarOnly, member.items.currentMount, member.items.currentPet]);

  const backgroundClass = useMemo(() => {
    if (member) {
      const { background } = member.preferences;
      const allowToShowBackground = !avatarOnly || withBackground;
      if (overrideAvatarGear && overrideAvatarGear.background) {
        return `background_${overrideAvatarGear.background}`;
      }
      if (background && allowToShowBackground) {
        return `background_${background}`;
      }
    }
    return '';
  }, [member, avatarOnly, withBackground, overrideAvatarGear]);

  const topLevelClassList = useMemo(() => {
    const classes = [];
    if (debugMode) classes.push('debug');
    if (centerAvatar) classes.push('centered-avatar');
    return createClassName(...classes);
  }, [backgroundClass, debugMode, centerAvatar]);

  const visualBuffs = useMemo(() => {
    if (!member) return {};
    return {
      snowball: `avatar_snowball_${member.stats.class}`,
      spookySparkles: 'ghost',
      shinySeed: `avatar_floral_${member.stats.class}`,
      seafoam: 'seafoam_star',
    };
  }, [member]);

  const skinClass = useMemo(() => {
    if (!member) return '';
    if (overrideAvatarGear?.skin) {
      return `skin_${overrideAvatarGear.skin}`;
    }
    const baseClass = `skin_${member.preferences.skin}`;
    return `${baseClass}${member.preferences.sleep ? '_sleep' : ''}`;
  }, [member, overrideAvatarGear]);

  const shirtClass = useMemo(() => {
    if (!member) return '';
    if (overrideAvatarGear?.shirt) {
      return `${member.preferences.size}_shirt_${overrideAvatarGear.shirt}`;
    }
    return `${member.preferences.size}_shirt_${member.preferences.shirt}`;
  }, [member, overrideAvatarGear]);

  const specialMountClass = useMemo(() => {
    if (!avatarOnly && member.items.currentMount && member.items.currentMount.includes('Kangaroo')) {
      return 'offset-kangaroo';
    }
    return '';
  }, [avatarOnly, member]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(member);
  };

  if (!member.preferences) return null;

  return (
    <HabiticaSprite
      className={createClassName("avatar", topLevelClassList)}
      fileName={backgroundClass}
      style={{ width, height, paddingTop }}
      onClick={handleClick}
      wrapper="div"
    >
      <div className="character-sprites" style={{ margin: spritesMargin }}>
        {!avatarOnly && member.items.currentMount && (
          <HabiticaSprite fileName={`Mount_Body_${member.items.currentMount}`} />
        )}
        {/* Buffs that cause visual changes to avatar: Snowman, Ghost, Flower, etc */}
        {Object.entries(visualBuffs).map(([item, klass]) =>
          member.stats.buffs[item] && showVisualBuffs ? (
            <HabiticaSprite key={item} fileName={klass} />
          ) : null
        )}
        {/* Show flower ALL THE TIME!! */}
        <HabiticaSprite fileName={`hair_flower_${member.preferences.hair.flower}`} />
        {/* Show avatar only if not currently affected by visual buff */}
        {showAvatar() && (
          <>
            <HabiticaSprite fileName={`chair_${member.preferences.chair}`} className={specialMountClass} />
            <HabiticaSprite fileName={getGearClass('back')} className={specialMountClass} />
            <HabiticaSprite fileName={skinClass} className={specialMountClass} />
            <HabiticaSprite fileName={shirtClass} className={specialMountClass} />
            <HabiticaSprite fileName={`head_0`} className={specialMountClass} />
            <HabiticaSprite fileName={`${member.preferences.size}_${getGearClass('armor')}`} className={specialMountClass} />
            <HabiticaSprite fileName={getGearClass('back_collar')} className={specialMountClass} />
            {(['bangs', 'base', 'mustache', 'beard'] as Array<'bangs' | 'base' | 'mustache' | 'beard'>).map(type => (
              <HabiticaSprite key={type} fileName={hairClass(type)} className={specialMountClass} />
            ))}
            <HabiticaSprite fileName={getGearClass('body')} className={specialMountClass} />
            <HabiticaSprite fileName={getGearClass('eyewear')} className={specialMountClass} />
            <HabiticaSprite fileName={getGearClass('head')} className={specialMountClass} />
            <HabiticaSprite fileName={getGearClass('headAccessory')} className={specialMountClass} />
            <HabiticaSprite fileName={`hair_flower_${member.preferences.hair.flower}`} className={specialMountClass} />
            {!hideGear('shield') && (
              <HabiticaSprite fileName={getGearClass('shield')} className={specialMountClass} />
            )}
            {!hideGear('weapon') && (
              <HabiticaSprite fileName={getGearClass('weapon')} className={createClassName(specialMountClass, 'weapon')} />
            )}
          </>
        )}
        {/* Resting */}
        {member.preferences.sleep && <HabiticaSprite fileName='zzz' />}
        {!avatarOnly && (
          <>
            {member.items.currentMount && (
              <HabiticaSprite fileName={`Mount_Head_${member.items.currentMount}`} />
            )}
            <HabiticaSprite fileName={getPetClass()} className='current-pet' />
          </>
        )}
      </div>
      {hasClass && showClassBadge && (
        <ClassBadge className="under-avatar" memberClass={member.stats.class} />
      )}
    </HabiticaSprite>
  );
};

export default HabiticaAvatar;