import React from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  variant?: 'canvas' | 'subtle' | 'contrast';
  className?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  variant = 'canvas',
  className = '',
  containerClassName = '',
}) => {
  const variantStyles = {
    canvas: 'bg-white text-slate-900',
    subtle: 'bg-[#f8fafc] text-slate-900 border-y border-slate-200/80',
    contrast: 'bg-[#0f172a] text-white border-y border-slate-800',
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 relative overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  category?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  category,
  title,
  description,
  align = 'center',
  action,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      {category && (
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-slate-100 border border-slate-200 text-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#3183FF] shadow-[0_0_8px_#3183FF]"></span>
          <span className="text-xs font-mono uppercase tracking-widest font-medium">
            {category}
          </span>
        </div>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 font-['Playfair_Display'] leading-[1.08]"
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto font-['Plus_Jakarta_Sans'] font-light">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
