import React from 'react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

export interface BlogPostItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  fullContent?: string;
  keyTakeaways?: string[];
  icon: React.ReactNode;
}

interface BlogCardProps {
  post: BlogPostItem;
  onReadMore?: (post: BlogPostItem) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  return (
    <div
      onClick={() => onReadMore?.(post)}
      className="relative flex flex-col justify-between h-full group rounded-[30px] bg-white border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-slate-300 cursor-pointer transition-all duration-300 overflow-hidden transform-gpu hover:-translate-y-1"
    >
      <div className="relative z-10">
        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-[#3183FF] font-mono text-[11px] font-semibold uppercase tracking-wider">
            <Tag className="w-3 h-3" aria-hidden="true" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-mono">
            <Clock className="w-3 h-3 text-slate-400" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Header Icon + Title */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-[16px] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#3183FF] shrink-0 group-hover:bg-[#3183FF] group-hover:text-white transition-all duration-200 shadow-xs">
            {post.icon}
          </div>
          <h3 className="text-xl font-normal text-slate-900 font-['Playfair_Display'] tracking-tight group-hover:text-[#3183FF] transition-colors duration-200 leading-snug">
            {post.title}
          </h3>
        </div>

        {/* Content Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <BookOpen className="w-3.5 h-3.5 text-[#007bff]" />
          <span>Case Insight</span>
        </span>

        <span className="text-xs font-semibold text-slate-900 group-hover:text-[#3183FF] flex items-center gap-1.5 transition-all duration-200 group-hover:translate-x-1">
          <span>Read Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
