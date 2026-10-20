import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Phone, Mail, Send, Sparkles, Lock } from 'lucide-react';
import { CST_SERVICES } from '../data/servicesData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'General Inquiry',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [needNda, setNeedNda] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleReset();
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);

        if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid work email';
    }
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      errs.phone = 'Please enter a contact phone number';
    } else if (digits.length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits)';
    }
    if (!message.trim()) errs.message = 'Please provide brief details about your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={handleReset}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-[28px] bg-[#071A2B] border border-[#00D9F5]/40 shadow-[0_25px_60px_-15px_rgba(0,217,245,0.2)] p-6 sm:p-9 overflow-hidden flex flex-col max-h-[90vh] text-left text-white"
            onClick={(e) => e.stopPropagation()}
          >
        <button
          ref={closeBtnRef}
          onClick={handleReset}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#00D9F5]/10 text-[#00D9F5] border border-[#00D9F5]/25 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Project Consultation Recorded</h3>
            <p className="text-slate-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Your project details have been recorded. Our engineering leads in Kukatpally, Hyderabad will review your parameters and reach out promptly.
            </p>
            <div className="p-3.5 rounded-xl bg-[#0B2235] border border-[#00D9F5]/20 text-sm font-mono text-slate-300 max-w-sm mx-auto font-medium">
              Direct line: <span className="text-[#00D9F5] font-bold">+91 7799373334 / +91- 40 31627399</span>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-sm sm:text-base font-bold text-white border border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 overflow-y-auto pr-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase mb-2 font-semibold">
                <Sparkles className="w-4 h-4 text-[#00D9F5]" />
                <span>Executive Discovery</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Initiate Project Scoping
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                Direct engagement with CST senior software engineers and technology architects.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Varma"
                  className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-[#00D9F5]/30'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1 font-mono">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-bold">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anand@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[#00D9F5]/30'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1 font-mono">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-bold">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 40 3503 2090"
                    className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-[#00D9F5]/30'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1 font-mono">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-bold">
                  Practice Area
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#00D9F5]/30 text-white text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 cursor-pointer"
                >
                  <option value="General Inquiry" className="bg-[#071A2B] text-white">General Enterprise Inquiry</option>
                  {CST_SERVICES.map((s) => (
                    <option key={s.id} value={s.title} className="bg-[#071A2B] text-white">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-bold">
                  Project Brief *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline key objectives, target timeline, or tech stack requirements..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5] focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                    errors.message ? 'border-red-500' : 'border-[#00D9F5]/30'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1 font-mono">{errors.message}</p>}
              </div>

              {/* NDA Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="modal-nda"
                  checked={needNda}
                  onChange={(e) => setNeedNda(e.target.checked)}
                  className="w-4 h-4 rounded border-[#00D9F5]/40 bg-[#071A2B] text-[#00D9F5] focus:ring-[#00D9F5] cursor-pointer"
                />
                <label htmlFor="modal-nda" className="text-xs sm:text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-[#00D9F5]" />
                  <span>Execute standard mutual Non-Disclosure Agreement (NDA)</span>
                </label>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="btn-glow-pill w-full py-3.5 rounded-full text-base font-bold text-[#030712] bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
                >
                  Send Consultation Request
                </button>
              </div>
            </form>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
