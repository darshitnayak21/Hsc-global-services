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
    id: 'bathala-group',
    name: 'Bathala Group',
    tagline: 'Diversified Business Group',
    industry: 'Infrastructure & Enterprise',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <circle cx="28" cy="22" r="10" fill="#f59e0b" />
        <path d="M28 8V4M28 36V40M14 22H10M46 22H42M18 12L15 9M38 32L41 35M18 32L15 35M38 12L41 9" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 36C18 30 26 30 32 36C38 31 44 31 50 36" stroke="#10b981" strokeWidth="3" fill="none" />
        <text x="60" y="24" fill="#0f172a" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">
          BATHALA
        </text>
        <text x="60" y="38" fill="#475569" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.1em">
          GROUP
        </text>
      </svg>
    ),
  },
  {
    id: 'hitek-park',
    name: 'Hitek Park',
    tagline: 'Close to Nature',
    industry: 'Green Infrastructure',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <path d="M22 34C22 24 30 14 36 12C36 20 32 30 22 34Z" fill="#10b981" />
        <path d="M28 34C28 26 34 18 42 16C40 24 36 30 28 34Z" fill="#059669" />
        <text x="50" y="24" fill="#065f46" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">
          HITEK PARK
        </text>
        <text x="50" y="36" fill="#10b981" fontSize="9" fontWeight="600" fontStyle="italic" fontFamily="Plus Jakarta Sans, sans-serif">
          Close to Nature
        </text>
      </svg>
    ),
  },
  {
    id: 'triochi-concepts',
    name: 'Triochi Concepts',
    tagline: 'Strategic Design & Concepts',
    industry: 'Creative & Digital Solutions',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <polygon points="24,10 14,28 34,28" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        <polygon points="24,16 18,26 30,26" fill="#ef4444" opacity="0.3" />
        <text x="46" y="23" fill="#dc2626" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.1em">
          TRIOCHI
        </text>
        <text x="46" y="36" fill="#475569" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.15em">
          CONCEPTS
        </text>
      </svg>
    ),
  },
  {
    id: 'vanmayi-technologies',
    name: 'Vanmayi Technologies',
    tagline: 'Technical Innovation Systems',
    industry: 'Software & Technology',
    logo: (
      <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <path d="M12 24L24 12L36 24M16 28L24 20L32 28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="25" r="2.5" fill="#ef4444" />
        <text x="44" y="22" fill="#0f172a" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
          Vanmayi
        </text>
        <text x="44" y="35" fill="#475569" fontSize="9" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
          Technologies
        </text>
      </svg>
    ),
  },
  {
    id: 'wincor-nixdorf',
    name: 'Wincor Nixdorf',
    tagline: 'Retail & Banking IT Systems',
    industry: 'Enterprise IT Hardware & Banking',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <rect x="12" y="8" width="136" height="4" fill="#dc2626" rx="2" />
        <text x="12" y="27" fill="#0f172a" fontSize="14" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.05em">
          WINCOR
        </text>
        <text x="12" y="42" fill="#334155" fontSize="13" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.08em">
          NIXDORF
        </text>
      </svg>
    ),
  },
  {
    id: 'elite-confex',
    name: 'Elite Confex',
    tagline: 'Elite International Confex',
    industry: 'Events & Global Conferences',
    logo: (
      <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <circle cx="24" cy="24" r="14" stroke="#007bff" strokeWidth="2" fill="none" />
        <path d="M14 24C14 18 20 14 26 14C32 14 36 20 36 26" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
        <text x="46" y="23" fill="#0f172a" fontSize="13" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.1em">
          ELITE
        </text>
        <text x="46" y="35" fill="#007bff" fontSize="8" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.1em">
          INTERNATIONAL CONFEX
        </text>
      </svg>
    ),
  },
];

interface ClientLogoGridProps {
  onClientClick?: (clientId: string) => void;
  showDetails?: boolean;
}

export const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({
  onClientClick,
  showDetails = false,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
      {VERIFIED_CLIENTS.map((client) => (
        <div
          key={client.id}
          onClick={() => onClientClick?.(client.id)}
          className={`flex flex-col items-center justify-center p-6 rounded-[30px] bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md shadow-xs transition-all duration-200 group text-center ${
            onClientClick ? 'cursor-pointer' : ''
          }`}
          title={`${client.name} - ${client.industry}`}
        >
          <div className="opacity-90 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:scale-105">
            {client.logo}
          </div>

          {showDetails && (
            <div className="mt-4 pt-3 border-t border-slate-100 w-full text-center">
              <span className="text-xs font-semibold text-slate-900 block truncate font-['Plus_Jakarta_Sans']">
                {client.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block truncate mt-0.5">
                {client.industry}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
