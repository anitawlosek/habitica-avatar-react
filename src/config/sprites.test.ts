/**
 * Test file to verify sprite URL generation and class name extraction
 */

import { 
  getSpriteUrlFromConfig, 
  defaultSpriteConfig, 
  extractSpriteClassName
} from '../config/sprites';

describe('Sprite URL Generation', () => {
  it('generates correct PNG URLs for class names', () => {
    expect(getSpriteUrlFromConfig('skin_f5d5ae')).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png'
    );
    
    expect(getSpriteUrlFromConfig('hair_bangs_1_8b4513')).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/hair_bangs_1_8b4513.png'
    );
    
    expect(getSpriteUrlFromConfig('Pet-Wolf-Base')).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-Wolf-Base.png'
    );
  });

  it('handles multiple class names by using only the first one', () => {
    expect(getSpriteUrlFromConfig('skin_f5d5ae some-other-class')).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png'
    );
  });

  it('returns null for empty class names', () => {
    expect(getSpriteUrlFromConfig('')).toBe(null);
    expect(getSpriteUrlFromConfig('   ')).toBe(null);
  });

  it('generates GIF URLs for configured classes', () => {
    const configWithGif = {
      ...defaultSpriteConfig,
      gifExtensions: ['animated_sprite']
    };
    
    expect(getSpriteUrlFromConfig('animated_sprite', configWithGif)).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/animated_sprite.gif'
    );
    
    expect(getSpriteUrlFromConfig('hair_base_1', configWithGif)).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/hair_base_1.png'
    );
  });

  it('allows custom base URL', () => {
    const customConfig = {
      ...defaultSpriteConfig,
      baseUrl: 'https://my-cdn.com/sprites'
    };
    
    expect(getSpriteUrlFromConfig('skin_f5d5ae', customConfig)).toBe(
      'https://my-cdn.com/sprites/skin_f5d5ae.png'
    );
  });
});

describe('Sprite Class Name Extraction', () => {
  describe('extractSpriteClassName', () => {
    it('should extract sprite class from simple className', () => {
      expect(extractSpriteClassName('hair_base_1')).toBe('hair_base_1');
      expect(extractSpriteClassName('weapon_sword_1')).toBe('weapon_sword_1');
      expect(extractSpriteClassName('armor_rogue_1')).toBe('armor_rogue_1');
      expect(extractSpriteClassName('skin_f5d5ae')).toBe('skin_f5d5ae');
    });

    it('should extract sprite class from mixed className with utility classes', () => {
      expect(extractSpriteClassName('pull-left hair_base_1 sprite-class')).toBe('hair_base_1');
      expect(extractSpriteClassName('d-flex weapon_sword_1 align-center')).toBe('weapon_sword_1');
      expect(extractSpriteClassName('container armor_rogue_1 mx-auto')).toBe('armor_rogue_1');
      expect(extractSpriteClassName('bootstrap-class skin_f5d5ae utility-class')).toBe('skin_f5d5ae');
    });

    it('should return the first valid sprite class when multiple exist', () => {
      expect(extractSpriteClassName('hair_base_1 weapon_sword_1')).toBe('hair_base_1');
      expect(extractSpriteClassName('Pet-Wolf-Skeleton armor_rogue_1')).toBe('Pet-Wolf-Skeleton');
      expect(extractSpriteClassName('skin_f5d5ae hair_bangs_1_8b4513')).toBe('skin_f5d5ae');
    });

    it('should return null for className with no sprite classes', () => {
      expect(extractSpriteClassName('pull-left d-flex align-center')).toBeNull();
      expect(extractSpriteClassName('container mx-auto sprite-class')).toBeNull();
      expect(extractSpriteClassName('bootstrap-utility css-class')).toBeNull();
      expect(extractSpriteClassName('')).toBeNull();
      expect(extractSpriteClassName('   ')).toBeNull();
    });

    it('should handle complex sprite names with numbers and dashes', () => {
      expect(extractSpriteClassName('pull-left Pet-Wolf-Skeleton sprite-class')).toBe('Pet-Wolf-Skeleton');
      expect(extractSpriteClassName('d-flex Mount_BearCub-Polar align-center')).toBe('Mount_BearCub-Polar');
      expect(extractSpriteClassName('eyewear_special_blackTopFrame utility-class')).toBe('eyewear_special_blackTopFrame');
      expect(extractSpriteClassName('bootstrap head_special_1 utility')).toBe('head_special_1');
    });

    it('should handle sprite classes at different positions', () => {
      expect(extractSpriteClassName('hair_base_1 pull-left d-flex')).toBe('hair_base_1');
      expect(extractSpriteClassName('pull-left weapon_sword_1 d-flex')).toBe('weapon_sword_1');
      expect(extractSpriteClassName('pull-left d-flex armor_rogue_1')).toBe('armor_rogue_1');
      expect(extractSpriteClassName('utility skin_f5d5ae more-utilities')).toBe('skin_f5d5ae');
    });

    it('should handle all known sprite prefixes', () => {
      expect(extractSpriteClassName('layout hair_base_1 utility')).toBe('hair_base_1');
      expect(extractSpriteClassName('layout skin_f5d5ae utility')).toBe('skin_f5d5ae');
      expect(extractSpriteClassName('layout shirt_special_1 utility')).toBe('shirt_special_1');
      expect(extractSpriteClassName('layout armor_rogue_1 utility')).toBe('armor_rogue_1');
      expect(extractSpriteClassName('layout back_special_1 utility')).toBe('back_special_1');
      expect(extractSpriteClassName('layout head_special_1 utility')).toBe('head_special_1');
      expect(extractSpriteClassName('layout shield_rogue_1 utility')).toBe('shield_rogue_1');
      expect(extractSpriteClassName('layout weapon_sword_1 utility')).toBe('weapon_sword_1');
      expect(extractSpriteClassName('layout eyewear_special_1 utility')).toBe('eyewear_special_1');
      expect(extractSpriteClassName('layout body_special_1 utility')).toBe('body_special_1');
      expect(extractSpriteClassName('layout Pet-Wolf-Base utility')).toBe('Pet-Wolf-Base');
      expect(extractSpriteClassName('layout Mount_BearCub-Polar utility')).toBe('Mount_BearCub-Polar');
    });
  });

  it('should use extracted class name in getSpriteUrlFromConfig', () => {
    // Test that mixed class names work correctly in the main function
    expect(getSpriteUrlFromConfig('pull-left hair_base_1 utility')).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/hair_base_1.png'
    );
    
    expect(getSpriteUrlFromConfig('bootstrap skin_f5d5ae css-class')).toBe(
      'https://habitica-assets.s3.amazonaws.com/mobileApp/images/skin_f5d5ae.png'
    );

    // Test that non-sprite classes return null
    expect(getSpriteUrlFromConfig('pull-left d-flex utility-class')).toBe(null);
  });
});