import React from 'react';
import { Loader2 } from 'lucide-react';

export type ComponentState = 'default' | 'hover' | 'focus-visible' | 'active' | 'disabled' | 'loading' | 'error' | 'empty';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  forcedState?: ComponentState;
  loadingText?: string;
  errorMessage?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  forcedState = 'default',
  loadingText = 'Processing...',
  errorMessage,
  className = '',
  disabled,
  ...props
}) => {
  const isLoading = forcedState === 'loading';
  const isDisabled = disabled || forcedState === 'disabled' || isLoading;
  const isError = forcedState === 'error';
  const isEmpty = forcedState === 'empty';

  // Base touch and accessibility discipline
  const base =
    'relative inline-flex items-center justify-center font-bold font-[\'Raleway\'] rounded-lg transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-white';

  const sizeClasses = {
    sm: 'text-xs py-2 px-3.5 gap-1.5 min-h-[36px]',
    md: 'text-sm py-2.5 px-5 gap-2 min-h-[42px]',
    lg: 'text-base py-3.5 px-6 gap-2.5 min-h-[48px]',
  };

  const variantClasses = {
    primary:
      'bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0056b3] text-white shadow-sm shadow-blue-500/20 active:scale-[0.98]',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200 shadow-sm active:scale-[0.98]',
    accent:
      'bg-[#9433ae] hover:bg-[#7e2794] active:bg-[#681f7b] text-white shadow-sm shadow-purple-500/20 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-blue-50 active:bg-blue-100 text-[#007bff] border border-[#007bff]/40 hover:border-[#007bff]',
    ghost:
      'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 hover:text-[#007bff]',
    danger:
      'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm shadow-red-500/20',
  };

  // State simulators for showcase
  const stateSimulators = {
    default: '',
    hover: 'ring-2 ring-[#007bff]/20 brightness-105',
    'focus-visible': 'ring-2 ring-[#007bff] ring-offset-2 ring-offset-white outline-none',
    active: 'scale-[0.97] brightness-90',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    loading: 'cursor-wait opacity-90',
    error: 'ring-2 ring-red-500 border-red-500 bg-red-50 text-red-700',
    empty: 'opacity-40 border-dashed border-2 border-slate-300 bg-slate-50 text-slate-400',
  };

  return (
    <div className={`inline-flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      <button
        className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${
          stateSimulators[forcedState]
        } ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
            <span>{loadingText}</span>
          </>
        ) : isEmpty ? (
          <span className="italic text-xs">(No Action Defined)</span>
        ) : (
          <>
            {iconLeft && <span className="shrink-0">{iconLeft}</span>}
            <span className="truncate">{children}</span>
            {iconRight && <span className="shrink-0">{iconRight}</span>}
          </>
        )}
      </button>

      {isError && (
        <span className="text-[11px] text-red-600 font-mono mt-1" role="alert">
          {errorMessage || 'Action could not be executed'}
        </span>
      )}
    </div>
  );
};
