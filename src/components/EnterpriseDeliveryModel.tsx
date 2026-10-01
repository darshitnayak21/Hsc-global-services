import React from 'react';
import {
  Compass,
  GitBranch,
  ShieldCheck,
  Server,
  ArrowRight,
  CheckCircle2,
  Award,
} from 'lucide-react';

interface EnterpriseDeliveryModelProps {
  onNavigate?: (pageId: any) => void;
  onGetInTouch?: () => void;
}

export const EnterpriseDeliveryModel: React.FC<EnterpriseDeliveryModelProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Architecture',
      subtitle: 'Phase 1 · Foundation',
      accent: '#3183FF', // Cobalt Blue
      description:
        'Thorough technical audit of legacy systems, API dependencies, risk assessment, and creation of an enterprise-grade cloud architecture roadmap.',
      deliverables: [
        'Architecture specification doc',
        'Security & compliance checklist',
        'Milestone-driven sprint plan',
      ],
      icon: <Compass className="w-5 h-5 text-[#3183FF]" />,
    },
    {
      num: '02',
      title: 'Agile Engineering Pods',
      subtitle: 'Phase 2 · Build Velocity',
      accent: '#FF2E00', // Electric Scarlet
      description:
        'Dedicated senior engineering squads executing synchronized two-week sprints with continuous integration, automated tests, and client demo gates.',
      deliverables: [
        'Modern React & Cloud microservices',
        'CI/CD automated deployment pipelines',
        'Transparent weekly sprint demos',
      ],
      icon: <GitBranch className="w-5 h-5 text-[#FF2E00]" />,
    },
    {
      num: '03',
      title: 'Security Governance',
      subtitle: 'Phase 3 · Assurance',
      accent: '#00F39C', // Neon Mint
      description:
        'Automated regression suites, vulnerability scanning, penetration audits, and strict code review gates ensuring zero production regressions.',
      deliverables: [
        'Automated test coverage >85%',
        'Vulnerability & penetration report',
        'Cross-browser / cross-device validation',
      ],
      icon: <ShieldCheck className="w-5 h-5 text-[#007bff]" />,
    },
    {
      num: '04',
      title: 'SLA Managed Operations',
      subtitle: 'Phase 4 · Longevity',
      accent: '#F5D00B', // Solar Canary Gold
      description:
        'Continuous 24/7 telemetry monitoring, proactive patch management, automated failover routines, and guaranteed incident resolution SLAs.',
      deliverables: [
        '99.9% uptime availability commitment',
        '<15 minute critical incident response',
        'Quarterly architecture reviews',
      ],
      icon: <Server className="w-5 h-5 text-slate-800" />,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-white border-b border-slate-200/80 overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
            <span>Enterprise Operating Framework</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-['Playfair_Display'] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            How We Deliver Predictable{' '}
            <span className="italic font-normal text-slate-800">
              Enterprise Outcomes
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light">
            Moving beyond unpredictable freelance projects, our structured corporate delivery methodology
            guarantees enterprise security, predictable timelines, and transparent SLA compliance.
          </p>
        </div>

        {/* 4-Step Methodology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-7 sm:p-8 rounded-[30px] bg-[#f8fafc] border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs font-mono font-medium px-3 py-1 rounded-[30px] border border-slate-200 bg-white text-slate-700"
                  >
                    {step.num}
                  </span>
                  <div className="w-11 h-11 rounded-[16px] bg-white border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-xs">
                    {step.icon}
                  </div>
                </div>

                <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-500">
                  {step.subtitle}
                </p>

                <h3 className="text-xl font-normal text-slate-900 font-['Playfair_Display'] mt-1 mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light mb-6">
                  {step.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-slate-200/80 space-y-2">
                <p className="text-[11px] font-mono font-medium text-slate-700 uppercase tracking-wider">
                  Deliverables:
                </p>
                {step.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2
                      className="w-3.5 h-3.5 shrink-0 text-[#3183FF]"
                    />
                    <span className="font-light">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Governance Guarantee Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-[30px] bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-white/10 flex items-center justify-center text-[#3183FF] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-light text-white font-['Playfair_Display']">
                Enterprise Service Level Agreements &amp; Governance
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-['Plus_Jakarta_Sans'] font-light mt-1">
                All engagements operate under contractual milestones, strict non-disclosure terms, and clear IP ownership transfer.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onGetInTouch}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[30px] bg-white hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-md"
          >
            <span>Request Delivery Framework Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
