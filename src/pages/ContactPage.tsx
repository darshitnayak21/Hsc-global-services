import React, { useState } from 'react';
import { PageId } from '../components/DarkHeader';
import { CST_SERVICES } from '../data/servicesData';
import {
  MapPin,
  Phone,
  Mail,
  Lock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceInterest: CST_SERVICES[0].title,
    budgetRange: '$10k - $25k',
    message: '',
    needNda: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid work email address';
    }
    const digits = formData.phone.replace(/\D/g, '');
    if (formData.phone.trim() && digits.length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits)';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your project or technology needs';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      serviceInterest: CST_SERVICES[0].title,
      budgetRange: '$10k - $25k',
      message: '',
      needNda: true,
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const faqs = [
    {
      q: 'How quickly will your team respond to project inquiries?',
      a: 'We will review your inquiry and get back to you promptly to discuss your project requirements.',
    },
    {
      q: 'Do you sign mutual Non-Disclosure Agreements (NDAs)?',
      a: 'Yes. We execute mutual NDAs before reviewing project requirements, proprietary architectures, or codebase repositories.',
    },
    {
      q: 'What engagement models do you offer for IT staffing?',
      a: 'We offer dedicated engineering pods, staff augmentation, and milestone-based engagements depending on your project scope.',
    },
    {
      q: 'Where is your primary delivery center located?',
      a: 'Our central development facilities are located at Plot No. 3-332, 333, G2, Road No. 17, Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081, India.',
    },
  ];

  return (
    <div className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
            Enterprise Engagement
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Let’s Discuss Your{' '}
            <span className="text-cyan-400">
              Next Breakthrough
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            Whether you need custom web development, digital growth marketing, or specialized tech talent, our senior engineering leadership is ready to assist.
          </p>
        </div>

        {/* Main Grid: Form on Left, Contact Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Consultation Request Recorded</h3>
                <p className="text-slate-300 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
                  Thank you! Your project details have been recorded. Our engineering team in Hyderabad will review your inquiry and get back to you promptly.
                </p>
                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-mono text-cyan-400">Reference: CST-REQ-2026-IN</span>
                </div>
                <div className="pt-3">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1.5 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1.5 font-mono">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 40 3503 2090"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1.5 font-mono">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                      Primary Service Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {CST_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                      Target Investment Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="< $10k">&lt; $10k (Discovery / Prototype)</option>
                      <option value="$10k - $25k">$10k - $25k (Standard Build)</option>
                      <option value="$25k - $50k">$25k - $50k (Enterprise Scale)</option>
                      <option value="$50k+">$50k+ (Dedicated Pod / Multi-Phase)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-semibold">
                    Project Vision &amp; Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current tech stack, business goals, and timeline..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                      errors.message ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1.5 font-mono">{errors.message}</p>}
                </div>

                {/* NDA Checkbox */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="page-nda"
                    checked={formData.needNda}
                    onChange={(e) => setFormData({ ...formData, needNda: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                  />
                  <label htmlFor="page-nda" className="text-xs sm:text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Execute Mutual Non-Disclosure Agreement (NDA) before detailed documentation exchange</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-glow-pill w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar: Direct Details & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Direct Communication</h3>
              <div className="space-y-4 text-sm sm:text-base text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white font-medium">Madhapur Campus:</strong>
                    <span>Plot No. 3-332, 333, G2, Road No. 17, Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <strong className="block text-white font-medium">Telephone:</strong>
                    <a href="tel:+914035032090" className="hover:text-cyan-400 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1">
                      +91 40 3503 2090
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <strong className="block text-white font-medium">Email Dispatch:</strong>
                    <a href="mailto:info@creativesolutiontech.in" className="hover:text-cyan-400 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1">
                      info@creativesolutiontech.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/60">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      aria-expanded={activeFaq === idx}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full p-4 text-left text-sm sm:text-base font-semibold text-white flex items-center justify-between gap-2 cursor-pointer hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <span>{faq.q}</span>
                      {activeFaq === idx ? <ChevronUp className="w-4 h-4 shrink-0 text-cyan-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                    </button>
                    {activeFaq === idx && (
                      <div id={`faq-answer-${idx}`} className="p-4 pt-0 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
