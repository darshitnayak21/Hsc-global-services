import React, { useState } from 'react';
import {
  ShieldCheck,
  Code2,
  Smartphone,
  Cloud,
  Cog,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export interface ServiceCardItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const OFFERED_SERVICES: ServiceCardItem[] = [
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    shortDesc:
      'Cybersecurity services help protect computer systems, networks, devices, and critical corporate data from unauthorized breaches, ransomware, and digital threats.',
    fullDesc:
      'Our cybersecurity practice deploys end-to-end defensive architectures, threat modeling, automated vulnerability scans, and continuous compliance monitoring to safeguard enterprise assets against sophisticated modern cyberattacks.',
    deliverables: [
      'Comprehensive Vulnerability Assessments & Pen Testing',
      'Zero-Trust Network Architecture & IAM Implementation',
      'SOC 2, ISO 27001 & GDPR Regulatory Compliance Audits',
      '24/7 Security Incident Response & Threat Mitigation',
    ],
    techStack: ['CrowdStrike', 'Splunk', 'HashiCorp Vault', 'Palo Alto Networks', 'AWS GuardDuty'],
    icon: ShieldCheck,
  },
  {
    id: 'software-development',
    title: 'Software Development',
    shortDesc:
      'Application development, also known as custom software development or app engineering, builds resilient, scalable systems that power business-critical workflows.',
    fullDesc:
      'We engineer enterprise-grade custom web and distributed backend applications tailored to your business rules. From high-throughput APIs to intuitive SaaS platforms, our code is built for longevity and scalability.',
    deliverables: [
      'Custom Enterprise Web Applications & Portals',
      'Microservices & Distributed Cloud Architectures',
      'High-Throughput RESTful & GraphQL API Ecosystems',
      'Legacy Code Modernization & Architecture Refactoring',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker'],
    icon: Code2,
  },
  {
    id: 'mobile-development',
    title: 'Mobile development',
    shortDesc:
      'Mobile development is a dynamic field that evolves rapidly due to mobile devices, delivering high-performance native iOS, Android, and cross-platform apps.',
    fullDesc:
      'We design and deploy fluid, consumer-ready and enterprise-grade mobile applications. Leveraging React Native, Flutter, and native mobile toolchains, we build apps with offline capability and intuitive interfaces.',
    deliverables: [
      'Cross-Platform iOS & Android App Engineering',
      'Native Swift/Kotlin High-Performance Modules',
      'Offline-First Data Synchronization & Push Notification Engines',
      'App Store & Google Play Launch & Compliance Management',
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    icon: Smartphone,
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    shortDesc:
      'Cloud services provide resilient cloud-native architecture, serverless infrastructure, continuous integration, and managed DevOps for enterprise-scale operations.',
    fullDesc:
      'Architect robust multi-region cloud infrastructures that auto-scale with your traffic. We engineer Infrastructure as Code (IaC), container orchestration with Kubernetes, and high-uptime serverless backends.',
    deliverables: [
      'Multi-Cloud Architecture & Landing Zone Implementation',
      'Infrastructure as Code (Terraform, Pulumi, CloudFormation)',
      'Kubernetes Cluster Orchestration & Helm Deployments',
      'Continuous Integration & Continuous Delivery (CI/CD) Automation',
    ],
    techStack: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    icon: Cloud,
  },
  {
    id: 'sap-services',
    title: 'SAP Services',
    shortDesc:
      'SAP services deliver enterprise ERP consulting, implementation, system upgrades, and custom integration to streamline complex enterprise operations.',
    fullDesc:
      'Maximize enterprise operational efficiency with certified SAP consulting. We guide businesses through SAP S/4HANA migrations, custom module development, third-party API connectivity, and continuous system monitoring.',
    deliverables: [
      'SAP S/4HANA Strategy, Roadmap & Migration Execution',
      'Custom SAP ABAP & Fiori Application Engineering',
      'ERP Integration with Third-Party CRM & Logistics Tools',
      'SAP System Health Checks, Performance Tuning & Upgrades',
    ],
    techStack: ['SAP S/4HANA', 'SAP Fiori', 'SAP ABAP', 'SAP BTP', 'SAP SuccessFactors'],
    icon: Cog,
  },
];

interface WhatWeOfferSectionProps {
  onContactClick?: () => void;
  onNavigate?: (page: 'home' | 'about' | 'services' | 'careers' | 'clients' | 'contact') => void;
}

export const WhatWeOfferSection: React.FC<WhatWeOfferSectionProps> = ({
  onContactClick,
  onNavigate,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceCardItem | null>(null);

  const handleConsultation = () => {
    setSelectedService(null);
    if (onContactClick) {
      onContactClick();
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <section className="relative z-10 py-20 sm:py-24 lg:py-28 bg-[#2F1417] border-y border-[#451C22]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Matches Screenshot exactly */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
            What We Offer
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed font-normal">
            Our services organization has the experience and expertise to help your business meet your
            goals and objectives faster, with less risk. HSC Global Services is a consulting organization
            who assists customers in achieving their business objectives with the use of technology.
          </p>
        </div>

        {/* 9 Service Cards Grid (3 Columns x 3 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {OFFERED_SERVICES.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative rounded-xl bg-[#0B5888] border border-white/10 p-7 sm:p-8 flex flex-col justify-between h-full min-h-[290px] shadow-lg hover:shadow-2xl hover:shadow-cyan-900/30 hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  {/* Distinctive Dark Icon Badge (Matches screenshot: dark burgundy badge with teal icon) */}
                  <div className="w-12 h-12 rounded-lg bg-[#271013] border border-white/15 flex items-center justify-center mb-6 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-6 h-6 text-[#2DD4BF]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-3">
                    {card.title}
                  </h3>

                  {/* Card Short Description */}
                  <p className="text-sm text-white/85 leading-relaxed line-clamp-3">
                    {card.shortDesc}
                  </p>
                </div>

                {/* Learn More Action Button */}
                <div className="pt-6 mt-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedService(card)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-cyan-200 transition-colors cursor-pointer group/btn focus-visible:outline-none focus-visible:underline"
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Service Detail Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-[#071E1B] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#0E302B] border border-emerald-500/30 flex items-center justify-center shrink-0">
                {React.createElement(selectedService.icon, { className: 'w-7 h-7 text-[#2DD4BF]' })}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#2DD4BF] font-semibold">
                  Enterprise Capability
                </span>
                <h3 id="service-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {selectedService.fullDesc}
            </p>

            {/* Deliverables List */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Key Deliverables &amp; Outcomes</span>
              </h4>
              <ul className="space-y-2.5">
                {selectedService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack Pills */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Technologies &amp; Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-[#0F352E] border border-emerald-500/20 text-xs font-medium text-[#B7D4CC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Ready to scope your {selectedService.title.toLowerCase()} roadmap?
              </p>
              <button
                type="button"
                onClick={handleConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold shadow-md transition-colors cursor-pointer"
              >
                <span>Request Technical Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
