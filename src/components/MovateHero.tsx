import React, { useState } from 'react';
import heroBgImage from '../assets/img1.jpg';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface MovateHeroProps {
  onNavigate: (pageId: any) => void;
  onGetInTouch: () => void;
}

const HERO_BG_SOURCES = [
  heroBgImage,
  '/img1.jpg',
  '/images/img1.jpg',
  './img1.jpg',
];

export const MovateHero: React.FC<MovateHeroProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const [bgIndex, setBgIndex] = useState(0);
  const currentImgSrc = HERO_BG_SOURCES[bgIndex] || heroBgImage;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between pt-28 pb-16 lg:pt-36 lg:pb-24 text-white overflow-hidden bg-[#070b14]">
      {/* 
        FULL-WIDTH CINEMATIC HERO BACKGROUND IMAGE
        High-definition technology / architecture background with subtle dark navy/black overlay
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={currentImgSrc}
          alt="Enterprise Technology and Innovation"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          loading="eager"
          onError={() => {
            setBgIndex(prev => (prev + 1 < HERO_BG_SOURCES.length ? prev + 1 : prev));
          }}
        />

        {/* Subtle Dark Navy / Black Overlay for High Readability */}
        <div className="absolute inset-0 bg-[#070b14]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/95 via-[#070b14]/80 to-[#070b14]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/80 via-transparent to-[#070b14]/95" />
      </div>

      {/* 
        MAIN HERO CONTENT CONTAINER
        - Left aligned
        - Max width ~1400-1600px
        - Clean, modern, confident, enterprise-grade
      */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col justify-between flex-1">
        
        {/* Subtle Category Marker */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase">
          <span className="w-2 h-2 rounded-full bg-[#3183FF] shadow-[0_0_8px_#3183FF]" />
          <span>Hscgolbalservices · Enterprise Engineering</span>
        </div>

        {/* 
          OVERSIZED EDITORIAL STATEMENT HEADLINE
          - Large display size: approximately 72–100px desktop, 42–56px mobile
          - Font weight: 300–400 (light)
          - White text, solid (NO gradient text effect)
          - Tight line-height: around 0.95–1.05
          - Slightly negative letter-spacing
          - Left aligned
          - Spans most of the viewport width, ~2 lines on desktop
          - NOT inside a card, NO excessive UI elements or decorative graphics
        */}
        <div className="w-full max-w-[1480px] text-left">
          <h1 className="text-left font-light text-white font-['Playfair_Display'] tracking-[-0.03em] leading-[0.96] sm:leading-[0.98] lg:leading-[1.02] text-[42px] sm:text-[58px] md:text-[76px] lg:text-[88px] xl:text-[98px]">
            Architecting resilient digital platforms
            <br className="hidden lg:inline" />
            {' '}for the world’s most ambitious enterprises.
          </h1>

          {/* Editorial Lead Sub-Statement (Geometric Sans, High Legibility) */}
          <p className="mt-8 sm:mt-10 text-lg sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed max-w-3xl font-['Plus_Jakarta_Sans']">
            We partner with forward-looking enterprises to engineer scalable cloud infrastructures, mission-critical software systems, and data-driven digital strategies that drive measurable, sustainable growth.
          </p>

          {/* Clean Action Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[30px] bg-white text-black font-semibold text-sm hover:bg-[#3183FF] hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>Explore Practice Areas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onGetInTouch}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[30px] border border-white/30 hover:border-white/60 text-white hover:bg-white/10 transition-all duration-300 text-sm font-normal backdrop-blur-sm cursor-pointer"
            >
              <span>Schedule Architecture Review</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Clean Enterprise Foundation Ribbon */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-slate-400">
          <div className="flex flex-wrap items-center gap-6 sm:gap-12">
            <div>
              <span className="text-white font-medium block">ESTABLISHED</span>
              <span className="text-slate-400">2017 · Hyderabad HQ</span>
            </div>
            <div>
              <span className="text-white font-medium block">SERVICE MATRIX</span>
              <span className="text-slate-400">Cloud · Web · Marketing · Staffing</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-medium block">DELIVERY GOVERNANCE</span>
              <span className="text-slate-400">Dedicated Pods &amp; Transparent SLAs</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00F39C] shadow-[0_0_8px_#00F39C]" />
            <span>Enterprise SLA &amp; IP Protection Transfer</span>
          </div>
        </div>

      </div>
    </section>
  );
};
