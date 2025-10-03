export interface HabiticaMember {
  preferences: {
    skin: string;
    hair: {
      color: string;
      base: string;
      bangs: string;
      mustache: string;
      beard: string;
      flower: string;
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
