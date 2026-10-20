import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../components/DarkHeader';
import { SubtleAmbientWaves } from '../components/SubtleAmbientWaves';
import { EditorialServiceModal } from '../components/EditorialServiceModal';
import { HOMEPAGE_SERVICES, CSTService } from '../data/servicesData';
import {
  Globe,
  TrendingUp,
  Users,
  Cpu,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Send,
  X,
  Layers,
  Code2,
  Server,
  Building2,
  Search,
  FileCheck,
  Smartphone,
  ArrowLeftRight,
  Cloud,
  Cog,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const getServiceIcon = (id: string) => {
  switch (id) {
    case 'it-recruitment':
      return Users;
    case 'staffing':
      return Briefcase;
    case 'training-placement':
      return GraduationCap;
    case 'cyber-security':
      return ShieldCheck;
    case 'software-development':
      return Code2;
    case 'mobile-development':
      return Smartphone;
    case 'cloud-services':
      return Cloud;
    case 'sap-services':
      return Cog;
    default:
      return Sparkles;
  }
};

type ClientItem = {
  name: string;
  tag: string;
  bg: string;
  id?: string;
};

// Automatically detect any transparent logos placed into src/images/clients/
const attachedClientLogos: Record<string, string> = import.meta.glob(
  '/src/images/clients/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
);

export function getClientLogoUrl(searchKey: string, fallbackPath: string): string {
  try {
    const entries = Object.entries(attachedClientLogos);
    for (const [path, url] of entries) {
      const lower = path.toLowerCase();
      const target = searchKey.toLowerCase();
      if (lower.includes(target)) {
        return typeof url === 'string' ? url : (url as any)?.default || fallbackPath;
      }
      if (target === 'lt' && (lower.includes('l-and-t') || lower.includes('l&t') || lower.includes('larsen'))) {
        return typeof url === 'string' ? url : (url as any)?.default || fallbackPath;
      }
      if (target === 'cst' && (lower.includes('creative') || lower.includes('cst'))) {
        return typeof url === 'string' ? url : (url as any)?.default || fallbackPath;
      }
    }
  } catch {
    // fallback gracefully
  }
  return fallbackPath;
}

/**
 * Center-focused portrait rectangular carousel:
 * Desktop: Center card ~270px × 360px (scale 1.225 on 220x294 base), Side cards 220px × 294px (scale 1.0).
 * Corner radius 6px (clean 4-8px rectangular profile, no pill shape).
 * Logo centered on pure white canvas with object-fit: contain.
 * Company details panel at the bottom in dark navy gradient with cyan accent lines (no overlap).
 */

const ClientLogoCarousel: React.FC<{ clients: ClientItem[] }> = ({ clients }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || clients.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % clients.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [paused, clients.length]);

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + clients.length) % clients.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % clients.length);
  };

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    const half = Math.floor(clients.length / 2);

    if (offset > half) offset -= clients.length;
    if (offset < -half) offset += clients.length;

    return offset;
  };

  return (
    <div
      className="client-carousel-viewport relative w-full overflow-hidden py-8 sm:py-10 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      aria-label="Client logo carousel"
    >
      <style>{`
        .client-carousel-stage {
          position: relative;
          height: 210px;
          width: 100%;
        }

        .client-carousel-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 260px;
          height: 150px;
          transform: translate(calc(-50% + var(--card-x)), -50%)
            scale(var(--card-scale));
          transform-origin: center center;
          transition: transform 720ms cubic-bezier(.22,.75,.25,1),
            opacity 500ms ease, box-shadow 500ms ease;
          border: 1px solid rgba(0,217,245,.35);
          border-radius: 8px;
          box-shadow: 0 10px 28px -4px rgba(0,0,0,.35);
          will-change: transform;
        }

        .client-carousel-card.is-active {
          border-color: rgba(0,217,245,.95);
          box-shadow: 0 0 20px rgba(0,217,245,.24);
        }

        @media (max-width: 640px) {
          .client-carousel-stage {
            height: 170px;
          }

          .client-carousel-card {
            width: 190px;
            height: 112px;
            transform: translate(calc(-50% + var(--card-x-mobile)), -50%)
              scale(var(--card-scale));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .client-carousel-card {
            transition-duration: 1ms;
          }
        }
      `}</style>

      <div className="client-carousel-stage" aria-live="off">
        {clients.map((client, index) => {
          const offset = getOffset(index);
          const visible = Math.abs(offset) <= 2;
          const scale = offset === 0 ? 1.12 : Math.abs(offset) === 1 ? 0.94 : 0.82;

          return (
            <article
              key={client.name}
              onClick={() => setActiveIndex(index)}
              className={`client-carousel-card flex items-center justify-center overflow-hidden bg-white p-4 sm:p-5 ${
                offset === 0 ? 'is-active' : ''
              }`}
              style={{
                ['--card-x' as string]: `${offset * 280}px`,
                ['--card-x-mobile' as string]: `${offset * 205}px`,
                ['--card-scale' as string]: scale,
                zIndex: 10 - Math.abs(offset),
                opacity: visible ? (Math.abs(offset) === 2 ? 0.45 : 1) : 0,
                pointerEvents: visible ? 'auto' : 'none',
              } as React.CSSProperties}
              aria-label={`${client.name} logo`}
              aria-current={offset === 0 ? 'true' : undefined}
            >
              <img
                src={client.bg}
                alt={index === activeIndex ? `${client.name} logo` : ''}
                aria-hidden={index !== activeIndex}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-contain object-center"
              />
            </article>
          );
        })}
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-3 sm:gap-4"
        aria-label="Carousel navigation"
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous client"
          className="p-2 rounded-full bg-[#071A2B]/90 hover:bg-[#00D9F5]/20 text-slate-300 hover:text-[#00D9F5] border border-[#00D9F5]/30 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {clients.map((client, index) => (
            <button
              key={client.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${client.name}`}
              aria-pressed={activeIndex === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-[#00D9F5]'
                  : 'w-2 bg-slate-600 hover:bg-[#35DDB5]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next client"
          className="p-2 rounded-full bg-[#071A2B]/90 hover:bg-[#00D9F5]/20 text-slate-300 hover:text-[#00D9F5] border border-[#00D9F5]/30 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onGetInTouch }) => {
  const [selectedSolution, setSelectedSolution] = useState<CSTService | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    needNda: false,
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateContactForm = () => {
    const errs: Record<string, string> = {};
    if (!contactForm.name.trim()) errs.name = 'Please enter your name';
    if (!contactForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) {
      errs.email = 'Please enter a valid work email address';
    }
    const digits = contactForm.phone.replace(/\D/g, '');
    if (contactForm.phone.trim() && digits.length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits)';
    }
    if (!contactForm.message.trim()) {
      errs.message = 'Please provide details about your project';
    }
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setContactForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        needNda: false,
      });
      setContactErrors({});
    }, 800);
  };

  // Verified Client Partnerships. Automatically uses transparent logos from src/images/clients/ when present,
  // falling back seamlessly to default verified client images in public/images/Clients/.
  const clients: ClientItem[] = [
    {
      name: 'Creative Solution Tech',
      tag: 'Enterprise IT & Cloud Engineering',
      bg: getClientLogoUrl('creative-solution', '/images/Clients/creative-solution-tech-bg.webp.png'),
    },
    {
      name: 'L&T',
      tag: 'Engineering & Global Infrastructure',
      bg: getClientLogoUrl('lt', '/images/Clients/lt-bg.webp.png'),
    },
    {
      name: 'Appzon Technologies Pvt. Ltd.',
      tag: 'Software Development & Apps',
      bg: getClientLogoUrl('appzon', '/images/Clients/appzon-bg.webp.png'),
    },
    {
      name: 'ServiceNow',
      tag: 'Cloud Computing & Digital Workflows',
      bg: getClientLogoUrl('servicenow', '/images/Clients/servicenow-bg.webp.jpg'),
    },
    {
      name: 'Anudys Technologies Pvt. Ltd.',
      tag: 'IT Consulting & Services',
      bg: getClientLogoUrl('anudys', '/images/Clients/anudys-bg.webp.jpg'),
    },
    {
      name: 'Triochi Concepts',
      tag: 'Creative & Digital Solutions',
      bg: getClientLogoUrl('triochi', '/images/Clients/triochi-bg.webp.png'),
    },
    {
      name: 'Vanmayi Technologies',
      tag: 'Software & Technology Systems',
      bg: getClientLogoUrl('vanmayi', '/images/Clients/vanmayi-bg.webp.png'),
    },
    {
      name: 'Creative Conferences',
      tag: 'Conferences & Exhibitions',
      bg: getClientLogoUrl('creative-conferences', '/images/Clients/creative-conferences-bg.webp.png'),
    },
    {
      name: 'Stage Innovations',
      tag: 'Innovation & Digital Media',
      bg: getClientLogoUrl('stage-innovations', '/images/Clients/stage-innovations-bg.webp.png'),
    },
  ];

  return (
    <div className="space-y-0">
      {/* 2. HERO SECTION */}
      <section className="relative z-10 pt-24 pb-28 md:pt-36 md:pb-44 overflow-hidden flex flex-col justify-center min-h-[85vh]">
        {/* Hero Background Image: Digital Transformation Over the City */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <picture>
            <source srcSet="/images/digital-transformation-city.webp" type="image/webp" />
            <img
              src="/images/digital-transformation-city.png"
              alt="Digital Transformation Over the City"
              className="w-full h-full object-cover object-center filter brightness-[0.46] contrast-[1.08] saturate-[1.12]"
              loading="eager"
            />
          </picture>

          {/* Gradient Overlays for Depth & Sharp Typography Legibility */}
          {/* Top fade into warm navbar */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#030712]/95 via-[#030712]/60 to-transparent" />

          {/* Center dark contrast mask so text remains razor sharp over photography */}
          <div className="absolute inset-0 bg-[#030712]/45" />

          {/* Radial vignette spotlight */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/35 to-[#030712]/80" />

          {/* Bottom fade into the warm services section (#030712) */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-5xl mx-auto text-center space-y-7 sm:space-y-9">
            {/* Hero Headline (Digital Transformation / From Concept to Success - Strongest Visual Element) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] max-w-4xl mx-auto">
              <span className="block">Digital Transformation</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D9F5] via-[#35DDB5] to-[#00D9F5] font-extrabold mt-2 sm:mt-3.5 drop-shadow-sm">
                From Concept to Success
              </span>
            </h1>

            {/* 3. Short Supporting Paragraph */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 font-normal leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              We take ambitious ideas and convert them to advanced IT products with simple and attractive interfaces.
            </p>

            {/* 4. One Primary CTA: Explore Our Services */}
            <div className="pt-3 sm:pt-4 flex justify-center">
              <button
                onClick={() => onNavigate('services')}
                className="btn-glow-pill inline-flex items-center justify-center px-8 sm:px-9 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#00D9F5] via-[#35DDB5] to-[#00D9F5] hover:brightness-110 shadow-xl shadow-[#00D9F5]/100/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5 ml-2.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WARM PORCELAIN SERVICES CARDS SECTION */}
      <section className="relative z-10 py-20 md:py-28 border-t border-[#00D9F5]/60 overflow-hidden">
        {/* Subtle ambient warm light refractions behind glass cards */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#071A2B]/40 blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D9F5]/35 blur-[150px]" />
        </div>
        <SubtleAmbientWaves />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header: Warm 3D glass icon badge */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 shadow-sm mb-5 text-[#00D9F5]">
              <Briefcase className="w-7 h-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              What We Offer
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
              Unlock your business potential with our comprehensive technology and enterprise services. HSC Global Services consultants are equipped with the experience and knowledge to guide you in the right direction.
            </p>
          </div>

          {/* Warm Porcelain Service Cards Grid (3 Columns x 3 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
            {HOMEPAGE_SERVICES.map((item, index) => {
              const Icon = getServiceIcon(item.id);
              const isCenterFeatured = index === 1;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-[28px] p-8 sm:p-9 flex flex-col justify-between h-full min-h-[440px] bg-[#071A2B]/90 backdrop-blur-xl border border-[#00D9F5]/60 hover:border-[#00D9F5] hover:bg-[#0B2235] shadow-[0_10px_30px_rgba(225,29,72,0.06)] hover:shadow-[0_20px_40px_rgba(225,29,72,0.12)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Subtle top-edge light reflection line */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D9F5]/25/50 to-transparent pointer-events-none" />

                  {/* Card Content Top */}
                  <div>
                    {/* Icon Badge */}
                    <div className="w-13 h-13 rounded-2xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 flex items-center justify-center mb-6 shadow-inner text-[#00D9F5] group-hover:scale-105 group-hover:border-[#00D9F5] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug mb-3.5 group-hover:text-[#00D9F5] transition-colors">
                      {item.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed font-normal mb-6">
                      {item.description}
                    </p>

                    {/* Key Capabilities Bullet Points */}
                    <ul className="space-y-2.5 mb-8 text-left">
                      {item.capabilities.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <span className="text-[#00D9F5]/100 text-base leading-none select-none font-bold mt-0.5">•</span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Full-width CTA Button: "Get Started →" */}
                  <div className="pt-2 mt-auto">
                    <button
                      onClick={() => setSelectedSolution(item)}
                      className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] ${
                        isCenterFeatured
                          ? 'bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] hover:brightness-110 text-white font-bold shadow-md shadow-[#00D9F5]/100/20'
                          : 'bg-[#00D9F5]/10 hover:bg-[#00D9F5]/15 text-[#CBD5E1] border border-[#00D9F5]/25 font-bold shadow-sm'
                      }`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear Link to Full Services Page */}
          <div className="pt-12 sm:pt-14 flex justify-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#00D9F5]/25 bg-[#071A2B]/80 hover:bg-[#0B2235] text-[#35DDB5] hover:text-[#35DDB5] font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5]"
            >
              <span>Explore All Capabilities &amp; Case Studies</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CLIENTS WALL (Actual Verified CST Clients Only) */}
      <section className="relative z-10 py-20 md:py-28 border-t border-[#00D9F5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                Proven Client Partnerships
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Our Clients
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                Organizations that have partnered with Hscgolbalservices for web engineering, IT consulting, and digital solutions.
              </p>
            </div>
            <button
              onClick={() => onNavigate('clients')}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#00D9F5] hover:text-[#35DDB5] shrink-0 cursor-pointer self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] rounded px-1"
            >
              <span>View Client Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Medium Client Cards: continuous right-to-left scroll with center zoom */}
          <ClientLogoCarousel clients={clients} />
        </div>
      </section>

      {/* 6. ABOUT US / CORE PILLARS SECTION (Verified CST Competencies) */}
      <section className="relative z-10 py-20 md:py-28 border-t border-[#00D9F5]/60 bg-gradient-to-b from-[#071A2B] to-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Who we are */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35DDB5]/10 border border-[#35DDB5]/25 text-amber-900 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Architecting Modern Technology From the Heart of{' '}
                <span className="text-[#00D9F5]">
                  Hyderabad's IT Corridor
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                HSC Global Services operates from Kukatpally, Hyderabad — India’s premier digital technology ecosystem. We bridge the gap between ambitious product visions and production-grade execution.
              </p>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Whether deploying specialized engineering pods, engineering modern cloud-hosted platforms, or managing comprehensive digital growth engines, our teams focus on disciplined execution, clear communication, and measurable return on investment.
              </p>

              {/* Bulleted trust points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  'Hyderabad Kukatpally Engineering Hub',
                  'Enterprise Quality & Security Standards',
                  'Full Lifecycle Product Architecture',
                  'Transparent Agile Governance',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-sm sm:text-base text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#00D9F5] shrink-0" />
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#00D9F5] hover:text-[#35DDB5] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] rounded px-1"
                >
                  <span>Read Our Full Story &amp; Leadership Principles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side: 4 Authentic Core Pillars */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 border border-[#00D9F5]/60 bg-[#071A2B]/95 space-y-2.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 flex items-center justify-center text-[#00D9F5] mb-2">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Full-Stack Architecture</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Modern web applications, robust APIs, and scalable cloud hosting infrastructure.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[#00D9F5]/60 bg-[#071A2B]/95 space-y-2.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#35DDB5]/10 border border-[#35DDB5]/25 flex items-center justify-center text-[#00D9F5] mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Data-Driven Growth</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Technical SEO, credible backlink strategies, and conversion analytics.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[#00D9F5]/60 bg-[#071A2B]/95 space-y-2.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 flex items-center justify-center text-[#00D9F5] mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Dedicated IT Pods</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Senior developers, designers, and engineers assembled for your roadmap.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[#00D9F5]/60 bg-[#071A2B]/95 space-y-2.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#35DDB5]/10 border border-[#35DDB5]/25 flex items-center justify-center text-[#35DDB5] mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Kukatpally Delivery Hub</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Centralized Kukatpally, Hyderabad facility with active agile communication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section className="relative z-10 py-20 md:py-28 border-t border-[#00D9F5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                Direct Consultation
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                We will be happy to consult with you and{' '}
                <span className="text-[#00D9F5]">
                  discuss your project!
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Fill in your details below. Our technical leaders in Hyderabad will review your inquiry and get back to you promptly.
              </p>
            </div>

            {/* Enterprise Form - Warm Porcelain Surface */}
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#00D9F5]/60 bg-[#071A2B]/95 shadow-xl relative">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00D9F5]/10 text-[#00D9F5] border border-[#00D9F5]/25 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully</h3>
                  <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you for reaching out to Hscgolbalservices. Our team will contact you shortly to discuss your requirements.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-sm font-semibold text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5]/100 focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                          contactErrors.name ? 'border-red-500' : 'border-[#00D9F5]/25'
                        }`}
                      />
                      {contactErrors.name && (
                        <p className="text-xs text-red-500 mt-1.5 font-mono">{contactErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5]/100 focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                          contactErrors.email ? 'border-red-500' : 'border-[#00D9F5]/25'
                        }`}
                      />
                      {contactErrors.email && (
                        <p className="text-xs text-red-500 mt-1.5 font-mono">{contactErrors.email}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Company name"
                        className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#00D9F5]/25 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5]/100 focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 40 3503 2090"
                        className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5]/100 focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                          contactErrors.phone ? 'border-red-500' : 'border-[#00D9F5]/25'
                        }`}
                      />
                      {contactErrors.phone && (
                        <p className="text-xs text-red-500 mt-1.5 font-mono">{contactErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                      Project Details / Message *
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your project requirements, target timeline, or technology needs..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#071A2B] border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00D9F5]/100 focus:ring-2 focus:ring-[#00D9F5]/25 transition-colors ${
                        contactErrors.message ? 'border-red-500' : 'border-[#00D9F5]/25'
                      }`}
                    />
                    {contactErrors.message && (
                      <p className="text-xs text-red-500 mt-1.5 font-mono">{contactErrors.message}</p>
                    )}
                  </div>

                  {/* Need NDA Checkbox */}
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="home-nda"
                      checked={contactForm.needNda}
                      onChange={(e) => setContactForm({ ...contactForm, needNda: e.target.checked })}
                      className="w-4 h-4 rounded border-[#00D9F5]/30 bg-[#071A2B] text-[#00D9F5] focus:ring-[#00D9F5]/100 cursor-pointer"
                    />
                    <label htmlFor="home-nda" className="text-xs sm:text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Request a Mutual Non-Disclosure Agreement (NDA) before sharing sensitive documentation</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow-pill w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#00D9F5] via-[#35DDB5] to-[#00D9F5] hover:brightness-110 shadow-xl shadow-[#00D9F5]/100/25 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Submit Project Consultation</span>
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Solution Details Modal (Editorial Design) */}
      <EditorialServiceModal
        isOpen={!!selectedSolution}
        onClose={() => setSelectedSolution(null)}
        service={
          selectedSolution
            ? {
                category: selectedSolution.categoryLabel,
                title: selectedSolution.title,
                summary: selectedSolution.summary,
                description: selectedSolution.description,
                capabilities: selectedSolution.capabilities,
              }
            : null
        }
        onCtaClick={onGetInTouch}
        ctaText="Let's discuss your project"
      />
    </div>
  );
};
