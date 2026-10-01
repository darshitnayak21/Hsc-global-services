import React from 'react';
import { ComponentState } from './Button';
import { AlertCircle, FileQuestion } from 'lucide-react';

export interface SectionHeaderProps {
  category?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  forcedState?: ComponentState;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  category,
  title,
  description,
  align = 'center',
  forcedState = 'default',
  action,
  className = '',
}) => {
  const isCenter = align === 'center';
  const isError = forcedState === 'error';
  const isEmpty = forcedState === 'empty';
  const isLoading = forcedState === 'loading';
  const isDisabled = forcedState === 'disabled';

  if (isEmpty) {
    return (
      <div className={`p-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center ${className}`}>
        <FileQuestion className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h3 className="text-sm font-bold font-['Raleway'] text-slate-500">No Section Content Provided</h3>
        <p className="text-xs text-slate-400 mt-1">Section header has empty category and title metadata.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-6 rounded-xl border border-red-200 bg-red-50 text-red-700 ${className}`}>
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h3 className="text-sm font-bold font-['Raleway'] text-red-900">Section Header Rendering Failure</h3>
        </div>
        <p className="text-xs text-red-600">Failed to parse localized title string for: "{title}"</p>
      </div>
    );
  }

  return (
    <div
      className={`mb-10 md:mb-14 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-28 bg-slate-200 rounded mx-auto" />
          <div className="h-8 w-3/4 bg-slate-200 rounded mx-auto" />
          <div className="h-4 w-5/6 bg-slate-100 rounded mx-auto" />
        </div>
      ) : (
        <>
          {category && (
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#007bff]" aria-hidden="true" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#007bff]">
                {category}
              </span>
            </div>
          )}

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-['Raleway'] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h2>

          {description && (
            <p className="text-sm md:text-base text-slate-600 mt-3 md:mt-4 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {action && <div className="mt-6">{action}</div>}
        </>
      )}
    </div>
  );
};
