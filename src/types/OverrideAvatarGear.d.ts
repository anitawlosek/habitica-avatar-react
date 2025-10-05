export interface OverrideAvatarGear {
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