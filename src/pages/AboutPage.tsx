import React from 'react';
import { PageId } from '../components/DarkHeader';
import {
  ShieldCheck,
  Building,
  Building2,
  Globe,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Clock,
  Activity,
  Rocket,
} from 'lucide-react';
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  FloatingElement,
  AnimatedCounter,
  motion,
} from '../components/MotionTransitions';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onGetInTouch: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onGetInTouch }) => {
  // Verified milestones strictly matching the CST evolutionary journey
  const verifiedMilestones = [
    {
      year: '2017',
      title: 'Company Foundation in Hyderabad',
      badge: 'Establishment',
      description:
        'HSC Global Services was established in Hyderabad with a dedicated mission to help regional and global businesses build, deploy, and scale digital products.',
    },
    {
      year: '2019',
      title: 'Expansion into Full-Stack Web & Cloud Infrastructure',
      badge: 'Engineering Scale',
      description:
        'Extended practice areas to include custom application development, cloud architectures, containerized environments, and enterprise API integrations.',
    },
    {
      year: '2021',
      title: 'IT Staffing & Placement Division',
      badge: 'Talent Network',
      description:
        'Launched dedicated IT talent staffing to bridge technical skill gaps, assembling senior frontend, backend, and DevOps engineers for client product companies.',
    },
    {
      year: '2023',
      title: 'Multi-Sector Client Collaborations',
      badge: 'Enterprise Growth',
      description:
        'Established long-term engineering partnerships across real estate, technology infrastructure, retail solutions, and digital publishing.',
    },
  ];

  // Guarantee that each milestone appears only once and filter out any invalid/empty entries
  const seenYears = new Set<string>();
  const milestones = verifiedMilestones.filter((m) => {
    if (!m || !m.year?.trim() || !m.title?.trim() || !m.description?.trim()) return false;
    const yearKey = m.year.trim();
    if (seenYears.has(yearKey)) return false;
    seenYears.add(yearKey);
    return true;
  });

  return (
    <div className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <MotionReveal duration={0.7} distance={20} blur>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <FloatingElement distance={4} duration={5} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#00D9F5]" />
                <span>Our Heritage &amp; Vision</span>
              </div>
            </FloatingElement>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Pioneering Engineering From{' '}
              <span className="text-[#35DDB5]">
                Hyderabad’s Tech Corridor
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-normal">
              Rooted in Hyderabad since 2017, HSC Global Services combines disciplined engineering craftsmanship with cutting-edge digital growth solutions.
            </p>
          </div>
        </MotionReveal>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <MotionReveal direction="left" distance={28} blur className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 sm:p-10 border border-[#00D9F5]/60 bg-[#071A2B]/90 space-y-6 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                The Hscgolbalservices Story
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Founded in Hyderabad, India's Silicon Corridor, Hscgolbalservices began with a clear commitment: enterprise software should be robust, scalable, and intuitive, while digital marketing must be guided by measurable data.
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Over the years, we have grown into a dependable technological partner for companies across diverse industries. Our engineering teams solve architecture challenges, build resilient web platforms, and assemble high-performing developers on demand.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#00D9F5]/20">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#00D9F5] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-bold text-white">Code Quality &amp; Security</h4>
                    <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">Industry standard practices across all client codebases.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#35DDB5] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-bold text-white">Specialized Engineers</h4>
                    <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">Experienced developers, QA testers, and growth consultants.</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Hyderabad Campus Highlight */}
          <MotionReveal direction="right" distance={28} blur className="lg:col-span-5">
            <InteractiveCard hoverY={-5} hoverScale={1.015}>
              <div className="glass-card rounded-2xl p-8 border border-[#00D9F5]/60 bg-[#071A2B]/90 space-y-5 shadow-sm hover:border-[#00D9F5] hover:shadow-[0_15px_35px_rgba(0,217,245,0.14)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#00D9F5]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-mono text-[#00D9F5] uppercase tracking-wider block font-semibold">
                    Delivery Center
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Kukatpally, Hyderabad</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Situated in Vivekananda Nagar Colony, Kukatpally, our development facility is integrated into Hyderabad’s premier tech ecosystem, providing access to elite technical talent and continuous collaboration.
                </p>
                <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#00D9F5]/25 space-y-2 text-xs sm:text-sm font-mono text-slate-300">
                  <div className="text-white font-semibold">Campus Coordinates:</div>
                  <div>Plot No 10, Anasuya Nilayam, Flat No 301</div>
                  <div>Vivekananda Nagar colony, Kukatpally, Hyderabad - 500072</div>
                  <div className="text-[#00D9F5] font-semibold pt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D9F5] animate-ping" />
                    <span>Active Development Facility</span>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </MotionReveal>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-10">
          <MotionReveal>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs sm:text-sm font-mono text-[#00D9F5] uppercase tracking-wider font-semibold">
                Chronology
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Evolutionary Journey</h2>
              <p className="text-slate-400 text-base">Key phases defining our trajectory and technical expansion in Hyderabad.</p>
            </div>
          </MotionReveal>

          <StaggerContainer staggerDelay={0.12} className="relative border-l border-[#00D9F5]/30 ml-4 sm:ml-32 space-y-10">
            {milestones.map((m) => (
              <StaggerItem key={m.year} direction="right" distance={18}>
                <div className="relative pl-6 sm:pl-10 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00D9F5] border-2 border-white shadow-[0_0_12px_rgba(0,217,245,0.6)] group-hover:scale-130 transition-transform duration-300" />

                  <InteractiveCard hoverY={-4}>
                    <div className="glass-card rounded-xl p-6 sm:p-7 border border-[#00D9F5]/60 bg-[#071A2B]/90 hover:border-[#00D9F5] hover:shadow-[0_12px_30px_rgba(0,217,245,0.12)] shadow-sm space-y-2.5 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-lg sm:text-xl font-mono font-bold text-[#00D9F5]">
                          {m.year}
                        </span>
                        <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-[#00D9F5]/10 text-[#35DDB5] border border-[#00D9F5]/25">
                          {m.badge}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00D9F5] transition-colors">{m.title}</h3>
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{m.description}</p>
                    </div>
                  </InteractiveCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Enterprise Performance Benchmarks (Big Cards from Picture) */}
        <div className="space-y-12 pt-4">
          <MotionReveal duration={0.7} distance={24} blur>
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <FloatingElement distance={3} duration={5} className="inline-block">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9F5]/10 border border-[#00D9F5]/25 text-[#35DDB5] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
                  <Activity className="w-3.5 h-3.5 text-[#00D9F5]" />
                  <span>Enterprise Performance Benchmarks</span>
                </div>
              </FloatingElement>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Measurable Standards.{' '}
                <span className="text-[#00D9F5]">
                  Uncompromising Delivery.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Our technology delivery model is anchored in verifiable operational SLAs, seasoned engineering craftsmanship, and continuous client delivery.
              </p>
            </div>
          </MotionReveal>

          {/* 4 Grand-Sized High-Impact Metric Cards (2x2 Grid) */}
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: 99.8% Uptime SLA */}
            <StaggerItem>
              <InteractiveCard hoverY={-8} className="h-full">
                <div className="group relative rounded-[32px] p-8 sm:p-10 flex flex-col justify-between h-full min-h-[440px] bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/50 hover:border-[#00D9F5] hover:bg-[#0B2235] shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(0,217,245,0.2)] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#00D9F5] to-transparent pointer-events-none" />

                  <div>
                    {/* Header with Icon, Category & Status */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 flex items-center justify-center text-[#00D9F5] group-hover:scale-110 group-hover:border-[#00D9F5] shadow-inner transition-all duration-300">
                        <Server className="w-8 h-8" />
                      </div>
                      <span className="text-xs sm:text-sm font-mono px-3.5 py-1 rounded-full bg-[#00D9F5]/10 text-[#00D9F5] border border-[#00D9F5]/25 font-semibold">
                        High Availability SLA
                      </span>
                    </div>

                    {/* Big Metric Display */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#00D9F5] font-mono tracking-tight flex items-baseline">
                      <AnimatedCounter value={99} suffix=".8%" />
                    </div>

                    {/* Title & Tag */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mt-3 mb-1 group-hover:text-[#00D9F5] transition-colors">
                      Uptime SLA
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#35DDB5] uppercase tracking-wider font-semibold mb-4">
                      Mission-Critical Platform Reliability
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      Guaranteed operational resilience across all deployed applications, cloud platforms, and microservices through multi-zone redundancy, automated failover, and sub-second health monitors.
                    </p>

                    {/* Spec Bullets */}
                    <div className="space-y-3 pt-4 border-t border-[#00D9F5]/15">
                      {[
                        'Multi-region cluster redundancy & load balancing',
                        'Sub-minute MTTR & automated self-healing',
                        'Real-time synthetic health monitoring & alerts',
                        'Contractually backed enterprise availability SLA',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#00D9F5] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-auto flex items-center justify-between text-xs sm:text-sm font-mono text-cyan-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00D9F5] animate-pulse" />
                      <span>Active Telemetry</span>
                    </span>
                    <span className="font-bold text-white">99.8% Availability Threshold</span>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>

            {/* Card 2: 50+ Client Deployments */}
            <StaggerItem>
              <InteractiveCard hoverY={-8} className="h-full">
                <div className="group relative rounded-[32px] p-8 sm:p-10 flex flex-col justify-between h-full min-h-[440px] bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/50 hover:border-[#00D9F5] hover:bg-[#0B2235] shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(0,217,245,0.2)] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#35DDB5] to-transparent pointer-events-none" />

                  <div>
                    {/* Header with Icon, Category & Status */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#35DDB5]/10 border border-[#35DDB5]/25 flex items-center justify-center text-[#35DDB5] group-hover:scale-110 group-hover:border-[#35DDB5] shadow-inner transition-all duration-300">
                        <Rocket className="w-8 h-8" />
                      </div>
                      <span className="text-xs sm:text-sm font-mono px-3.5 py-1 rounded-full bg-[#35DDB5]/10 text-[#35DDB5] border border-[#35DDB5]/25 font-semibold">
                        Production Releases
                      </span>
                    </div>

                    {/* Big Metric Display */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#35DDB5] font-mono tracking-tight flex items-baseline">
                      <AnimatedCounter value={50} suffix="+" />
                    </div>

                    {/* Title & Tag */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mt-3 mb-1 group-hover:text-[#35DDB5] transition-colors">
                      Client Deployments
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#00D9F5] uppercase tracking-wider font-semibold mb-4">
                      Commercial Software Solutions Launched
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      Delivered high-impact solutions across technology, real estate, retail platforms, SaaS startups, and digital publication engines with strict adherence to timelines and scope.
                    </p>

                    {/* Spec Bullets */}
                    <div className="space-y-3 pt-4 border-t border-[#00D9F5]/15">
                      {[
                        'Full-lifecycle discovery, UX, build & cloud deployment',
                        'Modern React 19, Next.js & Node.js microservices',
                        'Multi-tenant enterprise databases & secured APIs',
                        'Zero-downtime CI/CD automated deployment pipelines',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#35DDB5] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-auto flex items-center justify-between text-xs sm:text-sm font-mono text-[#35DDB5]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#35DDB5] animate-pulse" />
                      <span>100% Production Verified</span>
                    </span>
                    <span className="font-bold text-white">Global & Regional Footprint</span>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>

            {/* Card 3: 8+ Yrs Engineering Depth */}
            <StaggerItem>
              <InteractiveCard hoverY={-8} className="h-full">
                <div className="group relative rounded-[32px] p-8 sm:p-10 flex flex-col justify-between h-full min-h-[440px] bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/50 hover:border-[#00D9F5] hover:bg-[#0B2235] shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(0,217,245,0.2)] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#00D9F5] to-transparent pointer-events-none" />

                  <div>
                    {/* Header with Icon, Category & Status */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#00D9F5]/10 border border-[#00D9F5]/25 flex items-center justify-center text-[#00D9F5] group-hover:scale-110 group-hover:border-[#00D9F5] shadow-inner transition-all duration-300">
                        <Cpu className="w-8 h-8" />
                      </div>
                      <span className="text-xs sm:text-sm font-mono px-3.5 py-1 rounded-full bg-[#00D9F5]/10 text-[#00D9F5] border border-[#00D9F5]/25 font-semibold">
                        Hyderabad Heritage
                      </span>
                    </div>

                    {/* Big Metric Display */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#00D9F5] font-mono tracking-tight flex items-baseline">
                      <AnimatedCounter value={8} suffix="+ Yrs" />
                    </div>

                    {/* Title & Tag */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mt-3 mb-1 group-hover:text-[#00D9F5] transition-colors">
                      Engineering Depth
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#35DDB5] uppercase tracking-wider font-semibold mb-4">
                      Technical Mastery Rooted in Hyderabad Since 2017
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      Over eight years of continuous software engineering excellence based in Hyderabad’s tech corridor, cultivating high-caliber developers, rigorous architecture reviews, and scalable systems.
                    </p>

                    {/* Spec Bullets */}
                    <div className="space-y-3 pt-4 border-t border-[#00D9F5]/15">
                      {[
                        'Senior full-stack architects, DevOps & QA leads',
                        'Strict code standards, automated linting & test gates',
                        'Deep domain mastery across cloud, web & data',
                        'Centrally located in Kukatpally IT corridor facility',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#00D9F5] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-auto flex items-center justify-between text-xs sm:text-sm font-mono text-cyan-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00D9F5] animate-pulse" />
                      <span>Established 2017</span>
                    </span>
                    <span className="font-bold text-white">Hyderabad Tech Corridor Hub</span>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>

            {/* Card 4: 24/7 Agile Support */}
            <StaggerItem>
              <InteractiveCard hoverY={-8} className="h-full">
                <div className="group relative rounded-[32px] p-8 sm:p-10 flex flex-col justify-between h-full min-h-[440px] bg-[#071A2B]/95 backdrop-blur-xl border border-[#00D9F5]/50 hover:border-[#00D9F5] hover:bg-[#0B2235] shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(0,217,245,0.2)] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#35DDB5] to-transparent pointer-events-none" />

                  <div>
                    {/* Header with Icon, Category & Status */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#35DDB5]/10 border border-[#35DDB5]/25 flex items-center justify-center text-[#35DDB5] group-hover:scale-110 group-hover:border-[#35DDB5] shadow-inner transition-all duration-300">
                        <Clock className="w-8 h-8" />
                      </div>
                      <span className="text-xs sm:text-sm font-mono px-3.5 py-1 rounded-full bg-[#35DDB5]/10 text-[#35DDB5] border border-[#35DDB5]/25 font-semibold">
                        Continuous Operations
                      </span>
                    </div>

                    {/* Big Metric Display */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#35DDB5] font-mono tracking-tight flex items-baseline">
                      <span>24/7</span>
                    </div>

                    {/* Title & Tag */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mt-3 mb-1 group-hover:text-[#35DDB5] transition-colors">
                      Agile Support
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#00D9F5] uppercase tracking-wider font-semibold mb-4">
                      Round-the-Clock Operational Vigilance
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      Continuous operational oversight, rapid incident response, ongoing performance optimization, and direct developer communication channels to keep your business running smoothly.
                    </p>

                    {/* Spec Bullets */}
                    <div className="space-y-3 pt-4 border-t border-[#00D9F5]/15">
                      {[
                        '24/7 proactive system telemetry & automated alerts',
                        'Rapid SLA response times for mission-critical events',
                        'Direct communication channels to dedicated engineers',
                        'Continuous security patching & dependencies audits',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#35DDB5] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-auto flex items-center justify-between text-xs sm:text-sm font-mono text-[#35DDB5]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#35DDB5] animate-pulse" />
                      <span>Always Accessible</span>
                    </span>
                    <span className="font-bold text-white">Rapid Response SLA Protocol</span>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Next-Step Consultation Section */}
        <MotionReveal duration={0.8} distance={20} blur>
          <section
            aria-labelledby="about-consultation-heading"
            className="relative isolate overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#00D9F5]/35 bg-gradient-to-b from-[#061826] via-[#040e18] to-[#02070f] px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
          >
            {/* Ambient top spotlight glow with gentle pulse */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[550px] sm:w-[750px] h-[300px] sm:h-[400px] bg-gradient-to-b from-[#00D9F5]/25 via-[#35DDB5]/15 to-transparent blur-[90px] pointer-events-none rounded-full animate-pulse-glow"
            />

            <div className="relative mx-auto max-w-4xl space-y-6 sm:space-y-8">
              <FloatingElement distance={3} duration={6} className="inline-block">
                <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.28em] text-[#35DDB5]">
                  NEXT-STEP CONSULTATION
                </p>
              </FloatingElement>

              <h2
                id="about-consultation-heading"
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              >
                Let's Build Something That
                <br />
                Moves Your Business Forward.
              </h2>

              <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
                Connect with our engineering leadership in Hyderabad to explore technical architectures, cloud modernization, or dedicated developer pods.
              </p>

              <div className="pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={onGetInTouch}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#00D9F5] to-[#35DDB5] px-8 sm:px-10 py-4 text-base font-bold text-slate-950 shadow-[0_12px_32px_rgba(0,217,245,0.32)] transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_20px_45px_rgba(0,217,245,0.48)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300 cursor-pointer"
                >
                  <span>Schedule a Discovery Session</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              <p className="pt-4 sm:pt-6 text-xs sm:text-sm font-mono text-slate-400">
                Plot No 10, Vivekananda Nagar Colony, Kukatpally, Hyderabad · Direct Technical Inquiries
              </p>
            </div>
          </section>
        </MotionReveal>
      </div>
    </div>
  );
};
