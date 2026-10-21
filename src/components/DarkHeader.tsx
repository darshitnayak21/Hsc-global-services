
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '../design-system/BrandLogo';

export type PageId = 'home' | 'about' | 'services' | 'careers' | 'clients' | 'contact';
export type ColorTheme = 'cyan-emerald' | 'solar-gold' | 'sapphire-ice';

interface DarkHeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onContactClick?: () => void;
  colorTheme?: ColorTheme;
  onChangeColorTheme?: (theme: ColorTheme) => void;
}

export const DarkHeader: React.FC<DarkHeaderProps> = ({
  activePage,
  onNavigate,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement | null>(null);

  const navLinks: { id: PageId; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'careers', label: 'Careers', path: '/careers' },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleContact = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onNavigate('contact');
    onContactClick?.();
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const headerFocus =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]';

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-[#00D9F5]/15 shadow-[0_4px_25px_-4px_rgba(0,217,245,0.06)] transition-all duration-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[82px] sm:h-[90px] md:h-[96px] flex items-center justify-between gap-4">
        {/* Brand Lockup: Logo alongside Company Name & Tagline */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
          className={`group text-left rounded-xl p-1 cursor-pointer transition-all select-none shrink-0 min-w-0 ${headerFocus}`}
          aria-label="HSC GLOBAL SERVICES - Home"
        >
          <BrandLogo size="md" theme="dark" />
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav aria-label="Main Navigation" className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;

              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-sm lg:text-[15px] transition-colors duration-150 cursor-pointer rounded px-1.5 ${headerFocus} ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-[#00D9F5] font-medium'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] shadow-[0_0_8px_rgba(0,217,245,0.7)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleContact}
            className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 text-[#030712] text-sm lg:text-[15px] font-bold shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0 ${headerFocus}`}
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
          >
            <span>Contact Us</span>
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            ref={hamburgerBtnRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl bg-[#071A2B] hover:bg-[#0B2235] border border-[#00D9F5]/20 text-white cursor-pointer shadow-sm transition-colors ${headerFocus}`}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#00D9F5]" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={mobileMenuRef}
            role="region"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#00D9F5]/15 bg-[#030712] shadow-2xl overflow-hidden relative z-20"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left py-3 px-3.5 text-base rounded-xl transition-all cursor-pointer flex items-center justify-between ${headerFocus} ${
                      isActive
                        ? 'text-white font-bold bg-[#071A2B] border border-[#00D9F5]/20'
                        : 'text-slate-300 hover:text-[#00D9F5] hover:bg-[#071A2B] font-medium'
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#00D9F5] to-[#35DDB5]"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleContact}
                  className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-full bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 text-[#030712] text-base font-bold shadow-lg shadow-cyan-500/15 active:scale-[0.98] transition-transform cursor-pointer ${headerFocus}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  <span>Contact Us</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
