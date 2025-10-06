import { describe, it, expect } from 'vitest';
import foolPet from './foolPet';

describe('foolPet', () => {
  it('should return default TigerCub pet for null input', () => {
    expect(foolPet(null, 'Pranked')).toBe('Pet-TigerCub-Pranked');
  });

  it('should return default TigerCub pet for undefined input', () => {
    expect(foolPet(undefined, 'Pranked')).toBe('Pet-TigerCub-Pranked');
  });

  it('should return Dragon prank for special pets', () => {
    expect(foolPet('Bear-Veteran', 'Pranked')).toBe('Pet-Dragon-Pranked');
    expect(foolPet('Dragon-Hydra', 'Pranked')).toBe('Pet-Dragon-Pranked');
    expect(foolPet('Fox-Veteran', 'Pranked')).toBe('Pet-Dragon-Pranked');
    expect(foolPet('Wolf-Cerberus', 'Pranked')).toBe('Pet-Dragon-Pranked');
  });

  it('should return species-specific prank for base pets', () => {
    expect(foolPet('BearCub-White', 'Pranked')).toBe('Pet-BearCub-Pranked');
    expect(foolPet('Cactus-Red', 'Pranked')).toBe('Pet-Cactus-Pranked');
    expect(foolPet('Dragon-Blue', 'Pranked')).toBe('Pet-Dragon-Pranked');
    expect(foolPet('Fox-Green', 'Pranked')).toBe('Pet-Fox-Pranked');
    expect(foolPet('Wolf-Red', 'Pranked')).toBe('Pet-Wolf-Pranked');
  });

  it('should return BearCub prank for unknown pets', () => {
    expect(foolPet('UnknownPet-Variant', 'Pranked')).toBe('Pet-BearCub-Pranked');
    expect(foolPet('SomeOtherPet', 'Pranked')).toBe('Pet-BearCub-Pranked');
  });

  it('should work with different prank types', () => {
    expect(foolPet('Fox-Green', 'Ghost')).toBe('Pet-Fox-Ghost');
    expect(foolPet('BearCub-White', 'Spooky')).toBe('Pet-BearCub-Spooky');
  });

  it('should handle pet names without dash', () => {
    expect(foolPet('BearCub', 'Pranked')).toBe('Pet-BearCub-Pranked');
    expect(foolPet('Dragon', 'Pranked')).toBe('Pet-Dragon-Pranked');
  });
});
