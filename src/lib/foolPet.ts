// foolPet: Returns a special pet class name for April Fools events, otherwise returns the normal pet class.
const SPECIAL_PETS = [
  'Bear-Veteran',
  'BearCub-Polar',
  'Cactus-Veteran',
  'Dragon-Hydra',
  'Dragon-Veteran',
  'Fox-Veteran',
  'Gryphatrice-Jubilant',
  'Gryphon-Gryphatrice',
  'Gryphon-RoyalPurple',
  'Hippogriff-Hopeful',
  'Jackalope-RoyalPurple',
  'JackOLantern-Base',
  'JackOLantern-Ghost',
  'JackOLantern-Glow',
  'JackOLantern-RoyalPurple',
  'Lion-Veteran',
  'MagicalBee-Base',
  'Mammoth-Base',
  'MantisShrimp-Base',
  'Orca-Base',
  'Phoenix-Base',
  'Tiger-Veteran',
  'Turkey-Base',
  'Turkey-Gilded',
  'Wolf-Cerberus',
  'Wolf-Veteran',
];

const BASE_PETS = [
  'BearCub',
  'Cactus',
  'Dragon',
  'FlyingPig',
  'Fox',
  'LionCub',
  'PandaCub',
  'TigerCub',
  'Wolf',
];

/**
 * Returns a prank pet string for April Fools event.
 * @param pet The pet string (e.g., 'BearCub-White')
 * @param prank The prank string (e.g., 'Pranked')
 */
export default function foolPet(pet: string | null | undefined, prank: string): string {
  if (!pet) return `Pet-TigerCub-${prank}`;
  if (SPECIAL_PETS.includes(pet)) {
    return `Pet-Dragon-${prank}`;
  }
  const dashIdx = pet.indexOf('-');
  const species = dashIdx !== -1 ? pet.slice(0, dashIdx) : pet;
  if (BASE_PETS.includes(species)) {
    return `Pet-${species}-${prank}`;
  }
  return `Pet-BearCub-${prank}`;
}
