import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'light',
}) => {
  const sizeMap = {
    sm: 'text-base font-extrabold',
    md: 'text-lg sm:text-xl font-black',
    lg: 'text-xl sm:text-2xl font-black',
  };

  const isDark = theme === 'dark';

  if (!showText) return null;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span
        className={`tracking-tight ${sizeMap[size]} ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        Hscgolbalservices
      </span>
    </div>
  );
};

