export interface FlatGearItem {
  twoHanded?: boolean;
  [key: string]: boolean | undefined;
}

export interface FlatGear {
  [gearKey: string]: FlatGearItem;
}