export interface HabiticaMember {
  preferences: {
    skin: string;
    hair: {
      color: string;
      base: string;
      bangs: string;
      mustache?: string;
      beard?: string;
      flower: string;
    };
    shirt: string;
    size: string;
    chair: string;
    background?: string;
    costume: boolean;
    sleep: boolean;
  };
  items: {
    gear: {
      costume: {
        back?: string;
        armor?: string;
        body?: string;
        eyewear?: string;
        head?: string;
        headAccessory?: string;
        shield?: string;
        weapon?: string;
        back_collar?: string;
      };
      equipped: {
        back?: string;
        armor?: string;
        body?: string;
        eyewear?: string;
        head?: string;
        headAccessory?: string;
        shield?: string;
        weapon?: string;
        back_collar?: string;
      };
    };
    currentMount?: string;
    currentPet?: string;
  };
  stats: {
    class?: string;
    buffs: {
      snowball?: boolean;
      spookySparkles?: boolean;
      shinySeed?: boolean;
      seafoam?: boolean;
    };
  };
}

export interface FlatGear {
  [key: string]: {
    twoHanded?: boolean;
  };
}

export interface OverrideAvatarGear {
  back?: string;
  armor?: string;
  body?: string;
  eyewear?: string;
  head?: string;
  headAccessory?: string;
  shield?: string;
  weapon?: string;
  back_collar?: string;
  skin?: string;
  shirt?: string;
  background?: string;
  hair?: {
    color?: string;
    base?: string;
    bangs?: string;
    mustache?: string;
    beard?: string;
    flower?: string;
  };
}

export interface CurrentEvent {
  aprilFools?: string;
  start: string;
  end: string;
}

export interface HabiticaAvatarProps {
  member: HabiticaMember;
  debugMode?: boolean;
  avatarOnly?: boolean;
  hideClassBadge?: boolean;
  withBackground?: boolean;
  overrideAvatarGear?: OverrideAvatarGear;
  width?: string;
  height?: string;
  centerAvatar?: boolean;
  spritesMargin?: string;
  overrideTopPadding?: string;
  showVisualBuffs?: boolean;
  showWeapon?: boolean;
  flatGear?: FlatGear;
  currentEventList?: CurrentEvent[];
  onClick?: (member: HabiticaMember) => void;
}