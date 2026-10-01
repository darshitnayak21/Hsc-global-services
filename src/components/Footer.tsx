import React, { useState } from 'react';
import { BrandLogo } from '../design-system/BrandLogo';
import { PageId } from './Header';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Linkedin,
  MessageCircle,
  Facebook,
  Instagram,
  ArrowUp,
  ShieldCheck,
} from 'lucide-react';

export interface FooterProps {
  onNavigate: (pageId: PageId) => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setInputError('Please enter a valid email address');
      return;
    }

    setIsSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesLinks = [
    { label: 'Technology Consulting', pageId: 'services' as PageId },
    { label: 'Web Technologies & Hosting', pageId: 'services' as PageId },
    { label: 'Digital Strategy & Marketing', pageId: 'services' as PageId },
    { label: 'SEO & Performance Optimization', pageId: 'services' as PageId },
    { label: 'Staffing & Talent Solutions', pageId: 'services' as PageId },
    { label: 'Software Training & Placement', pageId: 'services' as PageId },
  ];

  const quickLinks = [
    { label: 'Home', pageId: 'home' as PageId },
    { label: 'About Us', pageId: 'about' as PageId },
    { label: 'Our Services', pageId: 'services' as PageId },
    { label: 'Careers & Openings', pageId: 'careers' as PageId },
    { label: 'Client Portfolio', pageId: 'clients' as PageId },
    { label: 'Contact Us', pageId: 'contact' as PageId },
  ];

  return (
    <footer
      className={`bg-slate-950 border-t border-slate-800 text-slate-400 text-sm relative z-10 ${className}`}
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* Main Grid Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Company Introduction & Core Identity (span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded-lg p-1 -m-1 cursor-pointer"
              aria-label="Hscgolbalservices Home"
            >
              <BrandLogo size="md" theme="dark" />
            </button>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-['Plus_Jakarta_Sans'] font-light">
              Founded in 2017, Hscgolbalservices empowers businesses with enterprise-grade IT engineering, modern web applications, data-driven digital marketing, and specialized tech talent staffing.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[30px] bg-white/[0.04] border border-white/10 text-xs text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00F39C]" aria-hidden="true" />
              <span>Registered IT & Digital Solutions Partner · Est. 2017</span>
            </div>

            {/* Social channels with 30px pill shapes */}
            <div className="pt-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400 block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[30px] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-[#3183FF] hover:border-[#3183FF] border border-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF]"
                  aria-label="Hscgolbalservices on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://wa.me/914035032090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[30px] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-[#00F39C] hover:text-black hover:border-[#00F39C] border border-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F39C]"
                  aria-label="Chat with Hscgolbalservices on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[30px] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-[#3183FF] hover:border-[#3183FF] border border-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF]"
                  aria-label="Hscgolbalservices on Facebook"
                >
                  <Facebook className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[30px] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-[#FF2E00] hover:border-[#FF2E00] border border-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E00]"
                  aria-label="Hscgolbalservices on Instagram"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-medium text-xs tracking-widest uppercase font-mono mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.pageId)}
                    className="hover:text-white hover:underline underline-offset-4 transition-colors text-left text-sm text-slate-400 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-medium text-xs tracking-widest uppercase font-mono mb-5">
              Practice Spectrum
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((service, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(service.pageId)}
                    className="hover:text-white hover:underline underline-offset-4 transition-colors text-left text-sm text-slate-400 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information & Newsletter (span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-white font-medium text-xs tracking-widest uppercase font-mono mb-4">
                Headquarters
              </h3>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#3183FF] mt-1 shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">
                    Plot No - 3-332, 333, G2, Road No. 17, Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-[#3183FF] shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+914035032090"
                    className="hover:text-white transition-colors font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded"
                  >
                    +91 40 35032090
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-[#3183FF] shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:info@creativesolutiontech.in"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded"
                  >
                    info@creativesolutiontech.in
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription with 30px pill container */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-medium text-xs tracking-widest uppercase font-mono mb-2">
                Subscribe To Briefs
              </h4>
              <p className="text-xs text-slate-400 leading-normal mb-3">
                Receive the latest technology updates, IT consulting insights, and job announcements.
              </p>

              {isSubscribed ? (
                <div
                  className="flex items-center gap-2 p-3 bg-[#00F39C]/10 border border-[#00F39C]/30 rounded-[30px] text-[#00F39C] text-xs animate-in fade-in duration-300"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>You are subscribed to Hscgolbalservices updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5" noValidate>
                  <div className="space-y-1">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (inputError) setInputError('');
                      }}
                      placeholder="Enter your email"
                      className="w-full bg-white/[0.04] border border-white/15 rounded-[30px] px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3183FF] focus:ring-1 focus:ring-[#3183FF] transition-colors"
                      aria-invalid={inputError ? 'true' : 'false'}
                      aria-describedby={inputError ? 'newsletter-error' : undefined}
                    />
                    {inputError && (
                      <p id="newsletter-error" className="text-xs text-red-400" role="alert">
                        {inputError}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[30px] bg-white hover:bg-slate-200 text-black text-xs font-semibold transition-all duration-300 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar: Copyright & Back-to-Top */}
      <div className="border-t border-white/10 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Hscgolbalservices. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-500 hidden md:inline">
              Madhapur, Hyderabad, Telangana 500081
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded-[30px] py-1.5 px-3 hover:bg-white/[0.05]"
              aria-label="Scroll back to top of the page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
