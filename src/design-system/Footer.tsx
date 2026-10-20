import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Button } from './Button';
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
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesList = [
    { label: 'Technology Consulting', page: 'services' },
    { label: 'Web Technologies & Hosting', page: 'services' },
    { label: 'Digital Marketing & Strategy', page: 'services' },
    { label: 'SEO & Performance Analytics', page: 'services' },
    { label: 'Staffing Solutions', page: 'services' },
    { label: 'Online Software Training', page: 'services' },
  ];

  const quickLinks = [
    { label: 'About Us', page: 'about' },
    { label: 'Our Services', page: 'services' },
    { label: 'Client Success', page: 'clients' },
    { label: 'Career Openings', page: 'careers' },
    { label: 'Contact & Support', page: 'contact' },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* HSC watermark: inline styles ensure visibility even if Tailwind classes are purged */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '4%',
          top: '48%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontSize: 'clamp(150px, 22vw, 300px)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: '#FFFFFF',
          opacity: 0.18,
        }}
      >
        HSC
      </span>

      {/* Main Footer Directory */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Contact Info (span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo size="md" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Founded in 2017, Hscgolbalservices empowers businesses with enterprise IT engineering, strategic digital marketing, and tech talent solutions.
            </p>

            <div className="space-y-3 pt-2 text-xs md:text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="leading-snug">
                  Plot No 10, Anasuya Nilayam, Flat No 301, Vivekananda Nagar colony, Kukatpally, Hyderabad - 500072, Telangana, India
                </span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+917799373334" className="hover:text-blue-400 transition-colors block">
                    +91 7799373334
                  </a>
                  <a href="tel:+914031627399" className="hover:text-blue-400 transition-colors block">
                    +91- 40 31627399
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="mailto:info@hscglobalserices.com" className="hover:text-blue-400 transition-colors block">
                    info@hscglobalserices.com
                  </a>
                  <a href="mailto:hscglobalenterprises5@gmail.com" className="hover:text-blue-400 transition-colors block">
                    hscglobalenterprises5@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions & Services (span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {servicesList.map((service, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate?.(service.page)}
                    className="hover:text-blue-400 transition-colors text-left text-sm"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="hover:text-blue-400 transition-colors text-left text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social (span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono mb-1">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              Subscribe for updates on technology trends, IT insights, and industry best practices.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-800/80 rounded-lg text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are now subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  fullWidth
                  iconRight={<Send className="w-3.5 h-3.5" />}
                >
                  Subscribe to Newsletter
                </Button>
              </form>
            )}

            {/* Social channels */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-blue-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/914035032090"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-blue-500 hover:bg-slate-800 border border-slate-800 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-pink-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Hscgolbalservices. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Hyderabad, India</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
