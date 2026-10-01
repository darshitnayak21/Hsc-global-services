import React from 'react';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'bordered';
  padding?: 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * CST Feature Panel Component
 * Strict Rule: Larger radius (radius-lg: 20px) for feature panels & containers.
 */
export const Panel: React.FC<PanelProps> = ({
  children,
  variant = 'light',
  padding = 'lg',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-[var(--radius-lg)] relative overflow-hidden transition-all duration-250';

  const variantStyles = {
    light:
      'bg-[var(--color-background-secondary)] border border-[var(--color-border-default)] shadow-xs',
    dark:
      'bg-[var(--color-background-dark)] text-[var(--color-text-inverse)] border border-slate-800 shadow-xl',
    bordered:
      'bg-[var(--color-background-primary)] border-2 border-[var(--color-border-default)]',
  };

  const paddingStyles = {
    md: 'p-[var(--space-6)]',
    lg: 'p-[var(--space-8)] sm:p-[var(--space-10)]',
    xl: 'p-[var(--space-10)] sm:p-[var(--space-16)]',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
