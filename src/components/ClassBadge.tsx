import React from 'react';

interface ClassBadgeProps {
  memberClass?: string;
  className?: string;
}

const ClassBadge: React.FC<ClassBadgeProps> = ({ memberClass, className }) => {
  if (!memberClass) return null;

  return (
    <div className={`class-badge ${className || ''}`}>
      <span className={`class-${memberClass}`}>{memberClass}</span>
    </div>
  );
};

export default ClassBadge;