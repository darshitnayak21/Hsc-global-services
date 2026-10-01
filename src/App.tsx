import React, { useState, useEffect, Suspense, lazy } from 'react';
import { DarkHeader, PageId, ColorTheme } from './components/DarkHeader';
import { DarkFooter } from './components/DarkFooter';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })));
const ClientsPage = lazy(() => import('./pages/ClientsPage').then((m) => ({ default: m.ClientsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ConsultationModal = lazy(() => import('./components/ConsultationModal').then((m) => ({ default: m.ConsultationModal })));

const validPages: Record<string, PageId> = {
  '': 'home',
  'home': 'home',
  'about': 'about',
  'services': 'services',
  'careers': 'careers',
  'clients': 'clients',
  'contact': 'contact',
};

const getPageFromLocation = (): PageId => {
  // Check pathname first (e.g. /about, /services)
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (path && validPages[path]) {
    return validPages[path];
  }

  // Fallback to hash (e.g. #/about, #about)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (hash && validPages[hash]) {
    return validPages[hash];
  }

  return 'home';
};

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromLocation);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('cyan-emerald');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with browser URL (popstate and hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setActivePage(page);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update dynamic page document title per route
  useEffect(() => {
    const pageTitles: Record<PageId, string> = {
      home: 'Hscgolbalservices — Digital Transformation From Concept to Success',
      about: 'About Us & Company Journey — Hscgolbalservices',
      services: 'IT Solutions & Services — Hscgolbalservices',
      careers: 'Careers & IT Staffing in Hyderabad — Hscgolbalservices',
      clients: 'Clients & Enterprise Case Studies — Hscgolbalservices',
      contact: 'Contact Us & Technical Consultation — Hscgolbalservices',
    };
    document.title = pageTitles[activePage] || pageTitles.home;
  }, [activePage]);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    
    // Update browser URL without full-page reload for smooth multi-page experience
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }

    // Scroll to the top hero section immediately for clean multi-page transition
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
    const themeNames: Record<ColorTheme, string> = {
      'cyan-emerald': 'Cyber Cyan & Emerald Mint (Default)',
      'solar-gold': 'Solar Gold & Warm Amber',
      'sapphire-ice': 'Sapphire & Laser Blue',
    };
    showToast(`Theme: ${themeNames[theme]}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-['Inter'] selection:bg-cyan-500 selection:text-black relative flex flex-col antialiased">
      {/* Ambient Lighting Spots (Spectralsoft Visual Language) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-1/3 w-[600px] h-[400px] rounded-full bg-teal-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-grid-mesh opacity-50" />
      </div>

      {/* Global Clean White Header across all pages */}
      <DarkHeader
        activePage={activePage}
        onNavigate={handleNavigate}
        onContactClick={() => setIsConsultationOpen(true)}
        colorTheme={colorTheme}
        onChangeColorTheme={handleThemeChange}
      />

      {/* Floating Status Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-3 duration-300 border border-cyan-500/40 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-medium text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* Dedicated Multi-Page View Container */}
      <main className="flex-1 relative z-10" id="main-content">
        <Suspense fallback={<div className="min-h-[60vh] bg-[#030712]" aria-hidden="true" />}>
          {activePage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onGetInTouch={() => setIsConsultationOpen(true)}
            />
          )}
          {activePage === 'about' && (
            <AboutPage
              onNavigate={handleNavigate}
              onGetInTouch={() => setIsConsultationOpen(true)}
            />
          )}
          {activePage === 'services' && (
            <ServicesPage
              onNavigate={handleNavigate}
              onGetInTouch={() => setIsConsultationOpen(true)}
            />
          )}
          {activePage === 'careers' && (
            <CareersPage
              onNavigate={handleNavigate}
              onGetInTouch={() => setIsConsultationOpen(true)}
            />
          )}
          {activePage === 'clients' && (
            <ClientsPage
              onNavigate={handleNavigate}
              onGetInTouch={() => setIsConsultationOpen(true)}
            />
          )}
          {activePage === 'contact' && (
            <ContactPage onNavigate={handleNavigate} />
          )}
        </Suspense>
      </main>

      {/* Global Multi-Page Footer across all pages */}
      <DarkFooter
        onNavigate={handleNavigate}
        onContactClick={() => setIsConsultationOpen(true)}
      />

      {/* Interactive Global Consultation Modal (loaded only when opened) */}
      {isConsultationOpen && (
        <Suspense fallback={null}>
          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
