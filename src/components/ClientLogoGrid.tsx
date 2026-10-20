import React from 'react';

export interface ClientItem {
  id: string;
  name: string;
  tagline?: string;
  industry: string;
  logo: React.ReactNode;
}

export const VERIFIED_CLIENTS: ClientItem[] = [
  {
    id: 'creative-solution-tech',
    name: 'Creative Solution Tech',
    tagline: 'Cloud Architecture & IT Solutions',
    industry: 'Enterprise IT & Cloud Engineering',
    logo: (
      <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="30" height="30" rx="8" fill="#0284c7" />
        <path d="M18 25L24 19L32 27L28 31" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="20" r="3" fill="#38bdf8" />
        <text x="48" y="22" fill="#0f172a" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">CREATIVE</text>
        <text x="48" y="35" fill="#0284c7" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.08em">SOLUTION TECH</text>
      </svg>
    ),
  },
  {
    id: 'lt',
    name: 'L&T',
    tagline: 'Engineering & Global Infrastructure',
    industry: 'Engineering & Infrastructure',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="25" r="16" stroke="#004b87" strokeWidth="3" />
        <path d="M20 18V31H28M30 18H36M33 18V31" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="50" y="32" fill="#004b87" fontSize="22" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.1em">L&amp;T</text>
      </svg>
    ),
  },
  {
    id: 'appzon-technologies',
    name: 'Appzon Technologies Pvt. Ltd.',
    tagline: 'Enterprise Software & Mobility',
    industry: 'Software Development & Apps',
    logo: (
      <svg viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="28" height="28" rx="7" fill="url(#appzon-grad)" />
        <path d="M17 30L24 16L31 30M19 26H29" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="appzon-grad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <text x="46" y="22" fill="#0f172a" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">APPZON</text>
        <text x="46" y="34" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Technologies Pvt. Ltd.</text>
      </svg>
    ),
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    tagline: 'Enterprise Cloud & Workflow',
    industry: 'Cloud Computing & Digital Workflows',
    logo: (
      <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="25" r="14" fill="#293e40" />
        <path d="M18 25C18 21.6863 20.6863 19 24 19C27.3137 19 30 21.6863 30 25" stroke="#81b5a1" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="25" r="3.5" fill="#81b5a1" />
        <text x="46" y="30" fill="#293e40" fontSize="15" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="-0.02em">servicenow</text>
      </svg>
    ),
  },
  {
    id: 'anudys-technologies',
    name: 'Anudys Technologies Pvt. Ltd.',
    tagline: 'Digital Transformation Systems',
    industry: 'IT Consulting & Services',
    logo: (
      <svg viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 25C12 18.5 17.5 13 24 13C30.5 13 36 18.5 36 25C36 31.5 30.5 37 24 37C17.5 37 12 31.5 12 25Z" stroke="#0d9488" strokeWidth="2.5" />
        <path d="M18 25L24 19L30 25L24 31Z" fill="#14b8a6" />
        <text x="44" y="22" fill="#0f172a" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">ANUDYS</text>
        <text x="44" y="34" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Technologies Pvt. Ltd.</text>
      </svg>
    ),
  },
  {
    id: 'triochi-concepts',
    name: 'Triochi Concepts',
    tagline: 'Strategic Design & Concepts',
    industry: 'Creative & Digital Solutions',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="24,10 14,28 34,28" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        <polygon points="24,16 18,26 30,26" fill="#ef4444" opacity="0.3" />
        <text x="46" y="23" fill="#dc2626" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.1em">TRIOCHI</text>
        <text x="46" y="36" fill="#475569" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.15em">CONCEPTS</text>
      </svg>
    ),
  },
  {
    id: 'vanmayi-technologies',
    name: 'Vanmayi Technologies',
    tagline: 'Technical Innovation Systems',
    industry: 'Software & Technology',
    logo: (
      <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24L24 12L36 24M16 28L24 20L32 28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="25" r="2.5" fill="#ef4444" />
        <text x="44" y="22" fill="#0f172a" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">Vanmayi</text>
        <text x="44" y="35" fill="#475569" fontSize="9" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Technologies</text>
      </svg>
    ),
  },
  {
    id: 'creative-conferences',
    name: 'Creative Conferences',
    tagline: 'Global Conferences & Expos',
    industry: 'Conferences & Exhibitions',
    logo: (
      <svg viewBox="0 0 175 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" stroke="#f59e0b" strokeWidth="2" />
        <path d="M16 24C16 19 20 16 24 16C28 16 32 19 32 24" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="46" y="22" fill="#0f172a" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">CREATIVE</text>
        <text x="46" y="34" fill="#f59e0b" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.08em">CONFERENCES</text>
      </svg>
    ),
  },
  {
    id: 'stage-innovations',
    name: 'Stage Innovations',
    tagline: 'Digital Experience Platforms',
    industry: 'Innovation & Digital Media',
    logo: (
      <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="12" width="24" height="24" rx="6" fill="#8b5cf6" />
        <polygon points="20,18 20,30 30,24" fill="#ffffff" />
        <text x="44" y="22" fill="#0f172a" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">STAGE</text>
        <text x="44" y="34" fill="#8b5cf6" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.08em">INNOVATIONS</text>
      </svg>
    ),
  },
];


export const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({
  onClientClick,
}) => {
  const logoPath = CLIENT_LOGOS[client.id];

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="client-logo-track flex w-max items-center gap-5 sm:gap-7">
        {scrollingClients.map((client, index) => {
          const logoPath = CLIENT_LOGOS[client.id];

          return (
            <div
              key={`${client.id}-${index}`}
              onClick={() => onClientClick?.(client.id)}
              className="flex h-24 w-48 shrink-0 cursor-pointer
                items-center justify-center overflow-hidden
                rounded-xl border border-slate-200 bg-white p-4
                shadow-sm transition-shadow duration-300
                hover:shadow-lg sm:h-28 sm:w-56 sm:p-5"
            >
              {logoPath && (
                <img
                  src={logoPath}
                  alt={index < VERIFIED_CLIENTS.length
                    ? `${client.name} logo`
                    : ''}
                  aria-hidden={index >= VERIFIED_CLIENTS.length}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-contain object-center"
                />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .client-logo-track {
          animation: client-logo-scroll 36s linear infinite;
          will-change: transform;
        }

        .client-logo-track:hover {
          animation-play-state: paused;
        }

        @keyframes client-logo-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.625rem));
          }
        }

        @media (min-width: 640px) {
          @keyframes client-logo-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-50% - 0.875rem));
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .client-logo-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};


const CLIENT_LOGOS: Record<string, string> = {
  'creative-solution-tech': '/images/clients/creative-solution-tech-bg.webp.png',
  'lt': '/images/clients/lt-bg.webp.png',
  'appzon-technologies': '/images/clients/appzon-bg.webp.png',
  'servicenow': '/images/clients/servicenow-bg.webp.jpg',
  'anudys-technologies': '/images/clients/anudys-bg.webp.jpg',
  'triochi-concepts': '/images/clients/triochi-bg.webp.png',
  'vanmayi-technologies': '/images/clients/vanmayi-bg.webp.png',
  'creative-conferences': '/images/clients/creative-conferences-bg.webp.png',
  'stage-innovations': '/images/clients/stage-innovations-bg.webp.png',
};

export const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({
  onClientClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {VERIFIED_CLIENTS.map((client) => {
        const logoPath = CLIENT_LOGOS[client.id];

        return (
          <div
            key={client.id}
            onClick={() => onClientClick?.(client.id)}
            className="group flex h-32 w-full items-center justify-center
              overflow-hidden rounded-md border border-white/10
              bg-white p-4 shadow-sm transition-all duration-300
              hover:border-cyan-400/60 hover:shadow-lg"
          >
            {logoPath ? (
              <img
                src={logoPath}
                alt={`${client.name} logo`}
                loading="lazy"
                className="h-full w-full object-contain object-center"
              />
            ) : (
              <span className="text-sm text-slate-500">
                Logo unavailable
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
