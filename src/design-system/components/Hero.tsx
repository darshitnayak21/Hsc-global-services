import React from 'react';
import { Button, ComponentState } from './Button';
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export interface HeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
  trustSignals?: string[];
  forcedState?: ComponentState;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  badge = 'HSCGOLBALSERVICES · EST. 2017',
  title = 'Providing The Best Services &',
  titleHighlight = 'IT Solutions',
  subtitle = 'Hscgolbalservices delivers enterprise-grade technology consulting, web engineering, strategic digital marketing, and specialized tech talent staffing.',
  primaryCtaText = 'Explore Our Services',
  secondaryCtaText = 'Get In Touch',
  onPrimaryCta,
  onSecondaryCta,
  trustSignals = [
    'Technology Consulting',
    'Web & Cloud Systems',
    'Digital Marketing & SEO',
    'Staffing & Training',
  ],
  forcedState = 'default',
  className = '',
}) => {
  const isLoading = forcedState === 'loading';
  const isError = forcedState === 'error';
  const isEmpty = forcedState === 'empty';
  const isDisabled = forcedState === 'disabled';

  if (isEmpty) {
    return (
      <div className="py-20 bg-slate-900 border-b border-slate-800 text-center text-slate-400 p-8">
        <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
        <p className="text-sm font-mono">Hero banner empty: No campaign headline or CTA configured.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 bg-red-950 border-b border-red-800 text-center text-red-200 p-8">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
        <h3 className="text-lg font-bold">Hero Rendering Fault</h3>
        <p className="text-xs text-red-300 mt-1">Failed to initialize dynamic hero typography matrix.</p>
      </div>
    );
  }

  return (
    <section
      className={`relative pt-16 pb-20 md:pt-24 md:pb-32 bg-[#0a1128] text-white overflow-hidden border-b border-slate-800 ${
        isDisabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
      role="region"
      aria-label="Hero Introduction"
    >
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#007bff]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-5 w-48 bg-slate-800 rounded" />
                <div className="h-14 w-full bg-slate-800 rounded" />
                <div className="h-6 w-5/6 bg-slate-800 rounded" />
                <div className="h-10 w-64 bg-slate-800 rounded" />
              </div>
            ) : (
              <>
                {/* Trust Overline */}
                <div className="inline-flex items-center gap-2.5 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#007bff] animate-pulse" />
                  <span className="text-blue-400 font-bold tracking-wider uppercase">{badge}</span>
                </div>

                {/* Display Headline */}
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Raleway'] leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  {title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    {titleHighlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onPrimaryCta}
                    iconRight={<ArrowRight className="w-5 h-5" />}
                    className="shadow-xl shadow-blue-600/30"
                  >
                    {primaryCtaText}
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={onSecondaryCta}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    {secondaryCtaText}
                  </Button>
                </div>

                {/* Trust Signals Ribbon */}
                <div className="pt-6 border-t border-slate-800/90">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-400">
                    {trustSignals.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#007bff] shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Architectural Verification Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-white font-medium">Enterprise Solutions Matrix</span>
                </div>
                <span className="text-blue-400">CST-HYD</span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-white block font-['Raleway'] mb-0.5">Technology Consulting</strong>
                  System architecture, risk audits, and future-ready IT infrastructure.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-white block font-['Raleway'] mb-0.5">Web Technologies &amp; Hosting</strong>
                  React, Node.js, Angular, high-performance managed cloud hosting.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-white block font-['Raleway'] mb-0.5">IT Staffing &amp; Career Placement</strong>
                  Full-stack talent deployment and 6-step project certification roadmap.
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Madhapur, Hyderabad 500081</span>
                <span className="text-[#007bff]">+91 40 35032090</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
