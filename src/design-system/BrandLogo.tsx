import React, { useState } from 'react';
import { COMPANY_LOGO_PNG, HSC_LOGO_CANDIDATE_PATHS, HSC_LOGO_PNG } from '../assets/logo';
import { RotatingGlobalSphere } from '../components/RotatingGlobalSphere';
import { HscLogoIcon } from '../components/HscLogoIcon';

export interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'light' | 'dark';
  imageClassName?: string;
  textClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'dark',
  imageClassName = '',
  textClassName = '',
}) => {
  const isDark = theme === 'dark';
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  // Proportional height matching the complete branding text block (company name + tagline)
  // Maintains 2:1 aspect ratio without stretching or cropping (image is 958 x 478)
  const logoHeightClass =
    size === 'sm'
      ? 'h-8 sm:h-9'
      : size === 'lg'
      ? 'h-11 sm:h-12 md:h-[52px] lg:h-[56px]'
      : 'h-10 sm:h-11 md:h-12 lg:h-[48px]';

  const gapClass =
    size === 'sm'
      ? 'gap-2.5 sm:gap-3'
      : size === 'lg'
      ? 'gap-3.5 sm:gap-4 md:gap-5'
      : 'gap-3 sm:gap-3.5 md:gap-4';

  const headingSize =
    size === 'sm'
      ? 'text-xs sm:text-sm tracking-[1.5px]'
      : size === 'lg'
      ? 'text-base sm:text-xl md:text-2xl tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px]'
      : 'text-sm sm:text-base md:text-lg lg:text-xl tracking-[1.8px] sm:tracking-[2.2px] md:tracking-[2.6px]';

  const taglineSize =
    size === 'sm'
      ? 'text-[9px] sm:text-[10px]'
      : size === 'lg'
      ? 'text-xs sm:text-sm md:text-[14px]'
      : 'text-[10px] sm:text-xs md:text-[13px]';

  const candidateList = [COMPANY_LOGO_PNG, ...HSC_LOGO_CANDIDATE_PATHS];

  const handleImageError = () => {
    if (candidateIndex < candidateList.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const currentSrc = candidateList[candidateIndex] || COMPANY_LOGO_PNG || HSC_LOGO_PNG;

  return (
    <div className={`inline-flex items-center ${gapClass} select-none ${className}`}>
      {/* Company Logo on the left: vertically centered with the branding block */}
      {!allFailed ? (
        <img
          src={currentSrc}
          alt="HSC Global Services"
          width={958}
          height={478}
          onError={handleImageError}
          className={`${logoHeightClass} w-auto object-contain block shrink-0 select-none transition-transform duration-200 group-hover:scale-[1.02] ${imageClassName}`}
          loading="eager"
          decoding="async"
        />
      ) : (
        <HscLogoIcon
          size={size === 'sm' ? 34 : size === 'lg' ? 52 : 44}
          theme={theme}
          className={imageClassName}
        />
      )}

      {/* Complete Branding Text Block on the right: Company Name on top, Tagline directly below */}
      {showText && (
        <div className={`flex flex-col justify-center min-w-0 ${textClassName}`}>
          <div
            className={`company-name uppercase font-bold leading-tight ${headingSize} flex items-center flex-wrap gap-x-1 sm:gap-x-1.5`}
            style={{ fontFamily: "'Jost', sans-serif" }}
            aria-label="HSC GLOBAL SERVICES"
          >
            {/* HSC in vibrant amber/orange */}
            <span className="text-amber-500 font-black drop-shadow-[0_1px_2px_rgba(180,83,9,0.3)]">
              HSC
            </span>

            {/* GLOBAL with rotating sphere replacing 'O' */}
            <span className={`${isDark ? 'text-white' : 'text-slate-900'} font-black inline-flex items-center`}>
              <span>GL</span>
              <RotatingGlobalSphere
                className="h-[0.9em] w-[0.9em] mx-[0.5px]"
                size={size === 'sm' ? 14 : size === 'lg' ? 20 : 17}
              />
              <span>BAL</span>
            </span>

            {/* SERVICES in hot pink/magenta */}
            <span className="text-pink-600 font-black drop-shadow-[0_1px_2px_rgba(219,39,119,0.25)]">
              SERVICES
            </span>
          </div>

          <span
            className={`${taglineSize} font-semibold tracking-[0.3px] leading-tight mt-0.5 sm:mt-1 truncate ${
              isDark ? 'text-slate-200' : 'text-slate-600'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Connecting Talent with Opportunity
          </span>
        </div>
      )}
    </div>
  );
};
