import React, { useRef } from 'react';
import { ServiceItem, ServiceCard } from './ServiceCard';
import { ArrowRight } from 'lucide-react';

interface ComprehensiveSolutionsSectionProps {
  services: ServiceItem[];
  onNavigate: (pageId: any) => void;
  onSelectService?: (serviceId: string) => void;
}

export const ComprehensiveSolutionsSection: React.FC<ComprehensiveSolutionsSectionProps> = ({
  services,
  onNavigate,
  onSelectService,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white border-y border-slate-200/80 overflow-hidden text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 lg:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
              <span>Providing the best IT solutions &amp; Services</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-['Playfair_Display'] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Take Your Enterprise To{' '}
              <span className="italic font-normal text-slate-800">
                The Next Level
              </span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl font-['Plus_Jakarta_Sans'] font-light">
              Transform your business with strategic digital marketing and engineering.
              Harness data-driven insights, engage customers across platforms, and maximize ROI.
            </p>
          </div>

          <div className="self-start md:self-auto">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>View All 6 Practice Areas</span>
              <ArrowRight className="w-4 h-4 text-[#3183FF]" />
            </button>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={() => {
                if (onSelectService) {
                  onSelectService(service.id);
                } else {
                  onNavigate('services');
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
