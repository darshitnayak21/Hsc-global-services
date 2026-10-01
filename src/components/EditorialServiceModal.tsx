import React, { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';

export interface EditorialModalData {
  id?: string;
  category: string;
  title: string;
  summary: string; // Short one-line service summary
  description: string; // Short service description
  capabilities: string[]; // 3-5 concise service capabilities ("What we provide")
}

interface EditorialServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: EditorialModalData | null;
  onCtaClick: () => void;
  ctaText?: string;
}

export const EditorialServiceModal: React.FC<EditorialServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  onCtaClick,
  ctaText = "Let's discuss your project",
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current active element to restore focus after closing
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button on open for clean accessibility
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      // Handle Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }

        // Focus trap inside modal
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

        // Restore focus to triggering button
        if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editorial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container: Matching the white editorial card design with double-line border */}
      <div
        ref={modalRef}
        className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-[26px] border border-slate-900/85 p-[3px] bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Concentric Inner Border creating the exact same double-line border */}
        <div className="rounded-[22px] border border-slate-900/75 bg-white p-7 sm:p-9 md:p-10 flex flex-col overflow-y-auto max-h-[calc(92vh-6px)]">
          {/* Header row with Category and Close Button */}
          <div className="flex items-start justify-between gap-4">
            {/* 1. Small service category label */}
            <span className="text-xs sm:text-sm font-mono text-cyan-700 uppercase tracking-wider font-bold block pt-1">
              {service.category}
            </span>

            {/* Close button in top-right */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:text-slate-950 hover:border-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Large service title */}
          <h3
            id="editorial-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug mt-3"
          >
            {service.title}
          </h3>

          {/* 3. Short one-line service summary */}
          <p className="mt-3 text-sm sm:text-base font-semibold text-slate-800 leading-snug">
            {service.summary}
          </p>

          {/* 4. Short service description */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {service.description}
          </p>

          {/* 5. "WHAT WE PROVIDE" section heading */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs sm:text-sm font-mono font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              WHAT WE PROVIDE
            </h4>

            {/* 6. 3–5 concise service capabilities */}
            <ul className="space-y-2.5">
              {service.capabilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-medium">
                  <span className="text-cyan-600 font-bold shrink-0 mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. One primary CTA at the bottom */}
          <div className="mt-8 pt-3">
            <button
              onClick={() => {
                onClose();
                onCtaClick();
              }}
              className="w-full inline-flex items-center justify-between rounded-full border border-slate-900 bg-white px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 transition-all duration-200 hover:bg-slate-50 cursor-pointer group/cta shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span>{ctaText}</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF4500] text-white flex items-center justify-center ml-3.5 transition-transform duration-200 group-hover/cta:translate-x-1 shrink-0 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
