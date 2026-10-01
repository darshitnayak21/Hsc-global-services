import React, { useState } from 'react';
import {
  Cpu,
  Code2,
  TrendingUp,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Server,
  Zap,
} from 'lucide-react';

interface MovateCapabilityMatrixProps {
  onNavigate: (pageId: any) => void;
  onGetInTouch: () => void;
}

interface CapabilityPillar {
  id: string;
  pillLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  metrics: { value: string; label: string }[];
  deliverables: string[];
  techStack: string[];
  architecturePreview: {
    title: string;
    status: string;
    node1: string;
    node2: string;
    node3: string;
    throughput: string;
  };
}

export const MovateCapabilityMatrix: React.FC<MovateCapabilityMatrixProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const [activeTab, setActiveTab] = useState<string>('cloud-web');

  const pillars: CapabilityPillar[] = [
    {
      id: 'cloud-web',
      pillLabel: '01. Digital Engineering',
      title: 'Full-Stack Web & Cloud Systems',
      tagline: 'Modern Responsive Architectures Built for Enterprise Scale',
      description:
        'We engineer resilient web platforms using React, Node.js, and modern cloud infrastructures. From single-page client dashboards to multi-tenant microservices, our architectures balance speed, security, and scalability.',
      icon: <Code2 className="w-5 h-5" />,
      accentColor: '#3183FF', // Cobalt Blue
      metrics: [
        { value: '99.9%', label: 'Production Uptime' },
        { value: '<180ms', label: 'API Response Time' },
        { value: '100%', label: 'Mobile Responsive' },
      ],
      deliverables: [
        'Custom Frontend React & Web Applications',
        'RESTful & GraphQL Backend Microservice APIs',
        'Database Optimization & Cloud Schema Design',
        'Continuous Integration & Deployment (CI/CD)',
      ],
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      architecturePreview: {
        title: 'Microservices & API Gateway Pipeline',
        status: 'OPERATIONAL · ZERO ANOMALIES',
        node1: 'Edge CDN & SSL Layer',
        node2: 'Containerized Express/Node Services',
        node3: 'Clustered Relational Database Storage',
        throughput: '12,400 req/min peak',
      },
    },
    {
      id: 'digital-marketing',
      pillLabel: '02. Growth Acceleration',
      title: 'Performance Digital Marketing & SEO',
      tagline: 'Data-Driven Multi-Channel Acquisition & Inbound Authority',
      description:
        'We design and execute integrated digital campaigns across search engines, social platforms, and targeted advertising funnels to connect your brand with qualified enterprise buyers.',
      icon: <TrendingUp className="w-5 h-5" />,
      accentColor: '#FF2E00', // Electric Scarlet
      metrics: [
        { value: '4.2x', label: 'Average Inbound Inquiries' },
        { value: '-45%', label: 'Customer Acquisition Cost' },
        { value: '+180%', label: 'Organic Search Authority' },
      ],
      deliverables: [
        'Deep Technical On-Page & Off-Page SEO',
        'High-Intent Google Ads & Social PPC Funnels',
        'Conversion Rate Optimization (CRO) Audits',
        'Transparent ROI & Conversion Dashboards',
      ],
      techStack: ['Google Ads', 'Meta Business', 'Analytics', 'Tag Manager'],
      architecturePreview: {
        title: 'Omnichannel Conversion Funnel',
        status: 'ACTIVE · CONVERTING LEADS',
        node1: 'High-Intent Inbound Search & PPC',
        node2: 'High-Fidelity Landing Pages',
        node3: 'Automated CRM Lead Routing',
        throughput: '3.8x ROI aggregate',
      },
    },
    {
      id: 'tech-consulting',
      pillLabel: '03. Strategic Advisory',
      title: 'Technology Consulting & Risk Audits',
      tagline: 'Future-Proof IT Roadmaps Guided by Proven Enterprise Veterans',
      description:
        'Our technology consultants assess legacy IT environments, plan modern cloud transitions, and eliminate operational bottlenecks to keep your technology infrastructure aligned with business goals.',
      icon: <Cpu className="w-5 h-5" />,
      accentColor: '#F5D00B', // Solar Canary Gold
      metrics: [
        { value: '100%', label: 'Regulatory Compliance' },
        { value: '0', label: 'Critical Security Gaps' },
        { value: '3-Year', label: 'Strategic Roadmap Horizon' },
      ],
      deliverables: [
        'Comprehensive IT Infrastructure Audits',
        'Cloud Migration & Architecture Roadmaps',
        'Cybersecurity & Disaster Recovery Plans',
        'Vendor Evaluation & Cost Optimization',
      ],
      techStack: ['Cloud Native', 'Cybersecurity', 'Disaster Recovery', 'Governance'],
      architecturePreview: {
        title: 'Enterprise Architecture Framework',
        status: 'GOVERNED · COMPLIANT',
        node1: 'Audit & Gap Identification',
        node2: 'Target State Architecture Blueprint',
        node3: 'Phased Migration Execution',
        throughput: 'Zero downtime cutover',
      },
    },
    {
      id: 'staffing',
      pillLabel: '04. Workforce Velocity',
      title: 'Specialized Tech Staffing & Training',
      tagline: 'Vetted Developer Pods & Structured Corporate Skills Placement',
      description:
        'We assemble dedicated developer squads and provide hands-on technical training to bridge critical engineering talent gaps with rapid onboarding.',
      icon: <Layers className="w-5 h-5" />,
      accentColor: '#00F39C', // Neon Mint
      metrics: [
        { value: '<72hr', label: 'Candidate Shortlisting' },
        { value: '94%', label: 'First-Round Selection Rate' },
        { value: '6-Month', label: 'Retention Commitment' },
      ],
      deliverables: [
        'Dedicated Full-Stack & Backend Developers',
        'Quality Assurance & Automated Testing Engineers',
        'UI/UX Designers & Product Managers',
        'Corporate Project Certification & Training',
      ],
      techStack: ['Java', '.NET Core', 'PHP / Laravel', 'SQL', 'QA Automation'],
      architecturePreview: {
        title: 'Talent Delivery & Onboarding Matrix',
        status: 'ACTIVE · 100% RETENTION SLA',
        node1: 'Rigorous Technical Screening',
        node2: 'Domain & Cultural Alignment',
        node3: 'Sprint-Ready Agile Deployment',
        throughput: '48-hr deployment window',
      },
    },
  ];

  const currentPillar =
    pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
            <span>Interactive Capability Matrix</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-['Playfair_Display'] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Engineering Outcomes Across{' '}
            <span className="italic font-normal text-slate-800">
              Four Core Pillars
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light">
            Explore how our cross-functional capabilities deliver predictable, enterprise-grade results
            from initial architectural planning to continuous operations.
          </p>
        </div>

        {/* 4-Tab Navigation Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {pillars.map((pillar) => {
            const isActive = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveTab(pillar.id)}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-[30px] text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80'
                }`}
              >
                {pillar.icon}
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Capability Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Solution Detail & Deliverables */}
          <div
            className="lg:col-span-7 flex flex-col justify-between rounded-[30px] bg-[#f8fafc] border border-slate-200/90 p-8 md:p-10 shadow-sm transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono font-medium uppercase tracking-wider px-3.5 py-1 rounded-[30px] bg-white border border-slate-200 text-slate-700">
                  {currentPillar.pillLabel}
                </span>

                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3183FF]" />
                  Enterprise Ready
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display'] mb-2">
                {currentPillar.title}
              </h3>

              <p className="text-sm font-medium mb-4 text-[#3183FF] font-mono">
                {currentPillar.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light mb-8">
                {currentPillar.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-mono font-medium uppercase tracking-wider text-slate-700">
                  Key Production Deliverables:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPillar.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#3183FF] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              {currentPillar.metrics.map((metric, idx) => (
                <div key={idx}>
                  <p className="text-xl sm:text-2xl font-light text-slate-900 font-['Playfair_Display']">
                    {metric.value}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 uppercase mt-0.5">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sleek Console Node Architecture */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[30px] bg-slate-900 text-white p-8 md:p-10 shadow-lg border border-slate-800">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
                  Architecture Node
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[30px] bg-white/10 text-xs font-mono text-[#00F39C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F39C] animate-ping" />
                  <span>LIVE ARCHITECTURE</span>
                </span>
              </div>

              <h4 className="text-xl font-light text-white font-['Playfair_Display'] mb-6">
                {currentPillar.architecturePreview.title}
              </h4>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-[18px] bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs sm:text-sm">
                  <Server className="w-4 h-4 text-[#3183FF] shrink-0" />
                  <span className="font-mono text-slate-200">{currentPillar.architecturePreview.node1}</span>
                </div>

                <div className="p-4 rounded-[18px] bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs sm:text-sm">
                  <Zap className="w-4 h-4 text-[#F5D00B] shrink-0" />
                  <span className="font-mono text-slate-200">{currentPillar.architecturePreview.node2}</span>
                </div>

                <div className="p-4 rounded-[18px] bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#00F39C] shrink-0" />
                  <span className="font-mono text-slate-200">{currentPillar.architecturePreview.node3}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentPillar.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-[30px] bg-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onGetInTouch}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] bg-white hover:bg-slate-200 text-slate-900 font-semibold text-xs tracking-wide transition-all duration-200 cursor-pointer shadow-md"
            >
              <span>Engage This Practice Pod</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
