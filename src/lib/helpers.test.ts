import { describe, it, expect } from 'vitest';
import { isDefined, createClassName } from './helpers';

describe('helpers', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined([])).toBe(true);
      expect(isDefined({})).toBe(true);
      expect(isDefined('test')).toBe(true);
      expect(isDefined(123)).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(isDefined(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isDefined(null)).toBe(false);
    });
  });

  describe('createClassName', () => {
    it('should return empty string for no classes', () => {
      expect(createClassName()).toBe('');
    });

    it('should return single class name', () => {
      expect(createClassName('test')).toBe('test');
    });

    it('should join multiple class names', () => {
      expect(createClassName('class1', 'class2', 'class3')).toBe('class1 class2 class3');
    });

    it('should filter out undefined values', () => {
      expect(createClassName('class1', undefined, 'class2')).toBe('class1 class2');
    });

    it('should filter out false values', () => {
      expect(createClassName('class1', false, 'class2')).toBe('class1 class2');
    });

    it('should filter out empty strings', () => {
      expect(createClassName('class1', '', 'class2')).toBe('class1 class2');
    });

    it('should handle all filtered values', () => {
      expect(createClassName(undefined, false, '')).toBe('');
    });

    it('should handle mixed valid and invalid values', () => {
      expect(createClassName('valid', undefined, false, '', 'another-valid')).toBe('valid another-valid');
    });
  });
});
