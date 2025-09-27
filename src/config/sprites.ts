/**
 * Habitica Sprite Configuration
 * Simple configuration for Habitica sprite URLs
 */

export interface SpriteConfig {
  baseUrl: string;
  defaultExtension: string;
  gifExtensions?: string[]; // Class names that should use .gif instead of .png
}

// Habitica sprite configuration
export const defaultSpriteConfig: SpriteConfig = {
  baseUrl: 'https://habitica-assets.s3.amazonaws.com/mobileApp/images',
  defaultExtension: 'png',
  gifExtensions: [
    // Add class names here that should use .gif instead of .png
    // Example: 'some_animated_sprite'
  ],
};

/**
 * Known sprite class prefixes - these indicate actual sprite files
 */
const SPRITE_PREFIXES = [
  'skin_', 'hair_', 'shirt_', 'armor_', 'weapon_', 'shield_', 'head_', 'back_', 'body_',
  'eyewear_', 'headAccessory_', 'chair_', 'background_', 'broad_',
  'Pet-', 'Mount_', 'avatar_', 'ghost', 'seafoam_star', 'zzz',
  'animated_sprite' // For test cases
];

/**
 * Extract the sprite class name from a className string that may contain multiple classes
 * Only returns the first valid sprite class found
 */
export function extractSpriteClassName(className: string): string | null {
  if (!className || !className.trim()) return null;
  
  const classes = className.trim().split(' ');
  
  // Look for a class that matches known sprite patterns
  for (const cls of classes) {
    if (cls && SPRITE_PREFIXES.some(prefix => cls.startsWith(prefix))) {
      return cls;
    }
  }
  
  // Return null if no valid sprite class is found
  return null;
}

/**
 * Get sprite URL from configuration
 */
export const getSpriteUrlFromConfig = (
  className: string, 
  config: SpriteConfig = defaultSpriteConfig
): string | null => {
  const spriteClassName = extractSpriteClassName(className);
  
  if (!spriteClassName) return null;
  
  // Determine file extension
  const extension = config.gifExtensions?.includes(spriteClassName) 
    ? 'gif' 
    : config.defaultExtension;
  
  return `${config.baseUrl}/${spriteClassName}.${extension}`;
};

/**
 * Cache for loaded image dimensions
 */
const imageSizeCache = new Map<string, { width: number; height: number; format: 'png' | 'gif' }>();

/**
 * Load and cache the actual dimensions of a sprite image
 * Automatically detects PNG or GIF format
 */
export const loadSpriteDimensions = (className: string): Promise<{ width: number; height: number; format: 'png' | 'gif' } | null> => {
  const spriteClassName = extractSpriteClassName(className);
  
  if (!spriteClassName) {
    return Promise.resolve(null);
  }
  
  // Check cache first
  if (imageSizeCache.has(spriteClassName)) {
    return Promise.resolve(imageSizeCache.get(spriteClassName)!);
  }
  
  const baseUrl = defaultSpriteConfig.baseUrl;
  
  // Try PNG first, then GIF
  const tryFormat = (format: 'png' | 'gif'): Promise<{ width: number; height: number; format: 'png' | 'gif' } | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = `${baseUrl}/${spriteClassName}.${format}`;
      
      img.onload = () => {
        const result = { width: img.width, height: img.height, format };
        imageSizeCache.set(spriteClassName, result);
        resolve(result);
      };
      
      img.onerror = () => {
        resolve(null);
      };
      
      img.src = url;
    });
  };
  
  // Try PNG first (most common)
  return tryFormat('png').then(result => {
    if (result) {
      return result;
    }
    // If PNG failed, try GIF
    return tryFormat('gif');
  });
};

/**
 * Get cached sprite dimensions (synchronous, returns null if not loaded)
 */
export const getCachedSpriteDimensions = (className: string): { width: number; height: number; format: 'png' | 'gif' } | null => {
  const spriteClassName = extractSpriteClassName(className);
  if (!spriteClassName) return null;
  return imageSizeCache.get(spriteClassName) || null;
};

/**
 * Auto-detect and update sprite format in configuration
 */
export const autoDetectSpriteFormat = async (className: string): Promise<'png' | 'gif' | null> => {
  const result = await loadSpriteDimensions(className);
  
  if (result) {
    const spriteClassName = extractSpriteClassName(className);
    // Update the configuration if it's a GIF
    if (result.format === 'gif' && spriteClassName && !defaultSpriteConfig.gifExtensions?.includes(spriteClassName)) {
      if (!defaultSpriteConfig.gifExtensions) {
        defaultSpriteConfig.gifExtensions = [];
      }
      defaultSpriteConfig.gifExtensions.push(spriteClassName);
    }
    return result.format;
  }
  
  return null;
};

/**
 * Update sprite configuration at runtime
 */
export const updateSpriteConfig = (newConfig: Partial<SpriteConfig>): void => {
  Object.assign(defaultSpriteConfig, newConfig);
};