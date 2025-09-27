import React from 'react';
import { HabiticaMember } from '../types';
import Sprite from './Sprite';

interface VisualBuffsProps {
  member: HabiticaMember;
  showVisualBuffs: boolean;
}

const VisualBuffs: React.FC<VisualBuffsProps> = ({ member, showVisualBuffs }) => {
  if (!showVisualBuffs || !member.stats.buffs) {
    return null;
  }

  const visualBuffs = {
    snowball: `avatar_snowball_${member.stats.class || 'base'}`,
    spookySparkles: 'ghost',
    shinySeed: `avatar_floral_${member.stats.class || 'base'}`,
    seafoam: 'seafoam_star',
  };

  return (
    <>
      {Object.entries(visualBuffs).map(([buff, className]) => (
        member.stats.buffs[buff as keyof typeof member.stats.buffs] && (
          <Sprite key={buff} className={className} />
        )
      ))}
    </>
  );
};

export default VisualBuffs;