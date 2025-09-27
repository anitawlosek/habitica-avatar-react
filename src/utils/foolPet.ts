import moment from 'moment';
import { CurrentEvent } from '../types';

/**
 * April Fools pet transformation logic
 * Converts pets during April Fools events
 */
export const foolPet = (currentPet: string, aprilFoolsType: string): string => {
  if (!currentPet || !aprilFoolsType) return currentPet;
  
  // Add specific April Fools transformations here
  // This is a placeholder implementation
  return `Pet-${currentPet}_${aprilFoolsType}`;
};

/**
 * Check if current time is within an April Fools event
 */
export const isAprilFoolsActive = (eventList?: CurrentEvent[]): CurrentEvent | null => {
  if (!eventList) return null;
  
  const foolEvent = eventList.find(event => 
    event.aprilFools && moment().isBetween(event.start, event.end)
  );
  
  return foolEvent || null;
};