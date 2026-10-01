import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features?: string[];
  icon: React.ReactNode;
  technologies?: string[];
}

interface ServiceCardProps {
  service: ServiceItem;
  onSelect?: (serviceId: string) => void;
  variant?: 'surface' | 'elevated';
}

const SERVICE_ACCENTS: Record<string, string> = {
  'technology-consulting': '#3183FF', // Cobalt Blue
  'web-technologies': '#FF8562',       // Peach Coral
  'digital-marketing': '#FF2E00',      // Electric Scarlet
  'staffing-solutions': '#00F39C',     // Neon Mint
  'digital-strategy': '#F5D00B',       // Solar Canary Gold
  'seo-backlinks': '#3183FF',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
}) => {
  const accent = SERVICE_ACCENTS[service.id] || '#3183FF';

  return (
    <div
      onClick={() => onSelect?.(service.id)}
      className="relative group rounded-[30px] bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] h-full transition-all duration-300 hover:border-slate-300 hover:shadow-xl cursor-pointer overflow-hidden transform-gpu hover:-translate-y-1 shadow-xs"
    >
      {/* Top Header: Spectral Dot and Service Category */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-xs"
            style={{
              backgroundColor: accent,
            }}
          />
          <span className="text-xs font-mono tracking-wider text-slate-500 uppercase">
            {service.category}
          </span>
        </div>

        <div className="w-9 h-9 rounded-[16px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-[#3183FF] transition-colors duration-200">
          {service.icon}
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex-1">
        <h3 className="text-2xl sm:text-[26px] font-normal text-slate-900 font-['Playfair_Display'] tracking-tight leading-[1.2] group-hover:text-[#3183FF] transition-colors duration-200">
          {service.title}
        </h3>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light">
          {service.description}
        </p>
      </div>

      {/* Bottom CTA: 30px Pill Button */}
      <div className="pt-6 sm:pt-8 mt-auto">
        <div className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-[30px] border border-slate-200 bg-slate-50 group-hover:border-slate-300 group-hover:bg-slate-100 transition-all">
          <span className="text-[11px] sm:text-xs font-semibold font-mono tracking-wider text-slate-700 uppercase">
            Explore Practice
          </span>
          <span
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: accent === '#F5D00B' || accent === '#00F39C' ? '#0f172a' : accent }}
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
