import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Clock,
} from 'lucide-react';

interface MovateBentoGridProps {
  onNavigate: (pageId: any) => void;
  onGetInTouch: () => void;
}

export const MovateBentoGrid: React.FC<MovateBentoGridProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-[#f8fafc] border-b border-slate-200/80 overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
            <span className="tracking-widest uppercase">Enterprise Architectural Advantage</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-['Playfair_Display'] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Why Industry Leaders Choose{' '}
            <span className="italic font-normal text-slate-800">
              Hscgolbalservices
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light">
            Combining rigorous full-stack software engineering with high-velocity digital marketing
            and dedicated talent acquisition under unified enterprise leadership.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: 7 cols */}
          <div
            onMouseEnter={() => setHoveredCard('card1')}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-7 rounded-[30px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-500 px-3.5 py-1 rounded-[30px] bg-slate-100">
                  Engineering Reliability
                </span>
                <div className="w-10 h-10 rounded-[16px] bg-blue-50 text-[#3183FF] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display'] mb-3">
                Full-Stack Architecture Without Technical Debt
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light mb-6">
                We engineer scalable cloud-native architectures that eliminate legacy dependencies,
                optimize resource utilization, and deliver sub-200ms API response times across production.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Automated CI/CD deployment pipelines',
                  'Encrypted data storage and strict audit logs',
                  'Zero-downtime blue/green deployments',
                  '99.9% uptime SLA commitments',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#3183FF] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>99.9% Production Availability</span>
              <span className="text-slate-900 font-medium">Enterprise Guaranteed</span>
            </div>
          </div>

          {/* Card 2: 5 cols */}
          <div
            onMouseEnter={() => setHoveredCard('card2')}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-5 rounded-[30px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-500 px-3.5 py-1 rounded-[30px] bg-slate-100">
                  Growth Velocity
                </span>
                <div className="w-10 h-10 rounded-[16px] bg-red-50 text-[#FF2E00] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display'] mb-3">
                Measurable Multi-Channel Growth
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light mb-6">
                We combine deep technical SEO, targeted Google and Meta advertising funnels, and conversion-rate optimization to deliver qualified enterprise leads.
              </p>

              <div className="p-5 rounded-[20px] bg-slate-50 border border-slate-100 space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-mono">Organic Search Growth:</span>
                  <span className="text-[#0f172a] font-bold font-mono">+180% Avg</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-mono">Lead Acquisition Cost:</span>
                  <span className="text-[#0f172a] font-bold font-mono">-45% Reduction</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Transparent Analytics</span>
              <span className="text-slate-900 font-medium">Real-Time Dashboards</span>
            </div>
          </div>

          {/* Card 3: 5 cols */}
          <div
            onMouseEnter={() => setHoveredCard('card3')}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-5 rounded-[30px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-500 px-3.5 py-1 rounded-[30px] bg-slate-100">
                  Talent Delivery
                </span>
                <div className="w-10 h-10 rounded-[16px] bg-emerald-50 text-[#00F39C] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display'] mb-3">
                Rapid Engineering Staffing Pods
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light mb-6">
                Deploy vetted full-stack engineers, QA automation experts, and database administrators ready to integrate with your existing agile sprints within 48 to 72 hours.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {['.NET Core', 'React', 'Java', 'PHP / Laravel', 'SQL / Oracle'].map((tech, idx) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-[30px] bg-slate-100 text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Shortlisting Window</span>
              <span className="text-slate-900 font-medium">&lt;72 Hours</span>
            </div>
          </div>

          {/* Card 4: 7 cols */}
          <div
            onMouseEnter={() => setHoveredCard('card4')}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-7 rounded-[30px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-500 px-3.5 py-1 rounded-[30px] bg-slate-100">
                  Governance &amp; Trust
                </span>
                <div className="w-10 h-10 rounded-[16px] bg-amber-50 text-[#F5D00B] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 font-['Playfair_Display'] mb-3">
                Milestone Governance &amp; Full IP Transfer
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light mb-6">
                All client contracts include rigorous non-disclosure agreements, clear milestone-based invoicing gates, complete source code intellectual property transfer, and transparent communication protocols.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  '100% intellectual property ownership transfer',
                  'Bi-weekly live sprint demonstrations',
                  'Dedicated technical project managers',
                  'Post-launch warranty & SLA support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#3183FF] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Contractual Protection</span>
              <span className="text-slate-900 font-medium">100% IP Transfer</span>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-14 p-8 sm:p-10 rounded-[30px] bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-light text-slate-900 font-['Playfair_Display']">
              Ready to Discuss Your Enterprise Architecture?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-light mt-1">
              Speak directly with our Hyderabad solution directors to evaluate timelines, staffing, and deliverables.
            </p>
          </div>

          <button
            type="button"
            onClick={onGetInTouch}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[30px] bg-slate-900 hover:bg-[#3183FF] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm"
          >
            <span>Schedule Initial Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
