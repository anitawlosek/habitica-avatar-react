import React from 'react';
import { ImagesMeta, AvatarManifestItems } from 'habitica-avatar-manifest';

interface HabiticaMember {
  preferences: {
    skin: string;
    hair: {
      color: string;
      base: number;
      bangs: number;
      mustache: number;
      beard: number;
      flower: number;
    };
    shirt: string;
    size: string;
    chair: string;
    background: string;
    costume: boolean;
    sleep: boolean;
  };
  items: {
    gear: {
      equipped: Record<string, string>;
      costume: Record<string, string>;
    };
    currentMount: string;
    currentPet: string;
  };
  stats: {
    class: MemberClass;
    buffs: {
      snowball: boolean;
      spookySparkles: boolean;
      shinySeed: boolean;
      seafoam: boolean;
      [key: string]: boolean;
    };
  };
}

type MemberClass = 'warrior' | 'rogue' | 'healer' | 'wizard';

interface OverrideAvatarGear {
  [gearType: string]: string | undefined;
  hair?: {
    color?: string;
    base?: number;
    bangs?: number;
    mustache?: number;
    beard?: number;
    flower?: number;
  };
  skin?: string;
  shirt?: string;
  background?: string;
  shield?: string;
  weapon?: string;
  armor?: string;
  head?: string;
  headAccessory?: string;
  eyewear?: string;
  back?: string;
  back_collar?: string;
  body?: string;
}

interface FlatGearItem {
  twoHanded?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface FlatGear {
  [gearKey: string]: FlatGearItem;
}

interface CurrentEvent {
  aprilFools: string;
  start: string;
  end: string;
  [key: string]: string;
}

type CurrentEventList = CurrentEvent[];

interface HabiticaAvatarProps {
    debugMode?: boolean;
    member: HabiticaMember;
    showClassBadge?: boolean;
    avatarOnly?: boolean;
    withBackground?: boolean;
    overrideAvatarGear?: OverrideAvatarGear;
    width?: string | number;
    centerAvatar?: boolean;
    spritesMargin?: string;
    overrideTopPadding?: string | null;
    showVisualBuffs?: boolean;
    showWeapon?: boolean;
    flatGear?: FlatGear;
    currentEventList?: CurrentEventList;
    onClick?: (member: HabiticaMember) => void;
    imagesMeta?: ImagesMeta;
    avatarManifestItems?: AvatarManifestItems;
    base64Url?: string;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
}
declare const HabiticaAvatar: React.FC<HabiticaAvatarProps>;

export { type CurrentEvent, type CurrentEventList, type FlatGear, type FlatGearItem, HabiticaAvatar, type HabiticaMember, type MemberClass, type OverrideAvatarGear };
