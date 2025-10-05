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
    class: string;
    buffs: {
      snowball: boolean;
      spookySparkles: boolean;
      shinySeed: boolean;
      seafoam: boolean;
      [key: string]: boolean;
    };
  };
}

interface OverrideAvatarGear {
  [gearType: string]: string | undefined;
  hair?: {
    color?: string;
    base?: number;
    bangs?: number;
    mustache?: number;
    beard?: number;
    flower?: number;
    [key: string]: string | number | undefined;
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
  [key: string]: any;
}

interface FlatGear {
  [gearKey: string]: FlatGearItem;
}

interface CurrentEvent {
  aprilFools: string;
  start: string;
  end: string;
  [key: string]: any;
}

type CurrentEventList = CurrentEvent[];

interface HabiticaAvatarProps {
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
declare const HabiticaAvatar: React.FC<HabiticaAvatarProps>;

export { type CurrentEventList, type FlatGear, HabiticaAvatar, type HabiticaMember, type OverrideAvatarGear };
