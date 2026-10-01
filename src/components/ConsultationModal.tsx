import React, { useState, useEffect, useRef } from 'react';
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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl rounded-2xl bg-[#090d1a] border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          onClick={handleReset}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Project Consultation Recorded</h3>
            <p className="text-slate-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Your project details have been recorded. Our engineering leads in Madhapur, Hyderabad will review your parameters and reach out promptly.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-300 max-w-sm mx-auto">
              Direct line: <span className="text-cyan-400 font-semibold">+91 40 3503 2090</span>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-7 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-sm sm:text-base font-semibold text-white transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 overflow-y-auto pr-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase mb-2 font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
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
                <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Varma"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-slate-800'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-semibold">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anand@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-semibold">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 40 3503 2090"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1 font-mono">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-semibold">
                  Practice Area
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="General Inquiry">General Enterprise Inquiry</option>
                  {CST_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1.5 font-semibold">
                  Project Brief *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline key objectives, target timeline, or tech stack requirements..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                    errors.message ? 'border-red-500' : 'border-slate-800'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message}</p>}
              </div>

              {/* NDA Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="modal-nda"
                  checked={needNda}
                  onChange={(e) => setNeedNda(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="modal-nda" className="text-xs sm:text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Execute standard mutual Non-Disclosure Agreement (NDA)</span>
                </label>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="btn-glow-pill w-full py-3.5 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Send Consultation Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
