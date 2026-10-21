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
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  FloatingElement,
  motion,
  AnimatePresence,
} from '../components/MotionTransitions';

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

  // Verified client partnerships
  const actualClients: ClientItem[] = [
    {
      id: 'creative-solution-tech',
      name: 'Creative Solution Tech',
      sector: 'Enterprise IT & Cloud Engineering',
      overview:
        'End-to-end cloud infrastructure modernization, API integration, and enterprise software architecture driving operational efficiency.',
      focusAreas: [
        'Cloud infrastructure setup',
        'Enterprise architecture',
        'Continuous deployment & DevOps',
      ],
    },
    {
      id: 'lt',
      name: 'L&T',
      sector: 'Engineering & Global Infrastructure',
      overview:
        'Strategic IT consulting, enterprise systems integration, and engineering technology support for mission-critical operations.',
      focusAreas: [
        'Enterprise technology integration',
        'Systems reliability engineering',
        'High-scale process automation',
      ],
    },
    {
      id: 'appzon',
      name: 'Appzon Technologies Pvt. Ltd.',
      sector: 'Software Development & Apps',
      overview:
        'Full-stack application development, mobile engineering collaboration, and performance optimization for multi-platform products.',
      focusAreas: [
        'Mobile & web engineering',
        'Microservices architecture',
        'Quality engineering & QA',
      ],
    },
    {
      id: 'servicenow',
      name: 'ServiceNow',
      sector: 'Cloud Computing & Digital Workflows',
      overview:
        'Implementation consulting, workflow orchestration, and enterprise integration enhancing IT service management and operations.',
      focusAreas: [
        'Workflow optimization',
        'Enterprise ITSM consulting',
        'Platform customization',
      ],
    },
    {
      id: 'anudys',
      name: 'Anudys Technologies Pvt. Ltd.',
      sector: 'IT Consulting & Services',
      overview:
        'Digital transformation solutions, technology consulting, and agile talent deployment supporting enterprise modernization.',
      focusAreas: [
        'Digital transformation strategy',
        'Enterprise web platforms',
        'Specialized talent augmentation',
      ],
    },
    {
      id: 'triochi',
      name: 'Triochi Concepts',
      sector: 'Creative & Digital Solutions',
      overview:
        'Interactive web development, user experience design, and digital solutions supporting commercial design initiatives.',
      focusAreas: [
        'Web interface development',
        'Digital presentation platforms',
        'Technical UX consulting',
      ],
    },
    {
      id: 'vanmayi',
      name: 'Vanmayi Technologies',
      sector: 'Software & Technology Systems',
      overview:
        'Software engineering collaboration, web portal development, and technical staffing support for digital products.',
      focusAreas: [
        'Software engineering support',
        'Web application development',
        'Technical staffing solutions',
      ],
    },
    {
      id: 'creative-conferences',
      name: 'Creative Conferences',
      sector: 'Conferences & Exhibitions',
      overview:
        'Event technology platforms, registration portals, and digital media platforms supporting international symposiums.',
      focusAreas: [
        'Event registration platforms',
        'Digital attendee portals',
        'Media systems integration',
      ],
    },
    {
      id: 'stage-innovations',
      name: 'Stage Innovations',
      sector: 'Innovation & Digital Media',
      overview:
        'Next-generation digital experience platforms, interactive presentation tech, and software media solutions.',
      focusAreas: [
        'Interactive presentation tech',
        'Media streaming solutions',
        'Digital platform engineering',
      ],
    },
  ];

  return (
    <div className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
              Verified Client Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Client Partnerships &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9F5] via-[#35DDB5] to-[#00D9F5]">
                Enterprise Solutions
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
              Organizations that have partnered with Hscgolbalservices for web engineering, IT consulting, and digital solutions.
            </p>
          </div>
        </MotionReveal>

        {/* Client Cards Grid */}
        <div className="space-y-8">
          <MotionReveal>
            <div className="flex items-center justify-between border-b border-[#00D9F5]/20 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Hscgolbalservices Clients</h2>
                <p className="text-sm sm:text-base text-slate-400 mt-1">Authentic client partnerships established across diverse industries.</p>
              </div>
            </div>
          </MotionReveal>

          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {actualClients.map((client) => (
              <StaggerItem key={client.id} className="h-full">
                <InteractiveCard hoverY={-6} className="h-full">
                  <div
                    className="glass-card rounded-2xl p-7 sm:p-8 border border-[#00D9F5]/30 hover:border-[#00D9F5] bg-[#071A2B]/90 hover:bg-[#0B2235] text-white flex flex-col justify-between space-y-6 shadow-sm hover:shadow-[0_15px_35px_rgba(0,217,245,0.12)] transition-all duration-300 group h-full"
                  >
                    <div className="space-y-4">
                      {/* Horizontal landscape client logo banner */}
                      <div className="w-full aspect-[2.1/1] sm:aspect-[2.2/1] min-h-[120px] sm:min-h-[135px] rounded-xl overflow-hidden bg-white p-4 sm:p-4.5 flex items-center justify-center border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                        <img
                          src={
                            client.id === 'creative-solution-tech'
                              ? '/images/clients/creative-solution-tech-bg.webp.png'
                              : client.id === 'lt'
                              ? '/images/clients/lt-bg.webp.png'
                              : client.id === 'appzon'
                              ? '/images/clients/appzon-bg.webp.png'
                              : client.id === 'servicenow'
                              ? '/images/clients/servicenow-bg.webp.png'
                              : client.id === 'anudys'
                              ? '/images/clients/anudys-bg.webp.png'
                              : client.id === 'triochi'
                              ? '/images/clients/triochi-bg.webp.png'
                              : client.id === 'vanmayi'
                              ? '/images/clients/vanmayi-bg.webp.png'
                              : client.id === 'creative-conferences'
                              ? '/images/clients/creative-conferences-bg.webp.png'
                              : '/images/clients/stage-innovations-bg.webp.png'
                          }
                          alt={`${client.name} logo`}
                          className="h-full w-full object-contain object-center"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] font-semibold">
                          {client.sector}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#00D9F5] transition-colors">{client.name}</h3>
                        <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                          {client.overview}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#00D9F5]/15">
                        <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                          Key Deliverables:
                        </span>
                        {client.focusAreas.map((focus, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-[#35DDB5] shrink-0 mt-0.5" />
                            <span>{focus}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#00D9F5]/15">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="inline-flex items-center text-sm sm:text-base font-bold text-[#00D9F5] hover:text-[#35DDB5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] rounded px-1"
                      >
                        <span>Request Collaboration Overview</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </button>
                    </div>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Bottom CTA */}
        <MotionReveal duration={0.8} distance={20}>
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-[#00D9F5]/40 bg-gradient-to-r from-[#071A2B] via-[#0B2235] to-[#071A2B] shadow-xl space-y-6 text-white">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Have an Enterprise Project in Mind?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discuss your technical goals, platform requirements, and staffing needs with our software architects in Hyderabad.
          </p>
          <div>
            <button
              onClick={onGetInTouch}
              className="btn-glow-pill inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold text-[#030712] bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 shadow-xl shadow-cyan-500/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A2B]"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        </MotionReveal>

        {/* Client Collaboration Overview Modal */}
        <AnimatePresence>
          {selectedClient && (
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedClient(null)}
            >
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-[#00D9F5]/40 bg-[#071A2B] text-white shadow-2xl relative text-left space-y-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeBtnRef}
                  onClick={() => setSelectedClient(null)}
                  aria-label="Close overview"
                  className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="text-xs sm:text-sm font-mono text-[#35DDB5] uppercase tracking-wider block font-semibold">
                    Collaboration Overview · {selectedClient.sector}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedClient.name}</h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedClient.overview}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#00D9F5]/20">
                  <h4 className="text-xs sm:text-sm font-mono font-bold text-[#00D9F5] uppercase tracking-wider">
                    Delivered Engagement Areas
                  </h4>
                  <div className="space-y-2">
                    {selectedClient.focusAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#35DDB5] shrink-0" />
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
                    className="btn-glow-pill flex-1 py-3 rounded-full bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 text-[#030712] font-bold text-sm shadow-md transition-all cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
                  >
                    Discuss a Similar Project
                  </button>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 border border-white/20 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
