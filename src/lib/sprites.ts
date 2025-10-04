export type SpriteDetails = {
    width: number;
    height: number;
    format: 'png' | 'gif';
};

const BASE_URL = 'https://habitica-assets.s3.amazonaws.com/mobileApp/images';
const DEFAULT_EXTENSION = 'png'

/**
 * Get sprite URL from configuration
 */
export const getSpriteUrl = (
  fileName: string, 
  ext: string = DEFAULT_EXTENSION,
  baseUrl: string = BASE_URL
): string | null => {  
  return `${baseUrl}/${fileName}.${ext}`;
};

/**
 * Cache for loaded image dimensions
 */
const imageDetailsCache = new Map<string, SpriteDetails>();

/**
 * Load and cache the actual dimensions and formatof a sprite image
 * Automatically detects PNG or GIF format
 */
export const loadSpriteDetails = async (fileName: string): Promise<SpriteDetails | null> => {
  if (!fileName) {
    return null;
  }
  
  // Check cache first
  if (imageDetailsCache.has(fileName)) {
    return imageDetailsCache.get(fileName)!;
  }
  
  // Try PNG first, then GIF
  const tryFormat = (format: 'png' | 'gif'): Promise<{ width: number; height: number; format: 'png' | 'gif' } | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = `${BASE_URL}/${fileName}.${format}`;
      
      img.onload = () => {
        const result = { width: img.width, height: img.height, format };
        imageDetailsCache.set(fileName, result);
        resolve(result);
      };
      
      img.onerror = () => {
        resolve(null);
      };
      
      img.src = url;
    });
  };
  
  // Try PNG first (most common)
  const pngResult = await tryFormat('png');

    if (pngResult) {
        return pngResult;
    }

    return tryFormat('gif');
};

/**
 * Get cached sprite dimensions (synchronous, returns null if not loaded)
 */
export const getCachedSpriteDetails = (fileName: string): { width: number; height: number; format: 'png' | 'gif' } | null => {
  if (!fileName) return null;

  return imageDetailsCache.get(fileName) || null;
};