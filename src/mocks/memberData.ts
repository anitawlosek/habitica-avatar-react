import { HabiticaMember } from '../types';

// Real Habitica user data - comprehensive example
export const wizardMemberData: HabiticaMember = {
  preferences: {
    skin: 'f5a76e',
    hair: {
      color: 'brown',
      base: '5',
      bangs: '1',
      mustache: '0',
      beard: '0',
      flower: '10',
    },
    shirt: 'black',
    size: 'broad',
    chair: 'none',
    background: 'covered_bridge_in_autumn',
    costume: true,
    sleep: false,
  },
  items: {
    gear: {
      equipped: {
        weapon: 'weapon_special_summer2019Mage',
        armor: 'armor_special_2',
        head: 'head_special_2',
        shield: 'shield_special_wintryMirror',
        back: 'back_special_aetherCloak',
        headAccessory: 'headAccessory_armoire_gogglesOfBookbinding',
        eyewear: 'eyewear_armoire_tragedyMask',
        body: 'body_armoire_lifeguardWhistle',
      },
      costume: {
        weapon: 'weapon_armoire_shootingStarSpell',
        armor: 'armor_mystery_202509',
        head: 'head_armoire_redNewsieHat',
        shield: 'shield_base_0',
        back: 'back_special_aetherCloak',
        headAccessory: 'headAccessory_base_0',
        eyewear: 'eyewear_special_blackTopFrame',
        body: 'body_armoire_cozyScarf',
      },
    },
    currentMount: '',
    currentPet: 'Fox-Fungi',
  },
  stats: {
    class: 'wizard',
    buffs: {
      snowball: false,
      spookySparkles: false,
      shinySeed: false,
      seafoam: false,
    },
  },
};

// Original simple mock member for basic testing
export const warriorMockMember: HabiticaMember = {
  preferences: {
    skin: '915533',
    hair: {
      color: 'black',
      base: '1',
      bangs: '2',
      mustache: '0',
      beard: '0',
      flower: '0',
    },
    shirt: 'blue',
    size: 'broad',
    chair: 'none',
    background: 'blue',
    costume: false,
    sleep: false,
  },
  items: {
    gear: {
      costume: {
        armor: '',
        back: '',
        body: '',
        eyewear: '',
        head: '',
        headAccessory: '',
        shield: '',
        weapon: '',
      },
      equipped: {
        armor: 'armor_warrior_1',
        back: '',
        body: '',
        eyewear: '',
        head: 'head_warrior_1',
        headAccessory: '',
        shield: 'shield_warrior_1',
        weapon: 'weapon_warrior_1',
      },
    },
    currentMount: '',
    currentPet: 'Wolf-Base',
  },
  stats: {
    class: 'warrior',
    buffs: {
      snowball: false,
      spookySparkles: false,
      shinySeed: false,
      seafoam: false,
    },
  },
};

export const mockMemberWithMount: HabiticaMember = {
  ...wizardMemberData,
  items: {
    ...wizardMemberData.items,
    currentMount: 'Fox-AutumnLeaf',
  },
};

export const mockMemberMage: HabiticaMember = {
  ...wizardMemberData,
  // Already a mage with rich gear - use as-is
};

export const mockMemberSleeping: HabiticaMember = {
  ...wizardMemberData,
  preferences: {
    ...wizardMemberData.preferences,
    sleep: true,
  },
};

export const mockMemberWithBuffs: HabiticaMember = {
  ...wizardMemberData,
  stats: {
    ...wizardMemberData.stats,
    buffs: {
      snowball: false,
      spookySparkles: true,
      shinySeed: false,
      seafoam: false,
    },
  },
};

export const mockMemberWarrior: HabiticaMember = {
  ...warriorMockMember, // Use the simple warrior data
};