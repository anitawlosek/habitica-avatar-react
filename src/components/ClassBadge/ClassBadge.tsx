import React, { useEffect, useState } from 'react';
import { MemberClass } from '../../types/HabiticaMember';
import styles from './ClassBadge.module.scss';

const ICON_URLS: Record<MemberClass, string> = {
  warrior: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/warrior.svg',
  rogue: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/rogue.svg',
  healer: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/healer.svg',
  wizard: 'https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/wizard.svg',
};

export interface ClassBadgeProps {
  memberClass: MemberClass;
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
      className={`${styles['class-badge']}${className ? ' ' + className : ''}`}
      style={{ ['--badge-size']: badgeSize + 'px' } as React.CSSProperties}
    >
      <div
        className={styles['svg-icon']}
        aria-label={memberClass}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};

export default ClassBadge;
