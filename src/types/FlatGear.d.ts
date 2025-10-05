export interface FlatGearItem {
  twoHanded?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface FlatGear {
  [gearKey: string]: FlatGearItem;
}