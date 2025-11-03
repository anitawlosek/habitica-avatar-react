import React, { useMemo, useEffect, useState, useCallback } from 'react';

import HabiticaSprite from '../HabiticaSprite/HabiticaSprite';
import ClassBadge from '../ClassBadge/ClassBadge';

import { getAprilFoolsPrank } from '../../lib/foolPet';
import { createClassName, isDefined } from '../../lib/helpers';

import { HabiticaMember } from '../../types/HabiticaMember';
import { OverrideAvatarGear } from '../../types/OverrideAvatarGear';
import { FlatGear } from '../../types/FlatGear';
import { CurrentEventList } from '../../types/CurrentEventList';

import './HabiticaAvatar.css';
import { AvatarItemsDetails, getHabiticaAvatarItemsDetail, getHabiticaImagesMeta, ImagesMeta } from 'habitica-avatar-manifest';
import { AvatarSprites, getAvatarSprites } from '../../lib/sprites';
import { enrichAvatarSpritesWithBase64 } from '../../lib/base64Images';

type LoadingImagesState = {
  total: number;
  loaded: number;
};

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
  imagesMeta?: ImagesMeta;
  avatarItemsDetails?: AvatarItemsDetails;
  base64Url?: string;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
}

const HabiticaAvatar: React.FC<HabiticaAvatarProps> = ({
  member,
  debugMode = false,
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
  base64Url,
  onLoadingStart,
  onLoadingEnd,
  ...props
}) => {
  const [avatarSpritesDetails, setAvatarSpritesDetails] = useState<AvatarSprites | null>(null);
  const [loadingImages, setLoadingImages] = useState<LoadingImagesState>({ total: 0, loaded: 0 });
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
  const [staticData, setStaticData] = useState<{
    imagesMeta: ImagesMeta | null;
    avatarItemsDetails: AvatarItemsDetails | null;
  }>({ imagesMeta: null, avatarItemsDetails: null });

  // static data effect - fetches imagesMeta and avatarItemsDetails once
  useEffect(() => {
    const fetchStaticData = async () => {
      const imagesMeta = props.imagesMeta || await getHabiticaImagesMeta();
      const avatarItemsDetails = props.avatarItemsDetails || await getHabiticaAvatarItemsDetail();
      setStaticData({ imagesMeta, avatarItemsDetails });
    };

    fetchStaticData();
  }, [props.imagesMeta, props.avatarItemsDetails]); // Only re-run if props change

  // Function to handle individual image load events
  const handleImageLoad = useCallback(() => {
    setLoadingImages(prev => ({ ...prev, loaded: prev.loaded + 1 }));
  }, []);

  // Function to count and track images
  const setupImageTracking = useCallback((sprites: AvatarSprites, loadingImages: LoadingImagesState) => {
    if (loadingImages.total > loadingImages.loaded) return; // already set up

    const imageUrls = Object.values(sprites)
      .filter(sprite => isDefined(sprite) && isDefined(sprite.backgroundUrl))
      .map(sprite => sprite.backgroundUrl)
      .filter(url => isDefined(url) && url !== '');

    const totalImages = imageUrls.length;
    setLoadingImages({ total: totalImages, loaded: 0 });

    // Handle case where there are no images to load
    if (totalImages === 0) {
      setLoadingAvatar(false);
      onLoadingEnd?.();
      return;
    }

    // Preload images and track their loading
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = url;
    });
  }, []);

  // usememo petprank
  const petPrank = useMemo(() => getAprilFoolsPrank(currentEventList), [currentEventList]);

  useEffect(() => {
    // Preload all necessary sprite details
    const loadSpriteDetails = async () => {
      if (!staticData.imagesMeta || !staticData.avatarItemsDetails) return;

      setLoadingAvatar(true);
      onLoadingStart?.();

      const avatarSprites = getAvatarSprites(
        member, 
        overrideAvatarGear, 
        staticData.avatarItemsDetails, 
        staticData.imagesMeta, 
        petPrank
      );

      if (isDefined(base64Url)) {
        const enrichedSprites = await enrichAvatarSpritesWithBase64(avatarSprites, base64Url);
        setAvatarSpritesDetails(enrichedSprites);
        setupImageTracking(enrichedSprites, loadingImages);
      } else {
        setAvatarSpritesDetails(avatarSprites);
        setupImageTracking(avatarSprites, loadingImages);
      }
    };

    loadSpriteDetails();
  }, [
    member, 
    base64Url, 
    JSON.stringify(overrideAvatarGear), 
    staticData.imagesMeta, 
    staticData.avatarItemsDetails
  ]);

  // Handle image loading completion
  useEffect(() => {
    if (loadingImages.total > 0 &&
      loadingImages.loaded === loadingImages.total &&
      loadingAvatar) {
      setLoadingAvatar(false);
      onLoadingEnd?.();
    }
  }, [loadingImages, loadingAvatar]);

  const showAvatar = useMemo(() => !(showVisualBuffs && isDefined(avatarSpritesDetails?.buff?.backgroundUrl)), [showVisualBuffs, avatarSpritesDetails]);
  const showBackground = useMemo(() => !avatarOnly || withBackground, [avatarOnly, withBackground]);

  // TODO: move to getAvatarSprites
  const hideGear = useCallback((gearType: string) => {
    if (!showWeapon) return true;
    if (gearType === 'weapon') {
      const costumeClass = member.preferences.costume ? 'costume' : 'equipped';
      const equippedWeapon = member.items.gear[costumeClass][gearType];
      if (!equippedWeapon) return false;
      const equippedIsTwoHanded = flatGear[equippedWeapon]?.twoHanded; // get twoHanded from avatar items details
      const hasOverrideShield = overrideAvatarGear.shield;
      return equippedIsTwoHanded && hasOverrideShield;
    } else if (gearType === 'shield') {
      const overrideWeapon = overrideAvatarGear.weapon;
      const overrideIsTwoHanded = overrideWeapon && flatGear[overrideWeapon]?.twoHanded;
      return overrideIsTwoHanded;
    }
    return false;
  }, [
    showWeapon,
    member.items.gear,
    flatGear,
    overrideAvatarGear.shield,
    overrideAvatarGear.weapon
  ]);

  const paddingTop = useMemo(() => {
    if (overrideTopPadding) return overrideTopPadding;

    let val = '24px';

    if (!avatarOnly) {
      if (member.items.currentPet) val = '24px';
      if (member.items.currentMount) val = '0px';
    }

    return val;
  }, [overrideTopPadding, avatarOnly, member.items.currentMount, member.items.currentPet]);

  const topLevelClassList = useMemo(() => {
    const classes = [];
    if (debugMode) classes.push('debug');
    if (centerAvatar) classes.push('centered-avatar');
    return createClassName(...classes);
  }, [debugMode, centerAvatar]);

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
  if (!isDefined(avatarSpritesDetails)) return null;

  return (
    <HabiticaSprite
      className={createClassName("avatar", topLevelClassList)}
      spriteDetails={showBackground ? avatarSpritesDetails.background : null}
      style={{ width, height, paddingTop }}
      onClick={handleClick}
      wrapper="div"
    >
      <div className="character-sprites" style={{ margin: spritesMargin }}>
        {!avatarOnly && member.items.currentMount && (
          <HabiticaSprite spriteDetails={avatarSpritesDetails['mount.body']} />
        )}
        {/* Buffs that cause visual changes to avatar: Snowman, Ghost, Flower, etc */}
        {avatarSpritesDetails.buff && showVisualBuffs ? (
          <HabiticaSprite spriteDetails={avatarSpritesDetails.buff} />
        ) : null
        }
        {/* Show flower ALL THE TIME!! */}
        <HabiticaSprite spriteDetails={avatarSpritesDetails['hair.flower']} />
        {/* Show avatar only if not currently affected by visual buff */}
        {showAvatar && (
          <>
            <HabiticaSprite spriteDetails={avatarSpritesDetails.chair} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.back']} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails.skin} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails.shirt} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails.head_0} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.armor']} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.back_collar']} className={specialMountClass} />
            {(['bangs', 'base', 'mustache', 'beard'] as Array<'bangs' | 'base' | 'mustache' | 'beard'>).map(type => (
              <HabiticaSprite key={type} spriteDetails={avatarSpritesDetails[`hair.${type}`]} className={specialMountClass} />
            ))}
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.body']} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.eyewear']} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.head']} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.headAccessory']} className={specialMountClass} />
            <HabiticaSprite spriteDetails={avatarSpritesDetails['hair.flower']} className={specialMountClass} />
            {!hideGear('shield') && (
              <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.shield']} className={specialMountClass} />
            )}
            {!hideGear('weapon') && (
              <HabiticaSprite spriteDetails={avatarSpritesDetails['gear.weapon']} className={createClassName(specialMountClass, 'weapon')} />
            )}
          </>
        )}
        {/* Resting */}
        {member.preferences.sleep && <HabiticaSprite spriteDetails={avatarSpritesDetails['sleep']} />}
        {!avatarOnly && (
          <>
            {member.items.currentMount && (
              <HabiticaSprite spriteDetails={avatarSpritesDetails[`mount.head`]} />
            )}
            <HabiticaSprite spriteDetails={avatarSpritesDetails.pet} className='current-pet' />
          </>
        )}
      </div>
      {isDefined(member.stats.class) && showClassBadge && (
        <ClassBadge className="under-avatar" memberClass={member.stats.class} />
      )}
    </HabiticaSprite>
  );
};

export default HabiticaAvatar;