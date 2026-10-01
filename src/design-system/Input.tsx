import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

/**
 * CST Input Component
 * Strict Rule: Small radius (radius-sm: 6px) for inputs & form controls.
 * Accessibility: Visible focus ring, error state with aria-invalid, disabled state.
 */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  iconLeft,
  iconRight,
  id,
  disabled,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-body-sm font-medium text-[var(--color-text-primary)] select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-[var(--space-3)] text-[var(--color-text-muted)] pointer-events-none">
            {iconLeft}
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined}
          className={`w-full bg-[var(--color-background-primary)] text-[var(--color-text-primary)] rounded-[var(--radius-sm)] border py-[var(--space-2)] text-body-sm transition-all duration-150 outline-none
            ${iconLeft ? 'pl-9' : 'pl-[var(--space-3)]'}
            ${iconRight ? 'pr-9' : 'pr-[var(--space-3)]'}
            ${
              error
                ? 'border-[var(--color-error)] bg-red-50/30 text-red-900 focus:border-[var(--color-error)] focus:ring-2 focus:ring-red-200'
                : 'border-[var(--color-border-default)] hover:border-slate-400 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20'
            }
            ${disabled ? 'opacity-45 cursor-not-allowed bg-[var(--color-background-secondary)]' : ''}
            ${className}`}
          {...props}
        />

        {iconRight && (
          <span className="absolute right-[var(--space-3)] text-[var(--color-text-muted)] pointer-events-none">
            {iconRight}
          </span>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-caption text-[var(--color-error)] font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-desc`} className="text-caption text-[var(--color-text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
