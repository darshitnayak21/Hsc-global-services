import React, { useState, useEffect } from 'react';
import { PageId } from './DarkHeader';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, X } from 'lucide-react';

interface DarkFooterProps {
  onNavigate: (page: PageId) => void;
  onContactClick: () => void;
}

export const DarkFooter: React.FC<DarkFooterProps> = ({ onNavigate, onContactClick }) => {
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

  const footerNavLinks: { id: PageId; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Services & Solutions', path: '/services' },
    { id: 'careers', label: 'Careers & IT Staffing', path: '/careers' },
    { id: 'clients', label: 'Clients & Case Studies', path: '/clients' },
    { id: 'contact', label: 'Contact & Inquiries', path: '/contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#02050e] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-black text-white text-xl sm:text-2xl tracking-tight">Hscgolbalservices</span>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Enterprise web development, digital growth marketing, and specialized technology staffing solutions delivered from Madhapur, Hyderabad.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
              <span>Madhapur Core Delivery Center Active</span>
            </div>
          </div>

          {/* Col 2: Navigation & Multi-Page Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-300">
              {footerNavLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hyderabad Office Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
              Hyderabad Headquarters
            </h4>
            <address className="not-italic text-sm sm:text-base text-slate-300 space-y-3 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span>
                  Plot No. 3-332, 333, G2, Road No. 17, Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+914035032090" className="hover:text-cyan-400 transition-colors font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-0.5">
                  +91 40 3503 2090
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:info@creativesolutiontech.in" className="hover:text-cyan-400 transition-colors font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-0.5">
                  info@creativesolutiontech.in
                </a>
              </div>
            </address>
          </div>

          {/* Col 4: Follow & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
              Connect With Us
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect with our technology consulting and enterprise development teams across professional channels.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-sm transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-sm transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-sm transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Twitter / X</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-slate-400">
          <div>© {new Date().getFullYear()} Hscgolbalservices. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">Hyderabad Delivery Hub</span>
            <span>·</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-200 cursor-pointer focus-visible:outline-none focus-visible:text-cyan-400 focus-visible:underline"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-200 cursor-pointer focus-visible:outline-none focus-visible:text-cyan-400 focus-visible:underline"
            >
              Terms of Service
            </button>
            <span>·</span>
            <span>Enterprise Code Quality</span>
          </div>
        </div>

        {/* Legal Policy Modal */}
        {legalModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setLegalModal(null)}
          >
            <div
              className="w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-slate-800 bg-[#090d1a] shadow-2xl relative text-left space-y-5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLegalModal(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Legal &amp; Governance
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
              </div>

              {legalModal === 'privacy' ? (
                <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed">
                  <p>
                    Hscgolbalservices respects client privacy. Any information submitted through our contact channels or project scoping forms is used exclusively for evaluating technical requirements, preparing estimates, and direct communication.
                  </p>
                  <p>
                    We do not sell, rent, or share confidential project briefs or contact information with third parties. Mutual Non-Disclosure Agreements (NDAs) are routinely executed prior to reviewing proprietary codebases or sensitive business architecture.
                  </p>
                  <p>
                    For inquiries regarding data privacy or NDAs, contact us directly at <span className="text-cyan-400 font-mono">info@creativesolutiontech.in</span>.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed">
                  <p>
                    Services provided by Hscgolbalservices are executed under formal statement-of-work agreements, master services agreements, or milestone contracts.
                  </p>
                  <p>
                    All proprietary source code, software architectures, design assets, and intellectual property developed for client projects remain the full property of the client upon agreed completion and milestone settlement.
                  </p>
                  <p>
                    Direct terms inquiries can be addressed to our delivery center in Madhapur, Hyderabad via <span className="text-cyan-400 font-mono">+91 40 3503 2090</span>.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setLegalModal(null)}
                  className="w-full py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
