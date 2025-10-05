import { describe, it, expect } from 'vitest';
import { getSpriteUrl, getCachedSpriteDetails } from './sprites';

describe('sprites', () => {
  describe('getSpriteUrl', () => {
    it('should return URL with default PNG extension', () => {
      const url = getSpriteUrl('test-sprite');
      expect(url).toBe('https://habitica-assets.s3.amazonaws.com/mobileApp/images/test-sprite.png');
    });

    it('should return URL with custom extension', () => {
      const url = getSpriteUrl('test-sprite', 'gif');
      expect(url).toBe('https://habitica-assets.s3.amazonaws.com/mobileApp/images/test-sprite.gif');
    });

    it('should return URL with custom base URL', () => {
      const url = getSpriteUrl('test-sprite', 'png', 'https://custom.url/images');
      expect(url).toBe('https://custom.url/images/test-sprite.png');
    });

    it('should handle complex file names', () => {
      const url = getSpriteUrl('gear/armor/warrior_1');
      expect(url).toBe('https://habitica-assets.s3.amazonaws.com/mobileApp/images/gear/armor/warrior_1.png');
    });
  });

  describe('getCachedSpriteDetails', () => {
    it('should return null for empty file name', () => {
      expect(getCachedSpriteDetails('')).toBe(null);
    });

    it('should return null for uncached sprite', () => {
      // Use a unique name that hasn't been cached
      const result = getCachedSpriteDetails('never-loaded-sprite-' + Date.now());
      expect(result).toBe(null);
    });
  });
});
