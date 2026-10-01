import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Button } from './Button';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'careers', label: 'Careers', href: '#careers' },
  { id: 'clients', label: 'Clients', href: '#clients' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  onContactClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage = 'home',
  onNavigate,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark & Motif */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
              aria-label="Hscgolbalservices Home"
            >
              <BrandLogo size="md" />
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {defaultNavItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Phone Touchpoint */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+914035032090"
              className="hidden xl:inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900/60 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 40 35032090</span>
            </a>
            <Button
              variant="primary"
              size="sm"
              iconRight={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                if (onContactClick) onContactClick();
                else handleNavClick('contact');
              }}
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {defaultNavItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <a
              href="tel:+914035032090"
              className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 40 35032090</span>
            </a>
            <Button
              variant="primary"
              fullWidth
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                if (onContactClick) onContactClick();
                else handleNavClick('contact');
              }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
