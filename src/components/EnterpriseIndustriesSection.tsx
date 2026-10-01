import React, { useState } from 'react';
import {
  Landmark,
  HeartPulse,
  ShoppingBag,
  Cpu,
  Truck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface IndustryItem {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  outcomes: string[];
  metrics: string;
  metricLabel: string;
  icon: React.ReactNode;
  accent: string;
}

interface EnterpriseIndustriesSectionProps {
  onNavigate?: (pageId: any) => void;
  onGetInTouch?: () => void;
}

export const EnterpriseIndustriesSection: React.FC<EnterpriseIndustriesSectionProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const [activeIndustryId, setActiveIndustryId] = useState<string>('bfsi');

  const industries: IndustryItem[] = [
    {
      id: 'bfsi',
      name: 'Banking & Financial Services',
      category: 'FinTech & Banking',
      headline: 'Secure, High-Throughput Financial Architectures',
      description:
        'Empowering financial institutions and fintech disruptors with resilient transaction processing, encrypted microservices, real-time fraud mitigation, and strict audit compliance.',
      outcomes: [
        'Multi-tiered transaction security with sub-second settlement',
        'Automated regulatory compliance and encrypted data vaults',
        'Resilient banking portal engineering with 99.99% uptime',
      ],
      metrics: '99.99%',
      metricLabel: 'Transaction Availability',
      icon: <Landmark className="w-5 h-5" />,
      accent: '#3183FF', // Cobalt Blue
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Life Sciences',
      category: 'HealthTech',
      headline: 'Compliant Health Systems & Patient Experience Portals',
      description:
        'Building HIPAA-aware patient portals, telemedicine integrations, and healthcare database interoperability designed for absolute data privacy and clinical reliability.',
      outcomes: [
        'End-to-end encrypted medical record exchange APIs',
        'Intuitive telemedicine and doctor appointment booking funnels',
        'Seamless integration with legacy Electronic Health Record (EHR) systems',
      ],
      metrics: '<2.1s',
      metricLabel: 'Patient Portal API Latency',
      icon: <HeartPulse className="w-5 h-5" />,
      accent: '#FF2E00', // Electric Scarlet
    },
    {
      id: 'retail',
      name: 'Retail, E-Commerce & D2C',
      category: 'Omnichannel Commerce',
      headline: 'High-Conversion Omnichannel Shopping Ecosystems',
      description:
        'Scaling modern headless e-commerce architectures, automated checkout optimization, real-time inventory synchronization, and performance SEO funnels.',
      outcomes: [
        'Headless Next.js / Shopify Plus enterprise integrations',
        'Automated inventory syncing across multi-channel marketplaces',
        'High-converting checkout funnels with cart abandonment automation',
      ],
      metrics: '3.4x',
      metricLabel: 'Average Mobile Conversion Uplift',
      icon: <ShoppingBag className="w-5 h-5" />,
      accent: '#00F39C', // Neon Mint
    },
    {
      id: 'tech-hardware',
      name: 'Technology & Automated Hardware',
      category: 'Enterprise Hardware IT',
      headline: 'Mission-Critical Database Systems for ATM & Automated Tech',
      description:
        'Providing verified database administration, automated failover clustering, and mission-critical 24/7 technical staffing for retail hardware giants.',
      outcomes: [
        'High-availability database administration for financial hardware',
        'Proactive database performance tuning and zero data-loss replication',
        'Vetted senior database engineers deployed on SLA commitments',
      ],
      metrics: '100%',
      metricLabel: 'Data Integrity Audit Score',
      icon: <Cpu className="w-5 h-5" />,
      accent: '#F5D00B', // Solar Canary Gold
    },
    {
      id: 'logistics',
      name: 'Logistics, Supply Chain & Fleet',
      category: 'Supply Chain IT',
      headline: 'Real-Time Telemetry & Warehouse Management Platforms',
      description:
        'Designing dynamic dispatch engines, GPS tracking integrations, freight management portals, and automated logistics communication workflows.',
      outcomes: [
        'Real-time IoT fleet telemetry tracking & routing dashboards',
        'Automated bill-of-lading and shipment invoice generators',
        'Multi-carrier API routing and dispatch optimization',
      ],
      metrics: '-38%',
      metricLabel: 'Dispatch Efficiency Gain',
      icon: <Truck className="w-5 h-5" />,
      accent: '#FF8562', // Peach Coral
    },
  ];

  const currentIndustry =
    industries.find((ind) => ind.id === activeIndustryId) || industries[0];

  return (
    <section className="relative py-24 lg:py-32 bg-[#f8fafc] text-slate-900 overflow-hidden border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium tracking-widest uppercase shadow-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: currentIndustry.accent,
              }}
            />
            <span>Cross-Industry Domain Expertise</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-['Playfair_Display'] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Engineering Enterprise Solutions Across{' '}
            <span className="italic font-normal text-slate-800">
              Key Global Sectors
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light">
            Every industry faces unique regulatory demands and competitive pressures. Our practice
            leads architect customized digital solutions tailored to specific vertical requirements.
          </p>
        </div>

        {/* Industry Interactive Switcher Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {industries.map((ind) => {
              const isActive = ind.id === activeIndustryId;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-[30px] transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white border-slate-200/90 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-[16px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ind.icon}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium tracking-wide transition-colors ${
                          isActive ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {ind.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{ind.category}</p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'translate-x-1 text-white' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detail Showcase Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[30px] bg-white border border-slate-200/90 shadow-lg flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-xs font-mono font-medium tracking-wider uppercase px-3 py-1 rounded-[30px] bg-slate-100 text-slate-700">
                    {currentIndustry.category}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display']">
                      {currentIndustry.metrics}
                    </span>
                    <span className="block text-[11px] font-mono text-slate-500 uppercase">
                      {currentIndustry.metricLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display'] mb-4">
                  {currentIndustry.headline}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8">
                  {currentIndustry.description}
                </p>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-mono font-medium uppercase tracking-wider text-slate-700">
                    Key Architectural Outcomes:
                  </p>
                  {currentIndustry.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#3183FF] mt-0.5 shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-mono">
                  Custom vertical architectures deployed in compliance
                </span>

                <button
                  type="button"
                  onClick={onGetInTouch}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] bg-slate-900 hover:bg-[#3183FF] text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Request Sector Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
