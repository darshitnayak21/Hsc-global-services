import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../components/DarkHeader';
import {
  ArrowRight, Briefcase, CheckCircle2, Clock, Code2, Coffee, FileText,
  GraduationCap, Heart, Laptop, MapPin, Send, Sparkles, Users, X,
} from 'lucide-react';
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  FloatingElement,
  motion,
  AnimatePresence,
} from '../components/MotionTransitions';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

const jobs = [
  {
    id: 'fullstack-senior',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Kukatpally, Hyderabad',
    type: 'Full-time',
    experience: 'Senior Level',
    description: 'Architect and deploy high-performance web applications using React, Next.js, Node.js, and containerized microservices for enterprise client projects.',
    skills: ['React / Next.js', 'Node.js / TypeScript', 'PostgreSQL', 'Docker / K8s', 'AWS'],
    icon: Code2,
  },
  {
    id: 'cloud-devops',
    title: 'Cloud DevOps Architect',
    department: 'Infrastructure',
    location: 'Kukatpally, Hyderabad',
    type: 'Full-time',
    experience: 'Senior Level',
    description: 'Design automated multi-cloud CI/CD pipelines, manage container clusters, enforce security postures, and maintain reliable infrastructure operations.',
    skills: ['AWS / GCP', 'Terraform', 'Kubernetes', 'CI/CD Pipelines', 'Linux Security'],
    icon: Briefcase,
  },
  {
    id: 'lead-uiux',
    title: 'UI/UX Product Designer',
    department: 'Design Studio',
    location: 'Kukatpally, Hyderabad',
    type: 'Full-time',
    experience: 'Mid-Senior Level',
    description: 'Create component-driven enterprise design systems, build interactive high-fidelity prototypes, and ensure crisp developer handoffs for web products.',
    skills: ['Figma', 'Design Systems', 'Micro-interactions', 'User Research', 'Prototyping'],
    icon: Sparkles,
  },
  {
    id: 'growth-seo-specialist',
    title: 'SEO & Growth Strategist',
    department: 'Digital Marketing',
    location: 'Kukatpally, Hyderabad',
    type: 'Full-time',
    experience: 'Mid-Senior Level',
    description: 'Direct technical on-page and off-page organic acquisition funnels, oversee backlink equity campaigns, and conduct conversion analytics for partner brands.',
    skills: ['Technical SEO', 'GA4 & BigQuery', 'Ahrefs / Semrush', 'Content Funnels', 'CRO'],
    icon: Send,
  },
];

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onGetInTouch }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantResumeName, setApplicantResumeName] = useState('');
  const [applicantResumeData, setApplicantResumeData] = useState<string>('');
  const [applicantRole, setApplicantRole] = useState('Senior Full-Stack Engineer');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [applicationReceipt, setApplicationReceipt] = useState<{ id: string; destination: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantPortfolio('');
    setApplicantResumeName('');
    setApplicantResumeData('');
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setApplicationReceipt(null);
    setErrors({});
  };

  useEffect(() => {
    if (!selectedJob) return;
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const elements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!elements.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [selectedJob]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!applicantName.trim()) next.name = 'Please enter your full name';
    if (!applicantEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail.trim())) {
      next.email = 'Please enter a valid email address';
    }
    const digits = applicantPhone.replace(/\D/g, '');
    if (!applicantPhone.trim()) next.phone = 'Please enter your contact phone number';
    else if (digits.length < 7) next.phone = 'Please enter a valid phone number (at least 7 digits)';
    if (!applicantPortfolio.trim()) next.portfolio = 'Please provide your GitHub, LinkedIn, or portfolio link';
    if (errors.resume) next.resume = errors.resume;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: applicantName.trim(),
          email: applicantEmail.trim(),
          phone: applicantPhone.trim(),
          position: applicantRole,
          portfolio: applicantPortfolio.trim(),
          resumeFileName: applicantResumeName || null,
          resumeBase64: applicantResumeData || null,
        }),
      });

      let data: any = null;
      try {
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch {
        data = null;
      }

      if (!response.ok || !data?.success) {
        const defaultMsg =
          response.status === 503 || response.status === 502
            ? 'Recruitment email service is not configured. Please set GOOGLE_APPS_SCRIPT_URL to a valid deployed Web App URL.'
            : 'The recruitment dispatch service could not complete the request. Please contact hscglobalenterprises5@gmail.com directly or try again later.';
        throw new Error(data?.error || defaultMsg);
      }

      setApplicationReceipt({
        id: data.applicationId || `APP-${Date.now()}`,
        destination: data.dispatchedTo || 'hscglobalenterprises5@gmail.com',
      });
      setSubmitted(true);
    } catch (err: any) {
      console.warn('Application submission notice:', err?.message || err);
      setSubmitError(err.message || 'Unable to connect to recruitment server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRoles = () => {
    document.getElementById('current-opportunities')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative z-10 overflow-hidden bg-[#050b17] text-white">
      {/* Full-width hero with workplace photography */}
      <section className="relative isolate flex min-h-[570px] items-center overflow-hidden sm:min-h-[640px]">
        <motion.div
          aria-hidden="true"
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/CARRER.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#030914] via-[#04111f]/90 to-[#04111f]/45" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050b17] via-transparent to-[#050b17]/25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(34,211,238,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <MotionReveal duration={0.7} distance={25} blur className="max-w-3xl">
            <FloatingElement distance={4} duration={5} className="inline-block mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 backdrop-blur shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Join Our Hyderabad Engineering Hub
              </div>
            </FloatingElement>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build Your Career<br />
              With <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300 bg-clip-text text-transparent">Purpose</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Grow with HSC Global Services. Work alongside curious minds, solve meaningful technology challenges, and help build digital experiences that make a difference.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={scrollToRoles} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer">
                Explore Open Roles <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" aria-hidden="true" /> Meaningful projects</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" aria-hidden="true" /> Learning and growth</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" aria-hidden="true" /> Collaborative culture</span>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Environment built for creators — image-backed cards */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(34,211,238,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.10)_1px,transparent_1px)] [background-size:50px_50px]" />
        <div className="mx-auto max-w-7xl">
          <MotionReveal duration={0.7} distance={20} blur>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Why build your career at HSC?</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">An environment built for <span className="text-cyan-300">creators</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Designed for engineers, designers, and innovators to build transformative digital products with high autonomy.</p>
            </div>
          </MotionReveal>

          <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                number: '01', label: 'Architecture', icon: Laptop,
                title: 'Modern Software Development',
                desc: 'Work with modern tech stacks, structured workflows, clean code standards, and agile sprint delivery.',
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85',
              },
              {
                number: '02', label: 'Campus', icon: Coffee,
                title: 'Hyderabad Engineering Tech Hub',
                desc: 'Centrally located delivery facility in Kukatpally, Hyderabad with active team collaboration.',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
              },
              {
                number: '03', label: 'Mastery', icon: GraduationCap,
                title: 'Continuous Learning & Skill Growth',
                desc: 'Architecture reviews, tech workshops, mentorship, and continuous skill progression opportunities.',
                image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85',
              },
              {
                number: '04', label: 'People', icon: Heart,
                title: 'Supportive Inclusive Team Culture',
                desc: 'Supportive team dynamics, transparent recognition, work-life balance, and mutual respect.',
                image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.number} className="h-full">
                  <InteractiveCard hoverY={-8} hoverScale={1.015} className="h-full">
                    <article className="group relative min-h-[370px] h-full overflow-hidden rounded-[30px] border border-white/60 bg-slate-900 p-3 shadow-xl shadow-black/20 hover:border-cyan-300/80 transition-all duration-300">
                      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: `url('${item.image}')` }} />
                      <div aria-hidden="true" className="absolute inset-0 bg-[#071321]/25" />
                      <div className="relative flex h-full min-h-[344px] flex-col rounded-[23px] border border-white/70 bg-white/[0.96] p-6 text-left shadow-lg backdrop-blur-sm">
                        <div className="mb-5 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{item.number} / {item.label}</span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                        </div>
                        <h3 className="text-2xl font-extrabold leading-[1.12] tracking-tight text-slate-950">{item.title}</h3>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{item.desc}</p>
                      </div>
                    </article>
                  </InteractiveCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Current opportunities — job cards */}
      <section id="current-opportunities" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <MotionReveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Current Opportunities</h2>
          </div>
        </MotionReveal>

        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {jobs.map((job) => (
            <StaggerItem key={job.id} className="h-full">
              <InteractiveCard hoverY={-5} className="h-full">
                <article
                  className="flex h-full flex-col items-center rounded-2xl border border-[#00D9F5]/30 hover:border-[#00D9F5] bg-[#071A2B]/90 hover:bg-[#0B2235] px-6 py-7 text-center shadow-lg hover:shadow-[0_15px_35px_rgba(0,217,245,0.12)] transition-all duration-300 group"
                >
                  <h3 className="min-h-[3.5rem] text-xl font-bold leading-7 tracking-tight text-white group-hover:text-[#00D9F5] transition-colors">{job.title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-6 text-slate-300">Location: {job.location}</p>
                  <p className="mt-1.5 text-sm sm:text-base leading-6 text-slate-300">Experience: {job.experience}</p>
                  <p className="mt-2 text-xs sm:text-sm leading-6 text-cyan-300 font-mono">Skills: {job.skills.join(', ')}</p>
                  <p className="mt-1.5 text-xs sm:text-sm leading-6 text-[#35DDB5] font-semibold">{job.department}</p>
                  <button
                    type="button"
                    onClick={() => { setApplicantRole(job.title); setSelectedJob(job.id); }}
                    className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 shadow-md shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    Apply for Role
                  </button>
                </article>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="mt-5 text-center text-xs leading-5 text-slate-400">Role details shown here are the current entries configured in this page. Confirm vacancies and hiring requirements before publishing.</p>
      </section>

      {/* Bottom opportunities banner */}
      <MotionReveal duration={0.8} distance={20} className="px-5 pb-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-[180px] max-w-7xl items-center rounded-[26px] border border-[#00D9F5]/40 bg-gradient-to-r from-[#071A2B] via-[#0B2235] to-[#071A2B] px-7 py-10 sm:px-10 lg:min-h-[220px] lg:px-16 shadow-xl">
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[40px]">
            Don’t miss new opportunities that match your skills and interests.
          </h2>
        </div>
      </MotionReveal>

      {/* Application modal: local-only behavior preserved */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="application-modal-title"
              aria-describedby="application-modal-description"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-2xl border border-slate-700 bg-[#090d1a] p-6 text-left shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button ref={closeBtnRef} type="button" onClick={handleCloseModal} aria-label="Close application form" className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"><X className="h-5 w-5" aria-hidden="true" /></button>
              <div className="pr-8">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Quick Application</span>
                <h2 id="application-modal-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">{applicantRole}</h2>
                <p id="application-modal-description" className="mt-2 text-sm text-slate-300">Kukatpally Delivery Center, Hyderabad.</p>
              </div>

              {submitted ? (
                <div className="space-y-4 py-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">Application Dispatched</h3>
                  <p className="mx-auto max-w-sm text-sm leading-6 text-slate-300">
                    Thank you, <strong className="text-white">{applicantName}</strong>. Your profile and resume for <span className="text-cyan-300 font-semibold">{applicantRole}</span> have been successfully transmitted to our recruitment team.
                  </p>
                  <div className="mx-auto max-w-md rounded-xl border border-cyan-500/25 bg-cyan-950/40 p-3.5 text-left text-xs font-mono text-cyan-200 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Application Reference:</span>
                      <span className="font-semibold text-white">{applicationReceipt?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recruitment Dispatch:</span>
                      <span className="text-cyan-300 truncate max-w-[220px]">{applicationReceipt?.destination}</span>
                    </div>
                    {applicantResumeName && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Resume Attached:</span>
                        <span className="text-emerald-300 truncate max-w-[220px]">{applicantResumeName}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs leading-5 text-slate-400">
                    Our technical recruitment team in Kukatpally, Hyderabad will evaluate your candidacy and get back to you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 px-7 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} noValidate className="space-y-4">
                  {submitError && (
                    <div role="alert" className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-200">
                      <p className="font-bold text-rose-300 mb-1">Submission Failed</p>
                      <p>{submitError}</p>
                      <p className="mt-2 text-slate-300">
                        You can also send your resume directly to{' '}
                        <a href="mailto:hscglobalenterprises5@gmail.com" className="text-cyan-300 underline font-semibold hover:text-cyan-200">
                          hscglobalenterprises5@gmail.com
                        </a>.
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="applicant-name" className="mb-1 block text-sm font-semibold text-slate-300">Full Name *</label>
                    <input
                      id="applicant-name"
                      name="applicantName"
                      type="text"
                      autoComplete="name"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'applicant-name-error' : undefined}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'}`}
                    />
                    {errors.name && <p id="applicant-name-error" role="alert" className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="applicant-email" className="mb-1 block text-sm font-semibold text-slate-300">Email Address *</label>
                      <input
                        id="applicant-email"
                        name="applicantEmail"
                        type="email"
                        autoComplete="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'applicant-email-error' : undefined}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${errors.email ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'}`}
                      />
                      {errors.email && <p id="applicant-email-error" role="alert" className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="applicant-phone" className="mb-1 block text-sm font-semibold text-slate-300">Contact Phone *</label>
                      <input
                        id="applicant-phone"
                        name="applicantPhone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'applicant-phone-error' : undefined}
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'}`}
                      />
                      {errors.phone && <p id="applicant-phone-error" role="alert" className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicant-portfolio" className="mb-1 block text-sm font-semibold text-slate-300">Portfolio or GitHub / LinkedIn URL *</label>
                    <input
                      id="applicant-portfolio"
                      name="applicantPortfolio"
                      type="text"
                      required
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      aria-invalid={Boolean(errors.portfolio)}
                      aria-describedby={errors.portfolio ? 'applicant-portfolio-error' : undefined}
                      placeholder="https://linkedin.com/in/your-profile"
                      className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${errors.portfolio ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'}`}
                    />
                    {errors.portfolio && <p id="applicant-portfolio-error" role="alert" className="mt-1 text-xs text-red-400">{errors.portfolio}</p>}
                  </div>

                  <div>
                    <label htmlFor="applicant-resume" className="mb-1 block text-sm font-semibold text-slate-300">Resume / CV Attachment (PDF or DOCX)</label>
                    <div className="flex items-center gap-3">
                      <label htmlFor="applicant-resume" className="flex min-w-0 flex-1 cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-400 transition hover:border-cyan-500/50">
                        <span className="truncate">{applicantResumeName || 'Upload resume to forward with application (Max 10MB)'}</span>
                        <FileText className="ml-2 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                      </label>
                      <input
                        id="applicant-resume"
                        name="applicantResume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 10 * 1024 * 1024) {
                            setErrors((prev) => ({ ...prev, resume: 'Please choose a file smaller than 10MB.' }));
                            e.currentTarget.value = '';
                            return;
                          }
                          setErrors((prev) => { const next = { ...prev }; delete next.resume; return next; });
                          setApplicantResumeName(file.name);

                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setApplicantResumeData(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      {applicantResumeName && (
                        <button
                          type="button"
                          onClick={() => {
                            setApplicantResumeName('');
                            setApplicantResumeData('');
                            const input = document.getElementById('applicant-resume') as HTMLInputElement | null;
                            if (input) input.value = '';
                          }}
                          className="px-2 text-xs text-slate-400 transition hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {errors.resume && <p role="alert" className="mt-1 text-xs text-red-400">{errors.resume}</p>}
                    <p className="mt-1 text-xs text-slate-500">Your attached resume will be securely transmitted directly to our recruitment inbox.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/15 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to Recruitment...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Candidate Profile</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
