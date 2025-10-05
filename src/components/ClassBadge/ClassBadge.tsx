import React, { useEffect, useState } from 'react';
import './ClassBadge.scss';

const ICON_URLS: Record<string, string> = {
  warrior: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/warrior.svg',
  rogue: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/rogue.svg',
  healer: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/healer.svg',
  wizard: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/wizard.svg',
};

export interface ClassBadgeProps {
  memberClass: 'warrior' | 'rogue' | 'healer' | 'wizard' | string;
  badgeSize?: number;
  className?: string;
}


const ClassBadge: React.FC<ClassBadgeProps> = ({ memberClass, badgeSize = 32, className = '' }) => {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const url = ICON_URLS[memberClass];
    if (url) {
      fetch(url)
        .then(res => res.text())
        .then(data => {
          if (isMounted) setSvg(data);
        })
        .catch(() => {
          if (isMounted) setSvg('');
        });
    } else {
      setSvg('');
    }
    return () => { isMounted = false; };
  }, [memberClass]);

  return (
    <div
      className={`class-badge d-flex justify-content-center${className ? ' ' + className : ''}`}
      style={{
        // CSS variable for badge size
        ...( { ['--badge-size']: badgeSize + 'px' } as React.CSSProperties ),
      }}
    >
      <div
        className="align-self-center svg-icon"
        aria-label={memberClass}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};

export default ClassBadge;
