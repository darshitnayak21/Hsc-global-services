import React from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title = 'Ready to Elevate Your IT Systems & Digital Growth?',
  description = 'Connect with our Hyderabad corporate engineering and digital marketing team to discuss technical consulting, custom development, or dedicated tech talent staffing.',
  primaryCtaText = 'Get In Touch',
  secondaryCtaText = 'Explore Practice Areas',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
}) => {
  return (
    <section className={`py-20 md:py-28 relative overflow-hidden bg-[#f8fafc] border-t border-slate-200/80 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-[30px] md:rounded-[40px] bg-slate-900 border border-slate-800 p-8 md:p-16 overflow-hidden shadow-2xl text-white">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Overline */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-white/10 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#00F39C]" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                HSC Global Services · Kukatpally, Hyderabad
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight font-['Playfair_Display'] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h2>

            <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-['Plus_Jakarta_Sans'] font-light">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onPrimaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[30px] bg-white hover:bg-[#3183FF] text-slate-900 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onSecondaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[30px] border border-white/20 text-white hover:bg-white/10 text-sm font-normal transition-all duration-200 cursor-pointer"
              >
                <span>{secondaryCtaText}</span>
              </button>
            </div>

            {/* Verified Contact Bar */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
              <a
                href="tel:+917799373334"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#3183FF]" aria-hidden="true" />
                <span className="font-mono">+91 7799373334</span>
              </a>

              <a
                href="mailto:info@hscglobalserices.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#3183FF]" aria-hidden="true" />
                <span>info@hscglobalserices.com</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-[#3183FF]" aria-hidden="true" />
                <span>Kukatpally, Hyderabad 500072</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
