import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'secondary' | 'cyan' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

/**
 * CST Tag / Badge Component
 * Strict Rule: Radius pill (9999px) is used ONLY for tags/pills/chips/badges.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-[var(--space-2)] py-0.5 gap-1',
    md: 'text-label px-[var(--space-3)] py-1 gap-1.5',
  };

  const variantStyles = {
    brand:
      'bg-[var(--color-background-accent)] text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20',
    secondary:
      'bg-purple-50 text-[var(--color-brand-secondary)] border border-[var(--color-brand-secondary)]/20',
    cyan:
      'bg-cyan-50 text-cyan-700 border border-cyan-200',
    neutral:
      'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-default)]',
    success:
      'bg-emerald-50 text-[var(--color-success)] border border-emerald-200',
    warning:
      'bg-amber-50 text-[var(--color-warning)] border border-amber-200',
    error:
      'bg-red-50 text-[var(--color-error)] border border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-[var(--radius-pill)] select-none uppercase tracking-wider font-["JetBrains_Mono"] ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
