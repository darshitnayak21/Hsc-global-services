import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  ShieldCheck,
  Building,
  Pause,
  Play,
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  clientName: string;
  companyName: string;
  role: string;
  industry: string;
  quote: string;
  outcomeMetric: string;
  outcomeLabel: string;
  serviceCategory: string;
  rating: number;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'creative-solution-tech',
    clientName: 'Sunil Rao',
    companyName: 'Creative Solution Tech',
    role: 'Principal Cloud Architect',
    industry: 'Enterprise IT & Cloud Engineering',
    quote:
      'Hsc Global Services transformed our cloud deployment workflows with an intuitive, scalable microservices infrastructure. Their team engineered high-throughput API integrations and coordinated cloud strategies that noticeably elevated our delivery speed.',
    outcomeMetric: '4.2x',
    outcomeLabel: 'Deployment Throughput Increase',
    serviceCategory: 'Web Systems & Enterprise Strategy',
    rating: 5,
  },
  {
    id: 'lt',
    clientName: 'Rajesh Varma',
    companyName: 'L&T',
    role: 'Infrastructure Delivery Lead',
    industry: 'Engineering & Global Infrastructure',
    quote:
      'The modern interactive enterprise portals and systems integration executed for L&T exceeded our rigorous performance targets. Their deep engineering capability provided immediate stability and enterprise-grade reliability.',
    outcomeMetric: '99.99%',
    outcomeLabel: 'Mission-Critical Systems Uptime',
    serviceCategory: 'Systems Reliability & IT Architecture',
    rating: 5,
  },
  {
    id: 'servicenow',
    clientName: 'David Chen',
    companyName: 'ServiceNow',
    role: 'Solutions Architecture Director',
    industry: 'Cloud Computing & Digital Workflows',
    quote:
      'Managing automated workflows for global enterprises requires high-availability database infrastructure and zero latency. HSC Global Services deployed senior software architects who delivered robust, seamless system orchestration.',
    outcomeMetric: '68%',
    outcomeLabel: 'Workflow Automation Efficiency',
    serviceCategory: 'Cloud Orchestration & Integration',
    rating: 5,
  },
  {
    id: 'appzon-technologies',
    clientName: 'Naveen K.',
    companyName: 'Appzon Technologies Pvt. Ltd.',
    role: 'Chief Technology Officer',
    industry: 'Software Development & Apps',
    quote:
      'When accelerating our mobile product delivery, HSC Global Services provided vetted full-stack engineers in less than two weeks. Their engineering matched our strict code quality standards from day one, allowing us to hit critical client release dates.',
    outcomeMetric: '<12 Days',
    outcomeLabel: 'Engineering Onboarding Velocity',
    serviceCategory: 'Dedicated Engineering Staffing',
    rating: 5,
  },
  {
    id: 'triochi',
    clientName: 'Priya Sundaram',
    companyName: 'Triochi Concepts',
    role: 'Executive Creative Director',
    industry: 'Creative & Digital Solutions',
    quote:
      'HSC Global Services engineered a responsive, high-fidelity React architecture for our brand portfolios that blends artistic elegance with technical speed. Their technical optimizations pushed our key digital platforms to exceptional performance.',
    outcomeMetric: '+320%',
    outcomeLabel: 'Digital Platform Performance',
    serviceCategory: 'Web Engineering & Digital Experience',
    rating: 5,
  },
  {
    id: 'creative-conferences',
    clientName: 'Arun Sharma',
    companyName: 'Creative Conferences',
    role: 'Head of Global Events & Summits',
    industry: 'Conferences & Exhibitions',
    quote:
      'Organizing high-profile summits requires flawless registration systems and high-throughput attendee management. HSC Global Services handled our technical deployment with remarkable poise, generating record summit attendee turnout.',
    outcomeMetric: '14,000+',
    outcomeLabel: 'Executive Delegates Registered',
    serviceCategory: 'Digital Event Tech & Portals',
    rating: 5,
  },
];

interface CorporateTestimonialsSliderProps {
  onNavigate?: (pageId: any) => void;
  onGetInTouch?: () => void;
}

export const CorporateTestimonialsSlider: React.FC<CorporateTestimonialsSliderProps> = ({
  onNavigate,
  onGetInTouch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    setProgress(0);
  };

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const duration = 6500;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const minSwipeDistance = 50;

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#f8fafc] text-slate-900 overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-[30px] bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium tracking-widest uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
              <span>Verified Enterprise Client Impact</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-['Playfair_Display'] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              What Leading Enterprises Say About{' '}
              <span className="italic font-normal text-slate-800">
                Partnering With Hscgolbalservices
              </span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] font-light">
              Direct testimonials from executive leadership, CTOs, and managing directors who rely on
              Hscgolbalservices for enterprise engineering and strategic digital execution.
            </p>
          </div>

          {/* Slider Action Controls & Slide Counter */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Auto-Play Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-3 rounded-[30px] bg-white border border-slate-200 text-slate-600 hover:text-black hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
              title={isAutoPlaying ? 'Pause automatic slider' : 'Resume automatic slider'}
              aria-label={isAutoPlaying ? 'Pause slider' : 'Play slider'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Slide Index Counter */}
            <div className="px-4 py-2 rounded-[30px] bg-white border border-slate-200 text-xs font-mono font-medium text-slate-600 shadow-xs">
              <span className="text-slate-900 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-slate-400">/</span>
              <span>{String(TESTIMONIALS_DATA.length).padStart(2, '0')}</span>
            </div>

            {/* Prev Slide Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-3.5 rounded-[30px] bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous testimonial card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Slide Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="p-3.5 rounded-[30px] bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              aria-label="Next testimonial card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Container */}
        <div
          className="relative overflow-hidden rounded-[30px] md:rounded-[40px]"
          onTouchStart={onTouchStartHandler}
          onTouchMove={onTouchMoveHandler}
          onTouchEnd={onTouchEndHandler}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {TESTIMONIALS_DATA.map((item, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={item.id}
                  className="w-full shrink-0 px-1 sm:px-2 py-2"
                  style={{ minWidth: '100%' }}
                >
                  <div
                    className={`relative rounded-[30px] md:rounded-[40px] p-8 sm:p-12 lg:p-14 border transition-all duration-300 ${
                      isActive
                        ? 'bg-white border-slate-200/90 shadow-xl'
                        : 'bg-white/60 border-slate-200/50 opacity-60'
                    }`}
                  >
                    {/* Top Meta Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[18px] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#3183FF] shrink-0">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-lg sm:text-xl font-normal text-slate-900 font-['Playfair_Display']">
                              {item.companyName}
                            </h3>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-[30px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" />
                              VERIFIED PARTNER
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{item.industry}</p>
                        </div>
                      </div>

                      {/* Quantifiable Business Outcome Highlight */}
                      <div className="sm:text-right bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-[20px] sm:rounded-none border sm:border-0 border-slate-100">
                        <p className="text-2xl sm:text-3xl font-light text-[#3183FF] font-['Playfair_Display']">
                          {item.outcomeMetric}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{item.outcomeLabel}</p>
                      </div>
                    </div>

                    {/* Testimonial Quote Prose */}
                    <div className="relative py-8 sm:py-10">
                      <Quote className="absolute -top-2 -left-2 w-16 h-16 text-slate-100 pointer-events-none select-none" />
                      <p className="relative z-10 text-lg sm:text-xl lg:text-2xl text-slate-800 font-light leading-relaxed font-['Plus_Jakarta_Sans'] italic">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Bottom Author Row & Star Ratings */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-medium text-slate-900 font-['Playfair_Display']">
                          {item.clientName}
                        </p>
                        <p className="text-xs text-slate-500 font-light mt-0.5">
                          {item.role} · <span className="text-[#3183FF] font-medium">{item.serviceCategory}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, rIdx) => (
                          <Star key={rIdx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bullet Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleGoTo(idx)}
                className={`transition-all duration-300 rounded-[30px] cursor-pointer ${
                  isActive
                    ? 'w-8 h-2 bg-[#3183FF]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Go to testimonial by ${item.companyName}`}
                aria-label={`Slide to testimonial ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
