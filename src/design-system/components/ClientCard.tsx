import React from 'react';
import { ComponentState } from './Button';
import { Building, AlertCircle, FileQuestion } from 'lucide-react';

export interface ClientData {
  id: string;
  name: string;
  industry: string;
  logo: React.ReactNode;
}

export interface ClientCardProps {
  client: ClientData;
  onClick?: (id: string) => void;
  forcedState?: ComponentState;
  className?: string;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onClick,
  forcedState = 'default',
  className = '',
}) => {
  const isLoading = forcedState === 'loading';
  const isError = forcedState === 'error';
  const isEmpty = forcedState === 'empty';
  const isDisabled = forcedState === 'disabled';
  const isHover = forcedState === 'hover';
  const isFocus = forcedState === 'focus-visible';
  const isActive = forcedState === 'active';

  if (isEmpty) {
    return (
      <div className={`p-6 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center ${className}`}>
        <FileQuestion className="w-6 h-6 text-slate-400 mx-auto mb-1" />
        <span className="text-[11px] font-mono text-slate-400">Empty Partner Slot</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-center ${className}`}>
        <AlertCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
        <span className="text-xs font-mono">Logo asset failed to render</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`p-6 rounded-xl bg-white border border-slate-200 shadow-sm animate-pulse space-y-3 ${className}`}>
        <div className="h-8 w-24 bg-slate-200 rounded mx-auto" />
        <div className="h-3 w-16 bg-slate-100 rounded mx-auto" />
      </div>
    );
  }

  const stateClass = isHover
    ? 'border-[#007bff] shadow-md -translate-y-1'
    : isFocus
    ? 'ring-2 ring-[#007bff] ring-offset-2 ring-offset-white border-[#007bff]'
    : isActive
    ? 'scale-[0.97] bg-slate-50 border-[#0056b3]'
    : isDisabled
    ? 'opacity-40 pointer-events-none'
    : 'hover:border-[#007bff]/50 hover:shadow-md hover:-translate-y-0.5';

  return (
    <div
      tabIndex={isDisabled ? -1 : 0}
      onClick={() => !isDisabled && onClick?.(client.id)}
      className={`p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] ${stateClass} ${className}`}
      title={`${client.name} - ${client.industry}`}
      role="button"
      aria-label={`Client partner: ${client.name}`}
    >
      <div className="h-10 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-150">
        {client.logo}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 w-full">
        <span className="text-xs font-bold text-slate-800 block truncate font-['Raleway']">
          {client.name}
        </span>
        <span className="text-[10px] text-slate-500 font-mono block truncate mt-0.5">
          {client.industry}
        </span>
      </div>
    </div>
  );
};
