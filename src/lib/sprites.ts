import { AvatarManifestItems, ImagesMeta, ItemMeta } from "habitica-avatar-manifest";
import { getNestedProperty, isDefined } from "./helpers";
import { HabiticaMember } from "../types/HabiticaMember";
import { OverrideAvatarGear } from "../types/OverrideAvatarGear";
import foolPet from "./foolPet";

export type SpriteDetails = {
  width: number;
  height: number;
  format: 'png' | 'gif';
};

const BASE_URL = 'https://habitica-assets.s3.amazonaws.com/mobileApp/images';
const DEFAULT_EXTENSION = 'png'

/**
 * Get sprite URL from configuration
 */
export const getSpriteUrl = (
  fileName: string,
  ext: string = DEFAULT_EXTENSION,
  baseUrl: string = BASE_URL
): string => {
  return `${baseUrl}/${fileName}.${ext}`;
};

/**
 * Get sprite dimensions from images meta
 */
export const getSpriteDetails = (imagesMeta: ImagesMeta, fileName: string): SpriteDetails | null => {
  const pngBaseName = `${fileName}.png`;
  const gifBaseName = `${fileName}.gif`;

  const gifImageMeta = imagesMeta[gifBaseName];
  const pngImageMeta = imagesMeta[pngBaseName];

  if (gifImageMeta) {
    return gifImageMeta;
  } else if (pngImageMeta) {
    return pngImageMeta;
  }

  return null;
};

const avatarSpriteTypes = [
  'background',
  'chair',
  'gear.back',
  'gear.armor',
  // 'gear.back_collar',
  'gear.body',
  'gear.eyewear',
  'gear.head',
  'gear.headAccessory',
  'gear.shield',
  'gear.weapon',
  'head_0',
  'skin',
  'shirt',
  'hair.bangs',
  'hair.base',
  'hair.mustache',
  'hair.beard',
  'hair.flower',
  'sleep',
  'mount.head',
  'mount.body',
  'pet',
  'buff'
];

type AvatarSpriteType = typeof avatarSpriteTypes[number];

export type AvatarSprite = {
  spriteType: AvatarSpriteType;
  className: string;
  backgroundUrl: string;
  width: number;
  height: number;
}

export type AvatarSprites = Record<AvatarSpriteType, AvatarSprite>;

export const getAvatarSprites = (
  userSettings: HabiticaMember,
  overrideAvatarGear: OverrideAvatarGear,
  avatarManifestItems: AvatarManifestItems,
  imagesMeta: ImagesMeta,
  petPrank: string | null = null
): AvatarSprites => {
  const avatarSprites: AvatarSprites = {} as AvatarSprites;

  avatarSpriteTypes.forEach(spriteType => {
    const spriteFileName = getAvatarSettingImageUrl(
      userSettings, 
      overrideAvatarGear, 
      spriteType, 
      avatarManifestItems, 
      petPrank
    );

    if (!isDefined(spriteFileName)) return;

    const spriteDetails = getSpriteDetails(imagesMeta, spriteFileName);

    if (spriteDetails) {
      avatarSprites[spriteType] = {
        spriteType,
        className: spriteFileName,
        backgroundUrl: getSpriteUrl(spriteFileName, spriteDetails.format),
        width: spriteDetails.width,
        height: spriteDetails.height
      };
    }
  });

  return avatarSprites;
}

const getItemId = (userSettings: HabiticaMember, overrideAvatarGear: OverrideAvatarGear, spriteType: AvatarSpriteType): string | null => {
  switch (spriteType) {
    // 'gear.back_collar' would go here if re-enabled
    case 'gear.back':
    case 'gear.armor':
    case 'gear.body':
    case 'gear.eyewear':
    case 'gear.head':
    case 'gear.headAccessory':
    case 'gear.shield':
    case 'gear.weapon': {
      const gearType = userSettings.preferences.costume ? 'costume' : 'equipped';
      const gearItemType = spriteType.split('.')[1];

      if (isDefined(overrideAvatarGear[gearItemType])) {
        return overrideAvatarGear[gearItemType];
      }

      return userSettings.items.gear[gearType][gearItemType];
    }
    case 'hair.bangs':
    case 'hair.base':
    case 'hair.mustache':
    case 'hair.beard':
    case 'hair.flower':
    case 'hair.color':
      return getNestedProperty(overrideAvatarGear, spriteType) ?? getNestedProperty(userSettings.preferences, spriteType) ?? null;
    case 'buff':
      return Object.entries(userSettings.stats.buffs).find(([, isActive]) => isActive)?.[0] || null;
    case 'sleep':
      return `${userSettings.preferences.sleep}`;
    case 'background':
    case 'chair':
    case 'skin':
    case 'shirt':
      return overrideAvatarGear[spriteType] || userSettings.preferences[spriteType];
    default:
      return spriteType;
  }
};

const getAvatarSettingImageUrl = (
  userSettings: HabiticaMember,
  overrideAvatarGear: OverrideAvatarGear,
  spriteType: AvatarSpriteType,
  avatarManifestItems: AvatarManifestItems,
  petPrank: string | null = null
): string | null => {
  switch (spriteType) {
    // 'gear.back_collar' would go here if re-enabled
    case 'gear.back':
    case 'gear.armor':
    case 'gear.body':
    case 'gear.eyewear':
    case 'gear.head':
    case 'gear.headAccessory':
    case 'gear.shield':
    case 'gear.weapon': {
      const gearItemId = getItemId(userSettings, overrideAvatarGear, spriteType);
      const gearItemDetail = getNestedProperty<ItemMeta>(avatarManifestItems, `${spriteType}.${gearItemId}`);

      if (!gearItemDetail) return null;

      return gearItemDetail.imageFileNames
        .find((fileName: string) => {
          if (spriteType === 'gear.armor') {
            return !fileName.startsWith('shop_') && fileName.includes(userSettings.preferences.size);
          }

          return !fileName.startsWith('shop_');
        }) || null;
    }
    case 'hair.bangs':
    case 'hair.base':
    case 'hair.mustache':
    case 'hair.beard':
    case 'hair.flower': {
      const hairItemId = getItemId(userSettings, overrideAvatarGear, spriteType);
      const hairColorId = getItemId(userSettings, overrideAvatarGear, 'hair.color');
      const hairItemDetail = getNestedProperty(avatarManifestItems, `${spriteType}.${hairItemId}`) as ItemMeta | undefined;

      if (!hairItemDetail) return null;

      return hairItemDetail.imageFileNames.find((fileName: string) => {
        if (spriteType === 'hair.flower') {
          return !fileName.startsWith('icon_')
        }

        return !fileName.startsWith('icon_') && fileName.includes(hairColorId!);
      }) || null;
    }
    case 'mount.head':
    case 'mount.body': {
      const mountPart = spriteType === 'mount.head' ? 'Head' : 'Body';
      const mountId = userSettings.items.currentMount;
      const mountDetail = mountId ? avatarManifestItems.mount[mountId] : undefined;

      if (!mountDetail) return null;

      return mountDetail.imageFileNames.find((fileName: string) => {
        return !fileName.startsWith('stable_') && fileName.includes(mountPart);
      }) || null;
    }
    case 'pet': {
      const currentPetId = userSettings.items.currentPet;
      const petId = petPrank ? foolPet(currentPetId, petPrank) : currentPetId;
      const petDetail = petId ? avatarManifestItems.pet[petId] : undefined;

      if (!petDetail) return null;

      return petDetail.imageFileNames.find((fileName: string) => !fileName.startsWith('stable_')) || null;
    }
    case 'buff': {
      const buffId = getItemId(userSettings, overrideAvatarGear, spriteType);
      if (!buffId) return null;
      const buffDetail = avatarManifestItems.buff[buffId] ?? avatarManifestItems.buff[`${buffId}_${userSettings.stats.class}`];

      return buffDetail?.imageFileNames.find(fileName => !fileName.startsWith('icon_')) || null;
    }
    case 'background':
    case 'chair': {
      const itemId = getItemId(userSettings, overrideAvatarGear, spriteType);

      if (!itemId) return null;

      return avatarManifestItems[spriteType][itemId]?.imageFileNames.find(fileName => !fileName.startsWith('icon_')) || null;
    }
    case 'skin': {
      const skinId = getItemId(userSettings, overrideAvatarGear, spriteType)

      if (!skinId) return null;

      return avatarManifestItems[spriteType][skinId].imageFileNames.find(fileName => {
        if (userSettings.preferences.sleep) {
          return !fileName.startsWith('icon_') && fileName.includes('sleep');
        }

        return !fileName.startsWith('icon_');
      }) || null;
    }
    case 'shirt': {
      const shirtId = getItemId(userSettings, overrideAvatarGear, spriteType);
      const sizeId = userSettings.preferences.size;
      if (!shirtId) return null;

      return avatarManifestItems.body[spriteType][shirtId].imageFileNames.find(fileName => !fileName.startsWith('icon_') && fileName.includes(sizeId)) || null;
    }
    case 'sleep': {
      const isSleeping = userSettings.preferences[spriteType];

      return avatarManifestItems.sleep[`${isSleeping}`]?.imageFileNames[0] || null;
    }
    default:
      return spriteType;
  }
};