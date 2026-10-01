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
import {
  Globe,
  TrendingUp,
  Users,
  Cpu,
  Search,
  Server,
  Code2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Calculator,
  X,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onGetInTouch }) => {
  const [filterCategory, setFilterCategory] = useState<ServiceCategoryId>('all');
  const [selectedService, setSelectedService] = useState<CSTService | null>(null);
  
  // Interactive Project Estimator state
  const [estimatorScope, setEstimatorScope] = useState<'mvp' | 'enterprise' | 'staffing'>('enterprise');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'cloud']);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredServices = CST_SERVICES.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="relative z-10 py-16 sm:py-24 overflow-hidden">
      {/* Subtle blue/cyan ambient light waves and floating micro-particles behind cards */}
      <SubtleAmbientWaves />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
            Enterprise Services
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Providing the best{' '}
            <span className="text-cyan-400">
              IT solutions &amp; Services
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            From modern web engineering and dedicated staffing to data-driven marketing, we build and manage technical solutions that deliver measurable enterprise outcomes.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-4">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  filterCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Technology Service Cards Grid (Desktop: 3 per row, Tablet: 2 per row, Mobile: 1 per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-[26px] border border-slate-900/85 p-[3px] bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-950 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.14)] flex flex-col"
            >
              {/* Concentric Inner Border creating the refined double-line border */}
              <div className="rounded-[22px] border border-slate-900/75 bg-white p-8 sm:p-10 lg:p-11 flex flex-col justify-between h-full min-h-[400px] sm:min-h-[440px] transition-colors duration-300 group-hover:border-slate-950">
                {/* Service Heading & Concise Description with generous whitespace */}
                <div className="pt-4 sm:pt-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-cyan-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* One "Learn More →" Pill Action Button */}
                <div className="pt-8 sm:pt-10 mt-auto">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center justify-between rounded-full border border-slate-900 bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 transition-colors duration-300 hover:bg-slate-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <span>Learn More</span>
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FF4500] text-white flex items-center justify-center ml-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Scope & Engagement Estimator */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <Calculator className="w-4 h-4" />
              <span>Project Scoping Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Plan Your Engagement Model
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Select your requirements to discuss estimated timelines and team composition with our Hyderabad delivery center.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Scope Selector */}
            <div className="space-y-4 lg:col-span-2">
              <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                1. Select Engagement Objective
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'mvp',
                    title: 'Rapid MVP Build',
                    subtitle: 'Sprint delivery with modern React and cloud infrastructure.',
                  },
                  {
                    id: 'enterprise',
                    title: 'Enterprise Solution',
                    subtitle: 'Custom architecture with automated testing and structured governance.',
                  },
                  {
                    id: 'staffing',
                    title: 'Dedicated Talent Pod',
                    subtitle: 'Augment team with senior software engineers from Hyderabad.',
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setEstimatorScope(s.id as any)}
                    className={`p-5 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      estimatorScope === s.id
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-base text-white mb-1.5">{s.title}</div>
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">{s.subtitle}</div>
                  </button>
                ))}
              </div>

              {/* Addons */}
              <div className="pt-4 space-y-3">
                <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                  2. Select Accelerators &amp; Add-ons
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'seo', label: 'Technical SEO & Launch Growth' },
                    { id: 'cloud', label: 'Multi-Cloud DevOps Setup' },
                    { id: 'qa', label: 'Automated E2E Test Suite' },
                  ].map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-lg border text-sm font-medium flex items-center justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{addon.label}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Estimated Summary */}
            <div className="p-6 sm:p-7 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Recommended Deployment
                </span>
                <div className="space-y-1.5">
                  <div className="text-2xl font-bold text-white">
                    {estimatorScope === 'mvp'
                      ? 'Sprint Delivery'
                      : estimatorScope === 'staffing'
                      ? 'Dedicated Pod'
                      : 'Full Architecture Build'}
                  </div>
                  <div className="text-sm text-slate-300 font-mono">
                    Hyderabad Core Pod: Tech Lead, Fullstack Devs, QA
                  </div>
                </div>

                <div className="space-y-2.5 text-sm text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Quality Governance:</span>
                    <span className="font-mono text-slate-200">Strict Code Review</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Code Ownership:</span>
                    <span className="font-mono text-slate-200">Full Client IP Ownership</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NDA Coverage:</span>
                    <span className="font-mono text-slate-200">Mutual Signed</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onGetInTouch}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Discuss This Scope With Our Engineers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Service Detail Modal (Minimal Editorial Design) */}
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
