import React from 'react';
import { ComponentState } from './Button';
import { Check, ArrowRight, AlertCircle, FileQuestion } from 'lucide-react';

export interface ServiceData {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables?: string[];
  technologies?: string[];
  icon: React.ReactNode;
}

export interface ServiceCardProps {
  service: ServiceData;
  onSelect?: (id: string) => void;
  forcedState?: ComponentState;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
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
      <div className={`p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center ${className}`}>
        <FileQuestion className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-xs font-mono text-slate-500">Service profile unconfigured.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-6 rounded-2xl border border-red-200 bg-red-50 text-red-700 ${className}`}>
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <h4 className="text-xs font-bold font-mono">Service Load Error</h4>
        </div>
        <p className="text-xs text-red-600">Could not retrieve deliverables for {service.title}.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`p-8 rounded-2xl bg-white border border-slate-200 shadow-sm animate-pulse space-y-4 ${className}`}>
        <div className="w-12 h-12 bg-slate-200 rounded-xl" />
        <div className="h-6 w-3/4 bg-slate-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-5/6 bg-slate-100 rounded" />
        </div>
        <div className="h-4 w-24 bg-slate-200 rounded pt-4" />
      </div>
    );
  }

  const stateClass = isHover
    ? 'border-[#007bff] shadow-lg -translate-y-1'
    : isFocus
    ? 'ring-2 ring-[#007bff] ring-offset-2 ring-offset-white border-[#007bff]'
    : isActive
    ? 'scale-[0.98] border-[#0056b3] bg-blue-50/20'
    : isDisabled
    ? 'opacity-50 pointer-events-none'
    : 'hover:border-[#007bff]/50 hover:shadow-lg hover:-translate-y-0.5';

  return (
    <div
      tabIndex={isDisabled ? -1 : 0}
      className={`p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] ${stateClass} ${className}`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#007bff] group-hover:bg-[#007bff] group-hover:text-white transition-colors">
            {service.icon}
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 font-['Raleway'] tracking-tight group-hover:text-[#007bff] transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {service.description}
        </p>

        {/* Deliverables Checklist */}
        {service.deliverables && service.deliverables.length > 0 && (
          <ul className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            {service.deliverables.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-[#007bff] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Info & Technologies */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        {service.technologies && service.technologies.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {service.technologies.slice(0, 2).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs font-mono text-slate-400">Enterprise Practice</span>
        )}

        {onSelect && (
          <button
            onClick={() => onSelect(service.id)}
            disabled={isDisabled}
            className="text-xs font-bold text-[#007bff] hover:text-[#0056b3] flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer font-['Raleway']"
            aria-label={`Learn more about ${service.title}`}
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
