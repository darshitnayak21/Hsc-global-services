import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // CST Character: Small radius (radius-sm: 6px) for inputs & buttons; subtle motion-fast (150ms)
  const baseStyles =
    'inline-flex items-center justify-center font-medium whitespace-nowrap select-none cursor-pointer transition-all duration-150 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-primary)] disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99] font-["Inter"]';

  const sizeStyles = {
    sm: 'text-xs py-[var(--space-1)] px-[var(--space-3)] gap-[var(--space-1)] min-h-[34px]',
    md: 'text-sm py-[var(--space-2)] px-[var(--space-4)] gap-[var(--space-2)] min-h-[42px]',
    lg: 'text-base py-[var(--space-3)] px-[var(--space-6)] gap-[var(--space-2)] min-h-[48px]',
  };

  const variantStyles = {
    // Primary: Modern blue brand accent + white text
    primary:
      'bg-[var(--color-brand-primary)] hover:bg-[#0052cc] text-[var(--color-text-inverse)] shadow-xs hover:shadow-sm font-semibold',
    // Secondary: Light surface + subtle border + deep navy text
    secondary:
      'bg-[var(--color-background-primary)] hover:bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-slate-300 shadow-xs font-medium',
    // Accent: Violet technology accent
    accent:
      'bg-[var(--color-brand-secondary)] hover:bg-[#6d28d9] text-[var(--color-text-inverse)] shadow-xs hover:shadow-sm font-semibold',
    // Ghost: Transparent background + modern blue hover
    ghost:
      'bg-transparent hover:bg-[var(--color-background-accent)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]',
    // Destructive: Error red
    destructive:
      'bg-[var(--color-error)] hover:bg-[#dc2626] text-[var(--color-text-inverse)] shadow-xs',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span className="truncate">{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};
