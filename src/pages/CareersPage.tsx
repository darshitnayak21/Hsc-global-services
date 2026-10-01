import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../components/DarkHeader';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Code2,
  Coffee,
  Heart,
  Laptop,
  Send,
  X,
  FileText,
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onGetInTouch }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantResumeName, setApplicantResumeName] = useState('');
  const [applicantRole, setApplicantRole] = useState('Senior Full-Stack Engineer (React / Node)');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selectedJob) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleCloseModal();
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
  }, [selectedJob]);

  const jobs = [
    {
      id: 'fullstack-senior',
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Madhapur, Hyderabad',
      type: 'Full-time',
      experience: 'Senior Level',
      description:
        'Architect and deploy high-performance web applications using React, Next.js, Node.js, and containerized microservices for enterprise client projects.',
      skills: ['React / Next.js', 'Node.js / TypeScript', 'PostgreSQL', 'Docker / K8s', 'AWS'],
    },
    {
      id: 'cloud-devops',
      title: 'Cloud DevOps Architect',
      department: 'Infrastructure',
      location: 'Madhapur, Hyderabad',
      type: 'Full-time',
      experience: 'Senior Level',
      description:
        'Design automated multi-cloud CI/CD pipelines, manage container clusters, enforce security postures, and maintain reliable infrastructure operations.',
      skills: ['AWS / GCP', 'Terraform', 'Kubernetes', 'CI/CD Pipelines', 'Linux Security'],
    },
    {
      id: 'lead-uiux',
      title: 'UI/UX Product Designer',
      department: 'Design Studio',
      location: 'Madhapur, Hyderabad',
      type: 'Full-time',
      experience: 'Mid-Senior Level',
      description:
        'Create component-driven enterprise design systems, build interactive high-fidelity prototypes, and ensure crisp developer handoffs for web products.',
      skills: ['Figma', 'Design Systems', 'Micro-interactions', 'User Research', 'Prototyping'],
    },
    {
      id: 'growth-seo-specialist',
      title: 'SEO & Growth Strategist',
      department: 'Digital Marketing',
      location: 'Madhapur, Hyderabad',
      type: 'Full-time',
      experience: 'Mid-Senior Level',
      description:
        'Direct technical on-page and off-page organic acquisition funnels, oversee backlink equity campaigns, and conduct conversion analytics for partner brands.',
      skills: ['Technical SEO', 'GA4 & BigQuery', 'Ahrefs / Semrush', 'Content Funnels', 'CRO'],
    },
  ];

  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantPortfolio('');
    setApplicantResumeName('');
    setSubmitted(false);
    setErrors({});
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!applicantName.trim()) errs.name = 'Please enter your full name';
    if (!applicantEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    const digits = applicantPhone.replace(/\D/g, '');
    if (!applicantPhone.trim()) {
      errs.phone = 'Please enter your contact phone number';
    } else if (digits.length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits)';
    }
    if (!applicantPortfolio.trim()) {
      errs.portfolio = 'Please provide your GitHub, LinkedIn, or portfolio link';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
            Join Our Hyderabad Engineering Hub
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Build Meaningful Software at{' '}
            <span className="text-cyan-400">
              Hscgolbalservices
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            We are looking for passionate engineers, designers, and growth tacticians who thrive on clean code, mutual respect, and building transformative products.
          </p>
        </div>

        {/* Engineering Culture & Focus Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Laptop className="w-6 h-6 text-cyan-400" />,
              title: 'Modern Development',
              desc: 'Development using modern web technologies, structured workflows, and clean code standards.',
            },
            {
              icon: <Coffee className="w-6 h-6 text-teal-400" />,
              title: 'Madhapur Facility',
              desc: 'Centrally located delivery facility in Madhapur, Hyderabad with active team collaboration.',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
              title: 'Technical Growth',
              desc: 'Architecture reviews, hands-on engineering challenges, and technical problem solving.',
            },
            {
              icon: <Heart className="w-6 h-6 text-blue-400" />,
              title: 'Agile Collaboration',
              desc: 'Transparent project coordination, cross-functional teamwork, and focused sprint execution.',
            },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-6 sm:p-7 border border-slate-800 space-y-3.5 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="font-bold text-white text-lg sm:text-xl">{item.title}</h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Current Opportunities</h2>
              <p className="text-sm sm:text-base text-slate-300 mt-1">Madhapur Delivery Center, Hyderabad.</p>
            </div>
            <span className="text-xs sm:text-sm font-mono text-cyan-400 font-bold">Active Roles</span>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold">
                      {job.department}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {job.experience}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white">{job.title}</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-3 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 self-start md:self-center">
                  <button
                    onClick={() => {
                      setApplicantRole(job.title);
                      setSelectedJob(job.id);
                    }}
                    className="btn-glow-pill px-7 py-3 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-md shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Apply for Role
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleCloseModal}
          >
            <div
              ref={modalRef}
              className="w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-slate-800 bg-[#090d1a] shadow-2xl relative text-left space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                onClick={handleCloseModal}
                aria-label="Close form"
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Quick Application
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">{applicantRole}</h3>
                <p className="text-sm text-slate-300 mt-1">Madhapur Delivery Center, Hyderabad.</p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">Application Recorded</h4>
                  <p className="text-sm sm:text-base text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{applicantName}</strong>. Your profile for <span className="text-cyan-300">{applicantRole}</span> has been received locally.
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    Direct recruitment desk: <span className="text-cyan-400">careers@creativesolutiontech.in</span>
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1 font-semibold">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1 font-mono">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1 font-semibold">
                      Portfolio or GitHub / LinkedIn URL *
                    </label>
                    <input
                      type="text"
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      placeholder="https://github.com/your-handle or LinkedIn"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors ${
                        errors.portfolio ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.portfolio && <p className="text-xs text-red-400 mt-1 font-mono">{errors.portfolio}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-slate-300 uppercase mb-1 font-semibold">
                      Resume / CV Attachment (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-sm cursor-pointer hover:border-cyan-500/50 transition-colors">
                        <span className="truncate">
                          {applicantResumeName || 'Choose PDF / DOCX file (Max 5MB)'}
                        </span>
                        <FileText className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setApplicantResumeName(file.name);
                            }
                          }}
                        />
                      </label>
                      {applicantResumeName && (
                        <button
                          type="button"
                          onClick={() => setApplicantResumeName('')}
                          className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer px-2"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-glow-pill w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Submit Candidate Profile
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
