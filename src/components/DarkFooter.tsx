import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './DarkHeader';
import { BrandLogo } from '../design-system/BrandLogo';
import { Play, X } from 'lucide-react';

interface DarkFooterProps {
  onNavigate: (page: PageId) => void;
  onContactClick?: () => void;
  onReplayIntro?: () => void;
}

export const DarkFooter: React.FC<DarkFooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    if (legalModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setLegalModal(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [legalModal]);

  const servicesList: { id: string; label: string }[] = [
    { id: 'cyber-security', label: 'Cyber Security' },
    { id: 'software-development', label: 'Software Development' },
    { id: 'mobile-development', label: 'Mobile development' },
    { id: 'cloud-services', label: 'Cloud Services' },
    { id: 'sap-services', label: 'SAP Services' },
  ];

  const pagesList: { id: PageId; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'careers', label: 'Careers', path: '/careers' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="relative isolate z-10 overflow-hidden bg-[#030712] text-slate-200 pt-16 sm:pt-20 pb-12 border-t border-slate-800 font-sans">
      {/* Animated HSC watermark: positioned across the main footer as requested */}
      <style>{`
        @keyframes hsc-watermark-drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hsc-watermark-letter { animation: none !important; }
        }
      `}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-4 bottom-16 z-0 select-none overflow-hidden text-white">
        <span className="hsc-watermark-letter absolute left-[10%] top-0 font-black leading-none text-[clamp(8rem,22vw,18rem)] tracking-normal" style={{ opacity: 0.028, animation: 'hsc-watermark-drift 9s ease-in-out infinite' }}>H</span>
        <span className="hsc-watermark-letter absolute left-[38%] top-0 font-black leading-none text-[clamp(8rem,22vw,18rem)] tracking-normal" style={{ opacity: 0.028, animation: 'hsc-watermark-drift 9s ease-in-out 1.2s infinite' }}>S</span>
        <span className="hsc-watermark-letter absolute left-[68%] top-0 font-black leading-none text-[clamp(8rem,22vw,18rem)] tracking-normal" style={{ opacity: 0.028, animation: 'hsc-watermark-drift 9s ease-in-out 2.4s infinite' }}>C</span>
      </div>
      <div className="relative z-10 w-full px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          {/* Column 1: Brand Info & Certifications (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brand Logo & Name - Positioned alongside company name matching reference */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="group text-left rounded-xl p-1 -m-1 cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
              aria-label="HSC GLOBAL SERVICES - Home"
            >
              <BrandLogo size="md" theme="dark" />
            </button>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-md font-normal">
              We have been efficiently collaborating with many international and domestic clients in
              various domains and verticals for automating their business process and IT services.
            </p>
          </div>

          {/* Column 2: Services List (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Services</h3>
            <ul className="space-y-3.5 text-lg text-slate-300">
              {servicesList.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="group inline-flex items-center gap-2 hover:text-rose-600 transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:text-rose-600"
                  >
                    <span className="text-blue-500 text-xs transition-transform group-hover:translate-x-0.5 select-none font-bold">
                      ▸
                    </span>
                    <span className="group-hover:underline underline-offset-4 font-normal">
                      {service.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pages List (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Pages</h3>
            <ul className="space-y-3.5 text-lg text-slate-300">
              {pagesList.map((page) => (
                <li key={page.id}>
                  <a
                    href={page.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(page.id);
                    }}
                    className="group inline-flex items-center gap-2 hover:text-rose-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-rose-600"
                  >
                    <span className="text-blue-500 text-xs transition-transform group-hover:translate-x-0.5 select-none font-bold">
                      ▸
                    </span>
                    <span className="group-hover:underline underline-offset-4 font-normal">
                      {page.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Get in Touch</h3>
            <div className="space-y-4 text-lg text-slate-300 leading-relaxed font-normal">
              {/* Email */}
              <div>
                <span className="text-blue-400 text-lg sm:text-xl font-semibold">Email: </span>
                <div className="space-y-1 mt-0.5">
                  <a
                    href="mailto:info@hscglobalserices.com"
                    className="hover:text-rose-600 hover:underline transition-colors block text-slate-300"
                  >
                    info@hscglobalserices.com
                  </a>
                  <a
                    href="mailto:hscglobalenterprises5@gmail.com"
                    className="hover:text-rose-600 hover:underline transition-colors block text-slate-300"
                  >
                    hscglobalenterprises5@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div>
                <span className="text-blue-400 text-lg sm:text-xl font-semibold">Phone: </span>
                <div className="space-y-1 mt-0.5 font-mono">
                  <a
                    href="tel:7799373334"
                    className="hover:text-rose-600 hover:underline transition-colors block text-slate-300"
                  >
                    +91 7799373334
                  </a>
                  <a
                    href="tel:+914031627399"
                    className="hover:text-rose-600 hover:underline transition-colors block text-slate-300"
                  >
                    +91- 40 31627399
                  </a>
                </div>
              </div>

              {/* Address */}
              <div>
                <span className="text-blue-400 text-lg sm:text-xl font-semibold">Address: </span>
                <p className="text-lg leading-relaxed mt-1 text-slate-300">
                  Plot No 10, Anasuya Nilayam, Flat No 301,<br />
                  Vivekananda Nagar colony, Kukatpally,<br />
                  Hyderabad - 500072
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer Sub-Bar */}
        <div className="pt-6 pb-2 border-t border-slate-700 text-center text-sm sm:text-base text-slate-400">
          © 2026 HSC Global Services. All rights reserved.
        </div>
      </div>

      {/* Legal Modal (Privacy & Terms) - Warm Porcelain Surface */}
      <AnimatePresence>
        {legalModal && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setLegalModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-[#00D9F5]/40 bg-[#071A2B] text-white shadow-2xl relative text-left space-y-5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono text-[#35DDB5] uppercase tracking-wider block font-semibold">
                  Legal &amp; Compliance
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
              </div>

              {legalModal === 'privacy' ? (
                <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed font-normal">
                  <p>
                    HSC Global Services respects your privacy. Any information submitted through our contact channels is used exclusively for evaluating technical requirements, scoping roadmaps, and client communication.
                  </p>
                  <p>
                    We do not sell, rent, or share confidential project briefs or contact information with third parties. Mutual Non-Disclosure Agreements (NDAs) are executed prior to reviewing sensitive source code or proprietary business architectures.
                  </p>
                  <p>
                    For privacy inquiries, contact us directly at <span className="text-[#00D9F5] font-mono font-medium">info@hscglobalserices.com</span>.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed font-normal">
                  <p>
                    All engineering engagements provided by HSC Global Services are governed by formal statements of work (SOW) or master services agreements.
                  </p>
                  <p>
                    All proprietary source code, software architectures, design assets, and intellectual property developed for client projects remain the full property of the client upon agreed completion and milestone settlement.
                  </p>
                  <p>
                    Direct terms inquiries can be addressed to our delivery center in Kukatpally, Hyderabad via <span className="text-[#00D9F5] font-mono font-medium">+91 7799373334</span>.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 text-sm font-bold text-[#030712] transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
