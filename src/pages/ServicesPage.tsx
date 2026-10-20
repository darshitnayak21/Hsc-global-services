
import React, { useState } from 'react';
import { PageId } from '../components/DarkHeader';
import { SubtleAmbientWaves } from '../components/SubtleAmbientWaves';
import { EditorialServiceModal } from '../components/EditorialServiceModal';
import {
  CST_SERVICES,
  SERVICE_CATEGORIES,
  ServiceCategoryId,
  CSTService,
} from '../data/servicesData';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  FloatingElement,
  motion,
  AnimatePresence,
} from '../components/MotionTransitions';

const getServiceMetric = (id: string): string => {
  switch (id) {
    case 'it-recruitment':
      return 'PRE-VETTED TALENT';
    case 'staffing':
      return 'FLEXIBLE CAPACITY';
    case 'training-placement':
      return 'CAREER READINESS';
    case 'cyber-security':
      return 'ZERO-TRUST SECURITY';
    case 'software-development':
      return 'HIGH-TEMPO SPRINTS';
    case 'mobile-development':
      return 'CROSS-PLATFORM';
    case 'cloud-services':
      return '99.99% UPTIME SLA';
    case 'sap-services':
      return 'ENTERPRISE ERP';
    default:
      return 'ENTERPRISE GRADE';
  }
};

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const [filterCategory, setFilterCategory] =
    useState<ServiceCategoryId>('all');
  const [selectedService, setSelectedService] =
    useState<CSTService | null>(null);

  const filteredServices = CST_SERVICES.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="relative z-10 py-16 sm:py-24 overflow-hidden">
      <SubtleAmbientWaves />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Services Hero */}
        <MotionReveal duration={0.7} distance={20} blur>
          <div className="text-center max-w-3xl mx-auto">
            <FloatingElement distance={4} duration={5} className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold mb-5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Enterprise Services · Global Delivery</span>
              </div>
            </FloatingElement>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              What We Offer
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Unlock your business potential with our comprehensive technology
              and enterprise services. HSC Global Services consultants are
              equipped with the experience and knowledge to guide you in the
              right direction.
            </p>

            {/* Category Filters with micro-interactions */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-6">
              {SERVICE_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] ${
                    filterCategory === cat.id
                      ? 'bg-white text-slate-950 font-bold shadow-lg shadow-white/10'
                      : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15 border border-white/15'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>
        </MotionReveal>

        {/* Service Cards with fluid layout transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isCenterFeatured = index === 1;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <InteractiveCard hoverY={-6} hoverScale={1.015} className="h-full">
                    <div
                      className="group relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between h-full min-h-[460px] bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

                      <div>
                        <div className="flex items-center justify-between gap-3 mb-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-mono font-bold tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {getServiceMetric(service.id)}
                          </span>

                          <span className="text-xs font-mono font-bold text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-2">
                          {service.categoryLabel}
                        </div>

                        <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug mb-3.5 group-hover:text-cyan-300 transition-colors">
                          {service.title}
                        </h3>

                        <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal mb-6">
                          {service.description}
                        </p>

                        <div className="space-y-2.5 mb-8">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            Core Capabilities
                          </div>

                          <div className="flex flex-col gap-2">
                            {service.capabilities.slice(0, 3).map(
                              (capability, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/25 group-hover:bg-cyan-950/10 transition-colors text-xs sm:text-[13px] text-slate-200"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                  <span className="leading-snug">
                                    {capability}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 mt-auto">
                        <button
                          onClick={() => setSelectedService(service)}
                          className={`w-full py-3.5 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                            isCenterFeatured
                              ? 'bg-white hover:bg-slate-100 text-slate-950 shadow-lg shadow-white/10'
                              : 'bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/15 hover:border-white shadow-md'
                          }`}
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </InteractiveCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Business Growth CTA */}
        <MotionReveal duration={0.8} distance={24}>
          <section
            aria-labelledby="services-cta-heading"
            className="glass-card relative isolate overflow-hidden rounded-[28px] border border-[#00D9F5]/40 bg-gradient-to-r from-[#071A2B] via-[#0B2235] to-[#071A2B] px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24 text-center shadow-[0_20px_60px_rgba(0,217,245,0.12)] text-white"
          >
            {/* Subtle cross-pattern background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,217,245,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,217,245,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '38px 38px',
              }}
            />

            {/* Soft ambient highlights */}
            <div
              aria-hidden="true"
              className="absolute -top-28 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#00D9F5]/15 blur-3xl animate-pulse-glow"
            />

            <div className="relative mx-auto max-w-4xl">
              <p className="mb-5 text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#35DDB5]">
                LET'S BUILD SOMETHING BETTER
              </p>

              <h2
                id="services-cta-heading"
                className="text-[clamp(2.7rem,7.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-white"
              >
                Ready to scale
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9F5] via-[#35DDB5] to-[#00D9F5]">
                  your business?
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
                From cloud and cybersecurity to software development, we help
                businesses turn complex challenges into scalable digital
                solutions.
              </p>

              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={onGetInTouch}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_10px_25px_rgba(0,217,245,0.25)] transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_16px_35px_rgba(0,217,245,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
                >
                  Contact Us
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              <p className="mt-5 text-xs sm:text-sm text-slate-400">
                Have a project in mind? Let's talk about what's possible.
              </p>
            </div>
          </section>
        </MotionReveal>
      </div>

      {/* Existing Service Detail Modal */}
      <EditorialServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={
          selectedService
            ? {
                category: selectedService.categoryLabel,
                title: selectedService.title,
                summary: selectedService.summary,
                description: selectedService.description,
                capabilities: selectedService.capabilities,
              }
            : null
        }
        onCtaClick={onGetInTouch}
        ctaText="Let's discuss your project"
      />
    </div>
  );
};
