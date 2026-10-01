import React from 'react';
import { PageId } from '../components/DarkHeader';
import {
  ShieldCheck,
  Building,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Cpu,
  Layers,
} from 'lucide-react';

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
        'Hscgolbalservices was established in Madhapur, Hyderabad with a dedicated mission to help regional and global businesses build, deploy, and scale digital products.',
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
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold">
            Our Heritage &amp; Vision
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Pioneering Engineering From{' '}
            <span className="text-cyan-400">
              Hyderabad’s Tech Corridor
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            Rooted in Madhapur since 2017, Hscgolbalservices combines disciplined engineering craftsmanship with cutting-edge digital growth solutions.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Hscgolbalservices Story
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Founded in Hyderabad, India's Silicon Corridor, Hscgolbalservices began with a clear commitment: enterprise software should be robust, scalable, and intuitive, while digital marketing must be guided by measurable data.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Over the years, we have grown into a dependable technological partner for companies across diverse industries. Our engineering teams solve architecture challenges, build resilient web platforms, and assemble high-performing developers on demand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/60">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-white">Code Quality &amp; Security</h4>
                  <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">Industry standard practices across all client codebases.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-white">Specialized Engineers</h4>
                  <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">Experienced developers, QA testers, and growth consultants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hyderabad Campus Highlight */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-8 border border-slate-800 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                Delivery Center
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Madhapur, Hyderabad</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Situated in Ayyappa Society, Mega Hills, Madhapur, our development facility is directly integrated into Hyderabad’s IT corridor, providing access to elite technical talent and continuous collaboration.
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs sm:text-sm font-mono text-slate-300">
              <div className="text-white font-semibold">CST Campus Coordinates:</div>
              <div>Plot No. 3-332, 333, G2, Road No. 17</div>
              <div>Madhapur, Hyderabad 500081</div>
              <div className="text-cyan-400 font-semibold pt-1">● Active Development Facility</div>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Chronology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Evolutionary Journey</h2>
            <p className="text-slate-300 text-base">Key phases defining our trajectory and technical expansion in Hyderabad.</p>
          </div>

          <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-32 space-y-10">
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-6 sm:pl-10 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-950 shadow-md group-hover:scale-125 transition-transform" />

                <div className="glass-card rounded-xl p-6 sm:p-7 border border-slate-800 bg-[#090d1a] hover:border-cyan-500/40 shadow-xl space-y-2.5 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg sm:text-xl font-mono font-bold text-cyan-400">
                      {m.year}
                    </span>
                    <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{m.title}</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-slate-800 bg-[#090d1a] shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Partner With Our Engineering Team?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Schedule a technical discovery session with our senior engineers and digital solutions architects in Hyderabad.
          </p>
          <div>
            <button
              onClick={onGetInTouch}
              className="btn-glow-pill inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 shadow-xl shadow-cyan-500/25 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
