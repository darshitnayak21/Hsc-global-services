import React, { useState } from 'react';
import { PageId } from '../components/DarkHeader';
import { TechBackgroundAnimation } from '../components/TechBackgroundAnimation';
import { SubtleAmbientWaves } from '../components/SubtleAmbientWaves';
import { EditorialServiceModal } from '../components/EditorialServiceModal';
import { HOMEPAGE_SERVICES, CSTService } from '../data/servicesData';
import {
  Globe,
  TrendingUp,
  Users,
  Cpu,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Send,
  X,
  Layers,
  Code2,
  Server,
  Building2,
  Search,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onGetInTouch }) => {
  const [selectedSolution, setSelectedSolution] = useState<CSTService | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    needNda: false,
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateContactForm = () => {
    const errs: Record<string, string> = {};
    if (!contactForm.name.trim()) errs.name = 'Please enter your name';
    if (!contactForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) {
      errs.email = 'Please enter a valid work email address';
    }
    const digits = contactForm.phone.replace(/\D/g, '');
    if (contactForm.phone.trim() && digits.length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits)';
    }
    if (!contactForm.message.trim()) {
      errs.message = 'Please provide details about your project';
    }
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setContactForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        needNda: false,
      });
      setContactErrors({});
    }, 800);
  };

  // Verified Actual CST Clients from original website
  const clients = [
    { name: 'Bathala Group', tag: 'Real Estate & Infrastructure' },
    { name: 'Hitek Park', tag: 'Technology & Business Park' },
    { name: 'Triochi Concepts', tag: 'Design & Engineering' },
    { name: 'Vanmayi Technologies', tag: 'Digital Solutions' },
    { name: 'Wincor Nixdorf', tag: 'Banking & Retail Technology' },
    { name: 'Elite International Confex', tag: 'Conferences & Exhibitions' },
  ];

  return (
    <div className="space-y-0">
      {/* 2. HERO SECTION */}
      <section className="relative z-10 pt-24 pb-28 md:pt-36 md:pb-40 overflow-hidden flex flex-col justify-center min-h-[82vh]">
        {/* Layer 1 - 5: Animated Technology Background (Slow flowing data lines, subtle particles, soft ambient glow & faint network pattern) */}
        <TechBackgroundAnimation mode="animated" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-5xl mx-auto text-center space-y-7 sm:space-y-9">
            {/* Hero Headline (Digital Transformation / From Concept to Success - Strongest Visual Element) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] max-w-4xl mx-auto">
              <span className="block">Digital Transformation</span>
              <span className="block text-cyan-400 font-extrabold mt-2 sm:mt-3.5">
                From Concept to Success
              </span>
            </h1>

            {/* 3. Short Supporting Paragraph */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200/90 font-normal leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              We take ambitious ideas and convert them to advanced IT products with simple and attractive interfaces.
            </p>

            {/* 4. One Primary CTA: Explore Our Services */}
            <div className="pt-3 sm:pt-4 flex justify-center">
              <button
                onClick={() => onNavigate('services')}
                className="btn-glow-pill inline-flex items-center justify-center px-8 sm:px-9 py-4 rounded-full text-base sm:text-lg font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5 ml-2.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS CARDS GRID (Editorial Service Cards) */}
      <section className="relative z-10 py-20 md:py-28 border-t border-slate-800/80 overflow-hidden">
        {/* Subtle blue/cyan ambient light waves and floating micro-particles behind cards */}
        <SubtleAmbientWaves />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header (Centered) */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Providing the best{' '}
              <span className="text-cyan-400">
                IT solutions &amp; Services
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We architect, design, and deliver end-to-end digital solutions designed around how visitors, customers, and enterprise users actually interact with modern technology.
            </p>
          </div>

          {/* Editorial Technology Service Cards Grid (Desktop: 3 per row, Tablet: 2 per row, Mobile: 1 per row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
            {HOMEPAGE_SERVICES.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-[26px] border border-slate-900/85 p-[3px] bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-950 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.14)] flex flex-col"
              >
                {/* Concentric Inner Border creating the refined double-line border */}
                <div className="rounded-[22px] border border-slate-900/75 bg-white p-8 sm:p-10 lg:p-11 flex flex-col justify-between h-full min-h-[400px] sm:min-h-[440px] transition-colors duration-300 group-hover:border-slate-950">
                  {/* Service Heading & Concise Description with generous whitespace */}
                  <div className="pt-4 sm:pt-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-cyan-900 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* One "Learn More →" Pill Action Button */}
                  <div className="pt-8 sm:pt-10 mt-auto">
                    <button
                      onClick={() => setSelectedSolution(item)}
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

          {/* Clear Link to Full Services Page */}
          <div className="pt-10 sm:pt-12 flex justify-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span>Explore All Services &amp; Capabilities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CLIENTS WALL (Actual Verified CST Clients Only) */}
      <section className="relative z-10 py-20 md:py-28 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                Proven Client Partnerships
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Our Clients
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Organizations that have partnered with Hscgolbalservices for web engineering, IT consulting, and digital solutions.
              </p>
            </div>
            <button
              onClick={() => onNavigate('clients')}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-cyan-400 hover:text-cyan-300 shrink-0 cursor-pointer self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1"
            >
              <span>View Client Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Clean 6-Client Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="rounded-xl p-6 sm:p-7 border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900/90 hover:border-cyan-500/40 group shadow-md transition-all duration-200 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-cyan-400 group-hover:scale-105 shadow-inner transition-all">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-base sm:text-lg group-hover:text-white transition-colors">
                    {client.name}
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                    {client.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT US / CORE PILLARS SECTION (Verified CST Competencies, No Fabricated Stats) */}
      <section className="relative z-10 py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Who we are */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Architecting Modern Technology From the Heart of{' '}
                <span className="text-cyan-400">
                  Hyderabad's IT Corridor
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Hscgolbalservices operates from Madhapur, Hyderabad — India’s premier digital technology ecosystem. We bridge the gap between ambitious product visions and production-grade execution.
              </p>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Whether deploying specialized engineering pods, engineering modern cloud-hosted platforms, or managing comprehensive digital growth engines, our teams focus on disciplined execution, clear communication, and measurable return on investment.
              </p>

              {/* Bulleted trust points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  'Hyderabad Madhapur Engineering Hub',
                  'Enterprise Quality & Security Standards',
                  'Full Lifecycle Product Architecture',
                  'Transparent Agile Governance',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-sm sm:text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1"
                >
                  <span>Read Our Full Story &amp; Leadership Principles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side: 4 Authentic Core Pillars (Replaced unverified statistics) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-[#090d1a] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Full-Stack Architecture</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Modern web applications, robust APIs, and scalable cloud hosting infrastructure.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-[#090d1a] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Data-Driven Growth</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Technical SEO, credible backlink strategies, and conversion analytics.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-[#090d1a] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Dedicated IT Pods</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Senior developers, designers, and engineers assembled for your roadmap.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-[#090d1a] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Madhapur Hub</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Centralized Hyderabad delivery facility with active agile communication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section className="relative z-10 py-20 md:py-28 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                Direct Consultation
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                We will be happy to consult with you and{' '}
                <span className="text-cyan-400">
                  discuss your project!
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Fill in your details below. Our technical leaders in Hyderabad will review your inquiry and get back to you promptly.
              </p>
            </div>

            {/* Enterprise Form */}
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-[#090d1a] shadow-2xl relative">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you for reaching out to Hscgolbalservices. Our team will contact you shortly to discuss your requirements.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                          contactErrors.name ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                      {contactErrors.name && (
                        <p className="text-xs text-red-400 mt-1.5 font-mono">{contactErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                          contactErrors.email ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                      {contactErrors.email && (
                        <p className="text-xs text-red-400 mt-1.5 font-mono">{contactErrors.email}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Company name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 40 3503 2090"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                          contactErrors.phone ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                      {contactErrors.phone && (
                        <p className="text-xs text-red-400 mt-1.5 font-mono">{contactErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                      Project Details / Message *
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your project requirements, target timeline, or technology needs..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                        contactErrors.message ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {contactErrors.message && (
                      <p className="text-xs text-red-400 mt-1.5 font-mono">{contactErrors.message}</p>
                    )}
                  </div>

                  {/* Need NDA Checkbox */}
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="home-nda"
                      checked={contactForm.needNda}
                      onChange={(e) => setContactForm({ ...contactForm, needNda: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                    />
                    <label htmlFor="home-nda" className="text-xs sm:text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Request a Mutual Non-Disclosure Agreement (NDA) before sharing sensitive documentation</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow-pill w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-xl shadow-cyan-500/25 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Submit Project Consultation</span>
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Solution Details Modal (Editorial Design) */}
      <EditorialServiceModal
        isOpen={!!selectedSolution}
        onClose={() => setSelectedSolution(null)}
        service={
          selectedSolution
            ? {
                category: selectedSolution.categoryLabel,
                title: selectedSolution.title,
                summary: selectedSolution.summary,
                description: selectedSolution.description,
                capabilities: selectedSolution.capabilities,
              }
            : null
        }
        onCtaClick={onGetInTouch}
        ctaText="Let's discuss your project"
      />
    </div>
  );
};
