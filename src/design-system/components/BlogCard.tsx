import React from 'react';
import { ComponentState } from './Button';
import { Tag, Clock, ArrowRight, BookOpen, AlertCircle, FileQuestion } from 'lucide-react';

export interface BlogPostData {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  icon: React.ReactNode;
}

export interface BlogCardProps {
  post: BlogPostData;
  onReadMore?: (post: BlogPostData) => void;
  forcedState?: ComponentState;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onReadMore,
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
        <span className="text-xs font-mono text-slate-500">No article published in this slot.</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-6 rounded-2xl border border-red-200 bg-red-50 text-red-700 ${className}`}>
        <AlertCircle className="w-5 h-5 text-red-500 mb-1" />
        <h4 className="text-xs font-bold font-mono">Article Metadata Error</h4>
        <p className="text-xs text-red-600 mt-0.5">Could not parse markdown content stream.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm animate-pulse space-y-3 ${className}`}>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="h-4 w-12 bg-slate-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-4/5 bg-slate-100 rounded" />
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
      onClick={() => !isDisabled && onReadMore?.(post)}
      className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] ${stateClass} ${className}`}
      role="article"
    >
      <div>
        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-[#007bff] font-mono text-[11px] font-bold uppercase tracking-wider">
            <Tag className="w-3 h-3" aria-hidden="true" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <Clock className="w-3 h-3" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#007bff] shrink-0 group-hover:bg-[#007bff] group-hover:text-white transition-colors">
            {post.icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Raleway'] tracking-tight group-hover:text-[#007bff] transition-colors leading-snug">
            {post.title}
          </h3>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 leading-relaxed mt-2 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Insight</span>
        </span>

        <span className="text-xs font-bold text-[#007bff] group-hover:text-[#0056b3] flex items-center gap-1 transition-colors font-['Raleway']">
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
