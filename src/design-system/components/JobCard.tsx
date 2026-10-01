import React from 'react';
import { Button, ComponentState } from './Button';
import { MapPin, Clock, ArrowRight, AlertCircle, FileQuestion } from 'lucide-react';

export interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
}

export interface JobCardProps {
  job: JobData;
  onApply?: (job: JobData) => void;
  forcedState?: ComponentState;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
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
      <div className={`p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center ${className}`}>
        <FileQuestion className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <span className="text-xs font-mono text-slate-500">Position currently filled or inactive.</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-6 rounded-2xl border border-red-200 bg-red-50 text-red-700 ${className}`}>
        <AlertCircle className="w-5 h-5 text-red-500 mb-1" />
        <h4 className="text-xs font-bold font-mono">Job Feed Unavailable</h4>
        <p className="text-xs text-red-600 mt-0.5">Could not retrieve requisition details.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm animate-pulse space-y-3 ${className}`}>
        <div className="flex justify-between">
          <div className="w-8 h-8 bg-slate-200 rounded-lg" />
          <div className="h-4 w-24 bg-slate-200 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-1/2 bg-slate-100 rounded" />
        <div className="h-10 w-full bg-slate-100 rounded pt-3" />
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
      className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] ${stateClass} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#007bff] group-hover:bg-[#007bff] group-hover:text-white transition-colors">
            {job.icon}
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {job.department}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-['Raleway'] group-hover:text-[#007bff] transition-colors">
          {job.title}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#007bff]" />
            {job.location}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#007bff]" />
            {job.experience}
          </span>
        </div>

        <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
          {job.description}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">{job.type}</span>
        <Button
          variant="primary"
          size="sm"
          forcedState={forcedState}
          onClick={() => onApply?.(job)}
          iconRight={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};
