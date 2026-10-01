export type ServiceCategoryId = 'all' | 'web' | 'marketing' | 'staffing';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
}

export interface CSTService {
  id: string;
  category: 'web' | 'marketing' | 'staffing';
  categoryLabel: string;
  title: string;
  summary: string;
  description: string;
  capabilities: string[];
  ctaText?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'all', label: 'All Services' },
  { id: 'web', label: 'Web & Cloud' },
  { id: 'marketing', label: 'Digital Marketing & SEO' },
  { id: 'staffing', label: 'IT Staffing' },
];

export const CST_SERVICES: CSTService[] = [
  // WEB & CLOUD
  {
    id: 'web-design-hosting',
    category: 'web',
    categoryLabel: 'WEB & CLOUD',
    title: 'Web Design & Hosting',
    summary: 'Modern websites and reliable hosting solutions designed for growing businesses.',
    description:
      'Websites planned around user needs and built with modern technologies, ultra-fast performance, and reliable cloud hosting.',
    capabilities: [
      'Web design & development',
      'Responsive user experiences',
      'Hosting solutions & CDN delivery',
      'Website maintenance & support',
    ],
    ctaText: "Let's discuss your project",
  },
  {
    id: 'web-technologies-consulting',
    category: 'web',
    categoryLabel: 'WEB & CLOUD',
    title: 'Web Technologies & Consulting',
    summary: 'Future-proofing your enterprise infrastructure and digital technology stack.',
    description:
      'We assess your IT needs, plan a future-proof strategy, and guide implementation with modern cloud architectures and reliable security.',
    capabilities: [
      'Enterprise IT architecture reviews',
      'Cloud infrastructure planning',
      'System modernisation & API integration',
      'Security & DevOps consultation',
    ],
    ctaText: "Let's discuss your project",
  },
  {
    id: 'cloud-infrastructure-qa',
    category: 'web',
    categoryLabel: 'WEB & CLOUD',
    title: 'Cloud Infrastructure & QA',
    summary: 'High-availability cloud hosting, deployment pipelines, and continuous reliability.',
    description:
      'Maintain continuous reliability with cloud server infrastructure, automated quality assurance regression suites, and enterprise uptime protocols.',
    capabilities: [
      'High-availability cloud hosting',
      'Continuous CI/CD deployment pipelines',
      'Automated quality assurance & regression suites',
      'Performance & uptime monitoring',
    ],
    ctaText: "Let's discuss your project",
  },

  // DIGITAL MARKETING & SEO
  {
    id: 'digital-marketing-seo',
    category: 'marketing',
    categoryLabel: 'DIGITAL MARKETING & SEO',
    title: 'Digital Marketing & SEO',
    summary: 'Performance acquisition engineered to scale high-intent organic and paid pipelines.',
    description:
      'Social, email, content, SEO, and paid advertising brought together into one unified strategy to maximize customer acquisition.',
    capabilities: [
      'Technical & on-page SEO',
      'Search engine authority & backlinks',
      'Performance advertising campaigns',
      'Conversion tracking & marketing analytics',
    ],
    ctaText: "Let's discuss your project",
  },
  {
    id: 'seo-backlinks',
    category: 'marketing',
    categoryLabel: 'DIGITAL MARKETING & SEO',
    title: 'SEO & Backlinks',
    summary: 'Long-term search visibility driven by algorithmic compliance and authority.',
    description:
      'On-site optimization paired with credible backlink building, ensuring search engines recognize your web properties as authoritative industry leaders.',
    capabilities: [
      'Domain authority & technical audits',
      'Editorial outreach & link acquisition',
      'Core Web Vitals optimization',
      'Competitor gap & keyword research',
    ],
    ctaText: "Let's discuss your project",
  },
  {
    id: 'marketing-analysis-roi',
    category: 'marketing',
    categoryLabel: 'DIGITAL MARKETING & SEO',
    title: 'Marketing Analysis & ROI Optimization',
    summary: 'Transforming campaign telemetry into decisive commercial advantages.',
    description:
      'We study market trends, customer behaviour, and conversion funnels to guide decisions and improve marketing ROI across all channels.',
    capabilities: [
      'Customer journey & funnel analysis',
      'Multi-channel marketing attribution',
      'Conversion rate optimization',
      'Performance telemetry & reporting',
    ],
    ctaText: "Let's discuss your project",
  },

  // IT STAFFING
  {
    id: 'staffing-solutions',
    category: 'staffing',
    categoryLabel: 'IT STAFFING',
    title: 'Staffing Solutions',
    summary: 'Vetted engineering talent deployed to accelerate roadmap execution.',
    description:
      'Designers, developers, and QA engineers assembled on-demand from our Hyderabad delivery center for your full-lifecycle software builds.',
    capabilities: [
      'Dedicated developer pods',
      'Vetted senior software engineers',
      'Flexible staff augmentation models',
      'Direct workflow & sprint integration',
    ],
    ctaText: "Let's discuss your project",
  },
];

// Concise selection for the Homepage (6 primary services representing each category)
export const HOMEPAGE_SERVICES: CSTService[] = [
  CST_SERVICES[0], // Web Design & Hosting
  CST_SERVICES[1], // Web Technologies & Consulting
  CST_SERVICES[2], // Cloud Infrastructure & QA
  CST_SERVICES[3], // Digital Marketing & SEO
  CST_SERVICES[4], // SEO & Backlinks
  CST_SERVICES[6], // Staffing Solutions
];

export const getServiceById = (id: string): CSTService | undefined => {
  return CST_SERVICES.find((s) => s.id === id);
};
