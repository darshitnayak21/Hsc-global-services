import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'surface' | 'subtle' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  padding = 'md',
  className = '',
  ...props
}) => {
  // CST Character: Medium radius (radius-md: 12px) for cards & modules
  const baseStyles = 'rounded-[var(--radius-md)] relative overflow-hidden transition-all duration-200';

  const variantStyles = {
    surface:
      'bg-[var(--color-background-primary)] border border-[var(--color-border-default)] shadow-xs',
    subtle:
      'bg-[var(--color-background-secondary)] border border-[var(--color-border-subtle)]',
    elevated:
      'bg-[var(--color-background-primary)] border border-[var(--color-border-default)] shadow-md shadow-slate-900/5',
    interactive:
      'bg-[var(--color-background-primary)] hover:bg-[var(--color-background-secondary)] border border-[var(--color-border-default)] hover:border-[var(--color-brand-primary)] hover-lift-subtle group cursor-pointer',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-[var(--space-4)]',
    md: 'p-[var(--space-6)]',
    lg: 'p-[var(--space-8)]',
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

export const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, badge, icon, className = '' }) => (
  <div className={`mb-[var(--space-4)] ${className}`}>
    <div className="flex items-start justify-between gap-3">
      {icon && <div className="text-[var(--color-brand-primary)] shrink-0">{icon}</div>}
      {badge && <div className="ml-auto">{badge}</div>}
    </div>
    <h3 className="text-h3 font-semibold text-[var(--color-text-primary)] mt-2">
      {title}
    </h3>
    {subtitle && (
      <p className="text-body-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);
