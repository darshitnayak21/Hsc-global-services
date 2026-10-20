
export type ServiceCategoryId = 'all' | 'engineering' | 'enterprise';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
}

export interface CSTService {
  id: string;
  category: ServiceCategoryId;
  categoryLabel: string;
  title: string;
  summary: string;
  description: string;
  capabilities: string[];
  ctaText?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'all', label: 'All Services' },
  { id: 'engineering', label: 'Software & Cloud' },
  { id: 'enterprise', label: 'Enterprise & Systems' },
];

// ➡️ NEW SERVICES FIRST, followed by your existing services
export const CST_SERVICES: CSTService[] = [
  // 1. NEW: IT Recruitment
  {
    id: 'it-recruitment',
    category: 'enterprise',
    categoryLabel: 'TALENT & RECRUITMENT',
    title: 'IT Recruitment',
    summary:
      'Connect with technology professionals whose skills match your business needs.',
    description:
      'IT recruitment helps organizations identify and hire suitable technology professionals for their technical and business requirements.',
    capabilities: [
      'Technical talent sourcing and candidate screening',
      'Role-based skill and experience assessment',
      'Candidate shortlisting and interview coordination',
    ],
    ctaText: "Let's discuss your hiring needs",
  },

  // 2. NEW: Staffing
  {
    id: 'staffing',
    category: 'enterprise',
    categoryLabel: 'TALENT & STAFFING',
    title: 'Staffing',
    summary:
      'Find suitable professionals to support your project and workforce requirements.',
    description:
      'Staffing services help businesses identify suitable professionals based on required skills, experience, project needs, and team requirements.',
    capabilities: [
      'Technical and IT staffing support',
      'Candidate matching for project requirements',
      'Workforce planning and staffing coordination',
    ],
    ctaText: "Let's discuss your staffing needs",
  },

  // 3. NEW: Training & Placement
  {
    id: 'training-placement',
    category: 'enterprise',
    categoryLabel: 'TRAINING & CAREER DEVELOPMENT',
    title: 'Training & Placement',
    summary:
      'Support skill development and career readiness through technical training.',
    description:
      'Training and placement services focus on developing job-relevant technical skills and helping candidates prepare for employment opportunities.',
    capabilities: [
      'Technical skills development',
      'Practical learning and interview preparation',
      'Career guidance and placement assistance',
    ],
    ctaText: "Let's discuss training opportunities",
  },

  // 4. EXISTING: Cyber Security
  {
    id: 'cyber-security',
    category: 'enterprise',
    categoryLabel: 'SECURITY & GOVERNANCE',
    title: 'Cyber Security',
    summary:
      'Comprehensive defensive architectures, automated vulnerability scanning, and proactive threat mitigation.',
    description:
      'Cybersecurity services help protect computer systems, networks, devices, and sensitive corporate data from unauthorized breaches, ransomware, and digital threats.',
    capabilities: [
      'Comprehensive vulnerability assessments & pen testing',
      'Zero-Trust network architecture & IAM implementation',
      'SOC 2, ISO 27001 & GDPR regulatory compliance audits',
      '24/7 incident response, threat detection & monitoring',
    ],
    ctaText: "Let's secure your infrastructure",
  },

  // 5. EXISTING: Software Development
  {
    id: 'software-development',
    category: 'engineering',
    categoryLabel: 'CUSTOM ENGINEERING',
    title: 'Software Development',
    summary:
      'Custom enterprise web platforms, robust APIs, and microservices built for scalability.',
    description:
      'Application development, also known as custom software development or app engineering, builds resilient, scalable systems that power business-critical workflows.',
    capabilities: [
      'Custom enterprise web applications & portals',
      'Microservices & distributed cloud backends',
      'High-throughput RESTful & GraphQL API ecosystems',
      'Legacy software modernization & refactoring',
    ],
    ctaText: "Let's build your software",
  },

  // 6. EXISTING: Mobile Development
  {
    id: 'mobile-development',
    category: 'engineering',
    categoryLabel: 'MOBILE APPS',
    title: 'Mobile development',
    summary:
      'Fluid cross-platform and native iOS & Android applications with offline capability and intuitive UX.',
    description:
      'Mobile development is a dynamic field that evolves rapidly due to mobile devices, delivering high-performance native iOS, Android, and cross-platform apps.',
    capabilities: [
      'Cross-platform iOS & Android apps (React Native / Flutter)',
      'Native Swift and Kotlin high-performance modules',
      'Offline-first data sync & real-time push notification engines',
      'App Store and Google Play compliance & lifecycle deployment',
    ],
    ctaText: "Let's build your mobile app",
  },

  // 7. EXISTING: Cloud Services
  {
    id: 'cloud-services',
    category: 'engineering',
    categoryLabel: 'INFRASTRUCTURE & DEVOPS',
    title: 'Cloud Services',
    summary:
      'Multi-cloud architectures, Kubernetes orchestration, serverless hosting, and automated CI/CD pipelines.',
    description:
      'Cloud services provide resilient cloud-native architecture, serverless infrastructure, continuous integration, and managed DevOps for enterprise-scale operations.',
    capabilities: [
      'Multi-cloud architecture & landing zone implementation (AWS / GCP / Azure)',
      'Infrastructure as Code (Terraform, Pulumi, CloudFormation)',
      'Kubernetes cluster orchestration & auto-scaling configuration',
      'Automated CI/CD deployment pipelines & 24/7 uptime monitoring',
    ],
    ctaText: "Let's architect your cloud",
  },

  // 8. EXISTING: SAP Services
  {
    id: 'sap-services',
    category: 'enterprise',
    categoryLabel: 'ENTERPRISE ERP',
    title: 'SAP Services',
    summary:
      'End-to-end ERP implementation, S/4HANA migration, custom ABAP/Fiori apps, and systems integration.',
    description:
      'SAP services deliver enterprise ERP consulting, implementation, system upgrades, and custom integration to streamline complex enterprise operations.',
    capabilities: [
      'SAP S/4HANA roadmap, implementation & migration execution',
      'Custom SAP ABAP & Fiori user-interface engineering',
      'ERP integration with third-party CRM, logistics & financial tools',
      'System health checks, performance tuning & ongoing support',
    ],
    ctaText: "Let's optimize your SAP landscape",
  },
];

// ➡️ Homepage services automatically follow the same order
export const HOMEPAGE_SERVICES: CSTService[] = [...CST_SERVICES];

// ➡️ Existing service lookup remains unchanged
export const getServiceById = (id: string): CSTService | undefined => {
  return CST_SERVICES.find((s) => s.id === id);
};
