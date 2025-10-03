import React, { CSSProperties, useEffect } from 'react';
import { getSpriteUrl, loadSpriteDetails } from '../lib/sprites';
import { isDefined } from '../lib/helpers';
import './HabiticaAvatar.scss';

export interface HabiticaSpriteProps {
  /**
   * The className for the wrapper span/div
   */
  className?: string;
  /**
   * The fileName for the image (e.g. gear, mount, pet, etc)
   */
  fileName: string;
  /**
   * Optionally pass a style to the wrapper span
   */
  style?: React.CSSProperties;
  wrapper?: React.ElementType;
  onClick?: React.MouseEventHandler<HTMLSpanElement | HTMLDivElement>;
}

const HabiticaSprite: React.FC<HabiticaSpriteProps & { children?: React.ReactNode }> = ({
  className,
  fileName,
  style,
  wrapper = 'span',
  onClick,
  children,
}) => {
  if (isDefined(fileName) && (fileName.includes('base_0') || fileName.includes('_0_') || fileName.includes('_none'))) {
    return null;
  }

  const Wrapper = wrapper;
  const [inlineStyles, setInlineStyles] = React.useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    const fetchSpriteDetails = async () => {
      const details = await loadSpriteDetails(fileName);

      setInlineStyles({
        width: details ? `${details.width}px` : undefined,
        height: details ? `${details.height}px` : undefined,
        backgroundImage: details ? `url(${getSpriteUrl(fileName, details.format)})` : undefined,
        ...style
      });
    };

    fetchSpriteDetails();
  }, [fileName]);

  return (
    <Wrapper className={className} onClick={onClick} style={inlineStyles ?? style}>
      {isDefined(children) && children}
    </Wrapper>
  );
};

export default HabiticaSprite;
