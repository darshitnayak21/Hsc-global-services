import React, { useState } from 'react';
import { VERIFIED_CLIENTS, CLIENT_LOGOS } from './ClientLogoGrid';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface MovateClientMarqueeProps {
  onNavigate?: (pageId: any) => void;
  className?: string;
}

export const MovateClientMarquee: React.FC<MovateClientMarqueeProps> = ({
  onNavigate,
  className = '',
}) => {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  // Duplicate items to ensure infinite seamless loop
  const marqueeItems = [...VERIFIED_CLIENTS, ...VERIFIED_CLIENTS, ...VERIFIED_CLIENTS];

  return (
    <div className={`relative py-12 bg-[#f8fafc] border-y border-slate-200/80 overflow-hidden text-slate-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-slate-600">
              Trusted By Regional Conglomerates &amp; Enterprise Leaders
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#007bff]" />
            <span>Verified Long-Term Client Engagements</span>
          </div>
        </div>
      </div>

      {/* Edge gradient masks for seamless infinite fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      {/* Infinite Horizontal Running Track */}
      <div className="overflow-hidden py-2">
        <div className="animate-marquee-24s flex items-center gap-5 group hover:[animation-play-state:paused]">
          {marqueeItems.map((client, idx) => {
            const isHovered = hoveredClient === `${client.id}-${idx}`;
            const logoSrc = CLIENT_LOGOS[client.id];

            return (
              <div
                key={`${client.id}-${idx}`}
                onMouseEnter={() => setHoveredClient(`${client.id}-${idx}`)}
                onMouseLeave={() => setHoveredClient(null)}
                onClick={() => onNavigate?.('clients')}
                className="group/card relative flex-shrink-0 w-72 sm:w-80 h-32 sm:h-34 rounded-xl bg-white border border-slate-200/90 p-4 transition-all duration-300 hover:border-[#3183FF]/50 hover:shadow-lg cursor-pointer overflow-hidden flex items-center justify-center"
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${client.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center transition-transform duration-300 group-hover/card:scale-105"
                  />
                ) : (
                  <div className="p-2 rounded bg-slate-50 border border-slate-100 shrink-0">
                    {client.logo}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
