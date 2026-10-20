import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DarkHeader, PageId, ColorTheme } from './components/DarkHeader';
import { DarkFooter } from './components/DarkFooter';
import { IntroScreen } from './components/IntroScreen';

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

// Active session cache key for intro video (updated to ensure freshly uploaded video plays)
const ACTIVE_INTRO_SESSION_KEY = 'hsc_intro_video_v20261020_session';

// Purge old video caching from localStorage and sessionStorage so previous visitors see the newly uploaded intro video
const purgeLegacyVideoCache = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hsc_intro_video_viewed');
      sessionStorage.removeItem('hsc_intro_video_viewed');
      localStorage.removeItem('hsc_intro_viewed');
      sessionStorage.removeItem('hsc_intro_viewed');
      localStorage.removeItem('hsc_intro_video_v1');
      sessionStorage.removeItem('hsc_intro_video_v1');
    }
  } catch {
    // Ignore in restricted environments
  }
};

purgeLegacyVideoCache();

const hasUserSeenIntro = (): boolean => {
  try {
    // Allow manual replay with URL param ?replay=true or ?intro=true for testing
    const params = new URLSearchParams(window.location.search);
    if (params.get('replay') === 'true' || params.get('intro') === 'true') {
      return false;
    }
    // Only check current active session, legacy localStorage persistent caching removed
    return sessionStorage.getItem(ACTIVE_INTRO_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

const markIntroAsViewed = () => {
  try {
    sessionStorage.setItem(ACTIVE_INTRO_SESSION_KEY, 'true');
    // Ensure legacy cache keys remain cleared
    localStorage.removeItem('hsc_intro_video_viewed');
  } catch {
    // Ignore storage quota or restricted environment errors
  }
};

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromLocation);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('cyan-emerald');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(() => !hasUserSeenIntro());

  const handleIntroComplete = () => {
    markIntroAsViewed();
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#071A2B] to-[#030712] text-white font-['Inter'] selection:bg-[#00D9F5] selection:text-[#030712] relative flex flex-col antialiased">
      {/* Separate introductory screen (plays only on first visit, cached on refresh) */}
      {showIntro && (
        <IntroScreen onFinish={handleIntroComplete} />
      )}

      {/* Ambient Cyan and Emerald Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] rounded-full bg-[#00D9F5]/10 blur-[140px]" />
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#35DDB5]/8 blur-[140px]" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#00D9F5]/8 blur-[150px]" />
        <div className="absolute bottom-[10%] left-1/3 w-[600px] h-[400px] rounded-full bg-[#35DDB5]/6 blur-[150px]" />
        <div className="absolute inset-0 bg-grid-mesh opacity-60" />
      </div>

      {/* Global Clean Warm Header across all pages */}
      <DarkHeader
        activePage={activePage}
        onNavigate={handleNavigate}
        onContactClick={() => setIsConsultationOpen(true)}
        colorTheme={colorTheme}
        onChangeColorTheme={handleThemeChange}
      />

      {/* Floating Status Toast - Warm Porcelain Style */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-white/95 text-slate-900 px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-3 duration-300 border border-rose-300 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="font-semibold text-slate-900">{toastMessage}</span>
        </div>
      )}

      {/* Dedicated Multi-Page View Container */}
      <main className="flex-1 relative z-10" id="main-content">
        <Suspense fallback={<div className="min-h-[60vh] bg-[#030712]" aria-hidden="true" />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Global Multi-Page Footer across all pages */}
      <DarkFooter
        onNavigate={handleNavigate}
        onContactClick={() => setIsConsultationOpen(true)}
        onReplayIntro={handleReplayIntro}
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
