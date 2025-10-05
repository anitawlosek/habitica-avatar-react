export interface FlatGearItem {
  twoHanded?: boolean;
  [key: string]: any;
}

export interface FlatGear {
  [gearKey: string]: FlatGearItem;
}