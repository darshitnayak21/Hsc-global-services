import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../components/DarkHeader';
import {
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Layers,
  ShieldCheck,
  X,
} from 'lucide-react';

interface ClientsPageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

interface ClientItem {
  id: string;
  name: string;
  sector: string;
  overview: string;
  focusAreas: string[];
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate, onGetInTouch }) => {
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selectedClient) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setSelectedClient(null);
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);

        if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [selectedClient]);

  // Verified actual CST clients from original website
  const actualClients: ClientItem[] = [
    {
      id: 'bathala',
      name: 'Bathala Group',
      sector: 'Real Estate & Infrastructure',
      overview:
        'Web development, digital presence, and digital marketing services supporting client property projects and customer outreach.',
      focusAreas: [
        'Web platform development',
        'Digital marketing services',
        'Search engine visibility',
      ],
    },
    {
      id: 'hitek',
      name: 'Hitek Park',
      sector: 'Technology & Business Park',
      overview:
        'Web solutions, digital presentation, and technology consulting supporting business park communications and facility information.',
      focusAreas: [
        'Web portal development',
        'Digital presentation',
        'Web hosting support',
      ],
    },
    {
      id: 'triochi',
      name: 'Triochi Concepts',
      sector: 'Design & Engineering',
      overview:
        'Web development and digital solutions supporting commercial design and engineering initiatives.',
      focusAreas: [
        'Web interface development',
        'Digital presentation',
        'Technical consulting',
      ],
    },
    {
      id: 'vanmayi',
      name: 'Vanmayi Technologies',
      sector: 'Digital Solutions',
      overview:
        'Software engineering collaboration, web development, and technical staffing support for digital initiatives.',
      focusAreas: [
        'Software engineering support',
        'Web application development',
        'Technical staffing',
      ],
    },
    {
      id: 'wincor',
      name: 'Wincor Nixdorf',
      sector: 'Banking & Retail Technology',
      overview:
        'Enterprise IT consulting and technical services supporting enterprise technology systems and software environments.',
      focusAreas: [
        'Enterprise IT consulting',
        'Software development support',
        'Technical collaboration',
      ],
    },
    {
      id: 'elite',
      name: 'Elite International Confex',
      sector: 'Conferences & Exhibitions',
      overview:
        'Web portal development and digital marketing services supporting conference registrations and event information.',
      focusAreas: [
        'Event web portal development',
        'Digital marketing services',
        'User experience support',
      ],
    },
  ];

  return (
    <div className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
            Verified Client Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Client Partnerships &amp;{' '}
            <span className="text-cyan-400">
              Enterprise Solutions
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            Organizations that have partnered with Hscgolbalservices for web engineering, IT consulting, and digital solutions.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Hscgolbalservices Clients</h2>
              <p className="text-sm sm:text-base text-slate-300 mt-1">Authentic client partnerships established across diverse industries.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {actualClients.map((client) => (
              <div
                key={client.id}
                className="glass-card rounded-2xl p-7 sm:p-8 border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between space-y-6 shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      {client.sector}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">{client.name}</h3>
                    <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                      {client.overview}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Key Deliverables:
                    </span>
                    {client.focusAreas.map((focus, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="inline-flex items-center text-sm sm:text-base font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1"
                  >
                    <span>Request Collaboration Overview</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-slate-800 bg-[#090d1a] shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Have an Enterprise Project in Mind?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discuss your technical goals, platform requirements, and staffing needs with our software architects in Hyderabad.
          </p>
          <div>
            <button
              onClick={onGetInTouch}
              className="btn-glow-pill inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-xl shadow-cyan-500/25 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Client Collaboration Overview Modal */}
        {selectedClient && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedClient(null)}
          >
            <div
              ref={modalRef}
              className="w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-slate-800 bg-[#090d1a] shadow-2xl relative text-left space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                onClick={() => setSelectedClient(null)}
                aria-label="Close overview"
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Collaboration Overview · {selectedClient.sector}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedClient.name}</h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedClient.overview}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <h4 className="text-xs sm:text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                  Delivered Engagement Areas
                </h4>
                <div className="space-y-2">
                  {selectedClient.focusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedClient(null);
                    onGetInTouch();
                  }}
                  className="btn-glow-pill flex-1 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Discuss a Similar Project
                </button>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
