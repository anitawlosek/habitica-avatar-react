import React from 'react';
import { HabiticaMember, CurrentEvent } from '../types';
import { foolPet, isAprilFoolsActive } from '../utils/foolPet';
import Sprite from './Sprite';

interface PetDisplayProps {
  member: HabiticaMember;
  avatarOnly: boolean;
  currentEventList: CurrentEvent[];
}

const PetDisplay: React.FC<PetDisplayProps> = ({ 
  member, 
  avatarOnly, 
  currentEventList 
}) => {
  if (avatarOnly) {
    return null;
  }

  const getPetClass = () => {
    const foolEvent = isAprilFoolsActive(currentEventList);
    
    if (foolEvent?.aprilFools) {
      return foolPet(member.items.currentPet || '', foolEvent.aprilFools);
    }
    
    if (member.items.currentPet) {
      return `Pet-${member.items.currentPet}`;
    }
    
    return '';
  };

  const petClass = getPetClass();

  return <Sprite className={`current-pet ${petClass}`.trim()} />;
};

export default PetDisplay;