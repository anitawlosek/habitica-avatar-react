import React, { useEffect, useState } from 'react';
import { getCachedSpriteDimensions, getSpriteUrlFromConfig, loadSpriteDimensions } from '../config/sprites';

interface SpriteProps {
  className: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

/**
 * Sprite component that automatically applies background images based on className
 */
const Sprite: React.FC<SpriteProps> = ({ className, style = {}, onClick, children }) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const url = getSpriteUrlFromConfig(className) ?? undefined;

  useEffect(() => {
    // Try to get cached dimensions first
    const cached = getCachedSpriteDimensions(className);
    if (cached) {
      setDimensions({ width: cached.width, height: cached.height });
    } else {
      // Load dimensions asynchronously
      loadSpriteDimensions(className).then((result) => {
        if (result) {
          setDimensions({ width: result.width, height: result.height });
        }
      });
    }
  }, [className]);

  const combinedStyle: React.CSSProperties = {
    backgroundImage: url && `url(${url})`,
    // Apply dimensions if available
    ...(dimensions && {
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
    }),
    ...style, // Allow style prop to override defaults
  };

  const Element = children ? 'div' : 'span';

  return (
    <Element
      className={className}
      style={combinedStyle}
      onClick={onClick}
    >
      {children}
    </Element>
  );
};

export default Sprite;