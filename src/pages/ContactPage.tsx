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
import {
  MotionReveal,
  FloatingElement,
  motion,
  AnimatePresence,
} from '../components/MotionTransitions';

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
      a: 'Our central development facilities are located at Plot No 10, Anasuya Nilayam, Flat No 301, Vivekananda Nagar colony, Kukatpally, Hyderabad - 500072, Telangana, India.',
    },
  ];

  return (
    <div className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <MotionReveal duration={0.7} distance={20} blur>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <FloatingElement distance={4} duration={5} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold shadow-sm">
                Enterprise Engagement
              </div>
            </FloatingElement>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Let’s Discuss Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9F5] via-[#35DDB5] to-[#00D9F5]">
                Next Breakthrough
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
              Whether you need custom web development, digital growth marketing, or specialized tech talent, our senior engineering leadership is ready to assist.
            </p>
          </div>
        </MotionReveal>

        {/* Main Grid: Form on Left, Contact Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <MotionReveal direction="left" distance={25} blur className="lg:col-span-7">
            <div className="glass-card rounded-[28px] p-6 sm:p-10 bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/40 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00D9F5]/10 text-[#00D9F5] border border-[#00D9F5]/25 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Consultation Request Recorded</h3>
                <p className="text-slate-300 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
                  Thank you! Your project details have been recorded. Our engineering team in Hyderabad will review your inquiry and get back to you promptly.
                </p>
                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-mono text-[#00D9F5] font-bold">Reference: CST-REQ-2026-IN</span>
                </div>
                <div className="pt-3">
                  <button
                    onClick={handleResetForm}
                    className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-sm font-bold text-white border border-white/20 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#00D9F5]/30'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1.5 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#00D9F5]/30'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1.5 font-mono">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#00D9F5]/30 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 40 3503 2090"
                      className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#00D9F5]/30'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1.5 font-mono">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                      Primary Service Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#00D9F5]/30 text-white text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 cursor-pointer"
                    >
                      {CST_SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#071A2B] text-white">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                      Target Investment Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#00D9F5]/30 text-white text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 cursor-pointer"
                    >
                      <option value="< $10k" className="bg-[#071A2B] text-white">&lt; $10k (Discovery / Prototype)</option>
                      <option value="$10k - $25k" className="bg-[#071A2B] text-white">$10k - $25k (Standard Build)</option>
                      <option value="$25k - $50k" className="bg-[#071A2B] text-white">$25k - $50k (Enterprise Scale)</option>
                      <option value="$50k+" className="bg-[#071A2B] text-white">$50k+ (Dedicated Pod / Multi-Phase)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-2 font-bold">
                    Project Vision &amp; Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current tech stack, business goals, and timeline..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                      errors.message ? 'border-red-500' : 'border-[#00D9F5]/30'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1.5 font-mono">{errors.message}</p>}
                </div>

                {/* NDA Checkbox */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="page-nda"
                    checked={formData.needNda}
                    onChange={(e) => setFormData({ ...formData, needNda: e.target.checked })}
                    className="w-4 h-4 rounded border-[#00D9F5]/40 bg-[#071A2B] text-[#00D9F5] focus:ring-[#00D9F5] cursor-pointer"
                  />
                  <label htmlFor="page-nda" className="text-xs sm:text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-[#00D9F5]" />
                    <span>Execute Mutual Non-Disclosure Agreement (NDA) before detailed documentation exchange</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-glow-pill w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold text-[#030712] bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            )}
            </div>
          </MotionReveal>

          {/* Right Sidebar: Direct Details & FAQs */}
          <MotionReveal direction="right" distance={25} blur className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="glass-card rounded-[28px] p-6 sm:p-8 bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/40 shadow-xl space-y-5 text-white">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Direct Communication</h3>
              <div className="space-y-4 text-sm sm:text-base text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#00D9F5] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold">Headquarters &amp; Delivery Center:</strong>
                    <span>Plot No 10, Anasuya Nilayam, Flat No 301, Vivekananda Nagar colony, Kukatpally, Hyderabad - 500072, Telangana, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#00D9F5] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold">Telephone:</strong>
                    <div className="space-y-1">
                      <a href="tel:+917799373334" className="hover:text-[#00D9F5] transition-colors font-medium block">
                        +91 7799373334
                      </a>
                      <a href="tel:+914031627399" className="hover:text-[#00D9F5] transition-colors font-medium block">
                        +91- 40 31627399
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#00D9F5] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold">Email Dispatch:</strong>
                    <div className="space-y-1">
                      <a href="mailto:info@hscglobalserices.com" className="hover:text-[#00D9F5] transition-colors font-medium block">
                        info@hscglobalserices.com
                      </a>
                      <a href="mailto:hscglobalenterprises5@gmail.com" className="hover:text-[#00D9F5] transition-colors font-medium block">
                        hscglobalenterprises5@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs with smooth accordion animation */}
            <div className="glass-card rounded-[28px] p-6 sm:p-8 bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/40 shadow-xl space-y-4 text-white">
              <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-[#00D9F5]/20 rounded-xl overflow-hidden bg-[#071A2B]">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      aria-expanded={activeFaq === idx}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full p-4 text-left text-sm sm:text-base font-bold text-white flex items-center justify-between gap-2 cursor-pointer hover:text-[#00D9F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
                    >
                      <span>{faq.q}</span>
                      {activeFaq === idx ? <ChevronUp className="w-4 h-4 shrink-0 text-[#00D9F5]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          id={`faq-answer-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-sm text-slate-300 leading-relaxed border-t border-[#00D9F5]/20 bg-[#0B2235]/60">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </div>
  );
};
