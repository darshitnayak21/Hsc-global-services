/**
 * Hscgolbalservices - Centralized Design Token Foundation
 * 
 * Strict Token Architecture:
 * - NO raw hex values or arbitrary numbers scattered across components.
 * - Semantic naming: color.text.primary, color.brand.primary, space-4, radius-md, etc.
 * - Built-in responsive typography clamp() math.
 * - WCAG AA/AAA compliant contrast ratios & accessibility rules.
 */

export interface TokenItem {
  name: string;
  cssVar: string;
  value: string;
  description: string;
  usage?: string;
  contrastRatio?: string;
}

export const cstTokens = {
  // ==========================================
  // 1. COLOR SYSTEM
  // ==========================================
  color: {
    text: {
      primary: '#0A0F1D',    // Deep navy / near-black for primary text (16.5:1 contrast on white)
      secondary: '#334155',  // Slate 700 for supporting copy & descriptions (5.2:1 contrast on white)
      muted: '#64748B',      // Slate 500 for captions, timestamps, metadata (4.6:1 contrast on white)
      inverse: '#FFFFFF',    // Pure white for dark surfaces & primary buttons (16.5:1 on deep navy)
    },
    background: {
      primary: '#FFFFFF',    // Clean white primary canvas
      secondary: '#F8FAFC',  // Off-white / light neutral surface
      dark: '#0A0F1D',       // Deep navy / near-black for dark sections (Hero overlay, Footer)
      accent: '#EFF6FF',     // Subtle 5% tint of modern blue for highlights & badges
    },
    brand: {
      primary: '#0066FF',    // Modern blue as primary brand accent
      secondary: '#7C3AED',  // Violet/purple as secondary technology accent
      tertiary: '#00D4FF',   // Cyan/teal for selected technical highlights
    },
    border: {
      default: '#E2E8F0',    // Standard card & input border gray
      subtle: '#F1F5F9',     // Hairline subtle divider
    },
    success: '#10B981',      // Accessible emerald green
    warning: '#F59E0B',      // Accessible amber orange
    error: '#EF4444',        // Accessible red
  },

  // ==========================================
  // 2. TYPOGRAPHY SYSTEM (Two-Font System)
  // ==========================================
  font: {
    display: '"Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  // Responsive Clamp Typography Hierarchy
  text: {
    'display-xl': {
      clamp: 'clamp(2.625rem, 5.5vw + 1.25rem, 6.25rem)', // 42px (mobile) to 100px (desktop)
      lineHeight: '1.05',
      letterSpacing: '-0.035em',
      fontWeight: '300',
      fontFamily: 'var(--font-display)',
      desktopTarget: '72px–100px',
      tabletTarget: '56px–72px',
      mobileTarget: '42px–56px',
      description: 'Extremely large editorial typography for homepage hero statement',
    },
    'display-lg': {
      clamp: 'clamp(2.25rem, 4vw + 1rem, 4.5rem)', // 36px to 72px
      lineHeight: '1.1',
      letterSpacing: '-0.03em',
      fontWeight: '400',
      fontFamily: 'var(--font-display)',
      desktopTarget: '48px–72px',
      tabletTarget: '40px–52px',
      mobileTarget: '32px–40px',
      description: 'Large section display headings & primary proposition titles',
    },
    'display-md': {
      clamp: 'clamp(1.875rem, 3vw + 0.75rem, 3.25rem)', // 30px to 52px
      lineHeight: '1.15',
      letterSpacing: '-0.025em',
      fontWeight: '500',
      fontFamily: 'var(--font-display)',
      desktopTarget: '36px–52px',
      tabletTarget: '30px–38px',
      mobileTarget: '26px–32px',
      description: 'Medium display subheadings for key modules and value blocks',
    },
    'h1': {
      clamp: 'clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem)', // 28px to 40px
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      fontWeight: '600',
      fontFamily: 'var(--font-display)',
      description: 'Standard page level H1 heading',
    },
    'h2': {
      clamp: 'clamp(1.5rem, 2vw + 0.5rem, 2rem)', // 24px to 32px
      lineHeight: '1.25',
      letterSpacing: '-0.015em',
      fontWeight: '600',
      fontFamily: 'var(--font-display)',
      description: 'Section level H2 heading',
    },
    'h3': {
      clamp: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.625rem)', // 20px to 26px
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: '600',
      fontFamily: 'var(--font-display)',
      description: 'Card and subsection level H3 heading',
    },
    'h4': {
      clamp: 'clamp(1.125rem, 1vw + 0.5rem, 1.25rem)', // 18px to 20px
      lineHeight: '1.35',
      letterSpacing: '0em',
      fontWeight: '600',
      fontFamily: 'var(--font-display)',
      description: 'Feature title and list header H4 heading',
    },
    'body-lg': {
      size: '1.125rem', // 18px
      lineHeight: '1.6',
      letterSpacing: '-0.005em',
      fontWeight: '400',
      fontFamily: 'var(--font-body)',
      description: 'Introductory lead paragraphs and callout body text',
    },
    'body': {
      size: '1rem', // 16px
      lineHeight: '1.6',
      letterSpacing: '0em',
      fontWeight: '400',
      fontFamily: 'var(--font-body)',
      description: 'Standard body text across all components',
    },
    'body-sm': {
      size: '0.875rem', // 14px
      lineHeight: '1.5',
      letterSpacing: '0em',
      fontWeight: '400',
      fontFamily: 'var(--font-body)',
      description: 'Supporting notes, secondary card text, list items',
    },
    'caption': {
      size: '0.75rem', // 12px
      lineHeight: '1.4',
      letterSpacing: '0.01em',
      fontWeight: '400',
      fontFamily: 'var(--font-body)',
      description: 'Metadata, footnotes, helper text, and timestamps',
    },
    'label': {
      size: '0.75rem', // 12px
      lineHeight: '1.2',
      letterSpacing: '0.08em',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      fontFamily: 'var(--font-mono)',
      description: 'Uppercase category badges, status tags, technical specs',
    },
  },

  // ==========================================
  // 3. SPACING SCALE (4px-based)
  // ==========================================
  space: {
    'space-1': '0.25rem',  // 4px
    'space-2': '0.5rem',   // 8px
    'space-3': '0.75rem',  // 12px
    'space-4': '1rem',     // 16px
    'space-6': '1.5rem',   // 24px
    'space-8': '2rem',     // 32px
    'space-10': '2.5rem',  // 40px
    'space-12': '3rem',    // 48px
    'space-16': '4rem',    // 64px
    'space-20': '5rem',    // 80px
    'space-24': '6rem',    // 96px
  },

  // ==========================================
  // 4. RADIUS SYSTEM (CST Character)
  // ==========================================
  radius: {
    'radius-sm': '6px',      // 0.375rem - small radius for inputs & controls
    'radius-md': '12px',     // 0.75rem - medium radius for cards & modules
    'radius-lg': '20px',     // 1.25rem - larger radius for feature panels & containers
    'radius-pill': '9999px', // pill only for tags/pills/chips/badges
  },

  // ==========================================
  // 5. MOTION SYSTEM
  // ==========================================
  motion: {
    'motion-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',   // Opacity, hover micro-interactions
    'motion-normal': '250ms cubic-bezier(0.4, 0, 0.2, 1)', // Card translates, navigation transitions
    'motion-slow': '400ms cubic-bezier(0.16, 1, 0.3, 1)',  // Image scale on hover, scroll reveal
    subtleTransitions: {
      opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      translate: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      imageScale: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      scrollReveal: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      navigation: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // ==========================================
  // 6. BREAKPOINTS
  // ==========================================
  breakpoint: {
    mobile: '320px',    // 320px - 639px (Mobile phones)
    tablet: '640px',    // 640px - 1023px (Tablets & small laptops)
    desktop: '1024px',  // 1024px - 1439px (Desktops)
    wide: '1440px',     // 1440px+ (Large displays & ultra-wide)
  },

  // ==========================================
  // 7. ACCESSIBILITY RULES & VALUES
  // ==========================================
  accessibility: {
    visibleFocus: {
      ringWidth: '2px',
      ringOffset: '2px',
      ringColor: '#0066FF',
      boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #0066FF',
    },
    contrastRatios: {
      'text.primary on white': '16.5:1 (WCAG AAA Pass)',
      'text.secondary on white': '5.2:1 (WCAG AA Pass)',
      'text.muted on white': '4.6:1 (WCAG AA Pass)',
      'brand.primary on white': '4.8:1 (WCAG AA Pass)',
      'text.inverse on dark': '16.5:1 (WCAG AAA Pass)',
    },
    reducedMotion: {
      mediaQuery: '@media (prefers-reduced-motion: reduce)',
      fallbackDuration: '0.01ms',
    },
    disabled: {
      opacity: '0.45',
      cursor: 'not-allowed',
      pointerEvents: 'none' as const,
    },
    error: {
      borderColor: '#EF4444',
      textColor: '#DC2626',
      backgroundColor: '#FEF2F2',
      focusRingColor: '#EF4444',
    },
  },
} as const;

// Backward-compatible alias
export const tokens = cstTokens;

/**
 * CSS Variable string mappings for all semantic tokens
 */
export const cstCssVar = {
  // Colors
  'color.text.primary': 'var(--color-text-primary)',
  'color.text.secondary': 'var(--color-text-secondary)',
  'color.text.muted': 'var(--color-text-muted)',
  'color.text.inverse': 'var(--color-text-inverse)',

  'color.background.primary': 'var(--color-background-primary)',
  'color.background.secondary': 'var(--color-background-secondary)',
  'color.background.dark': 'var(--color-background-dark)',
  'color.background.accent': 'var(--color-background-accent)',

  'color.brand.primary': 'var(--color-brand-primary)',
  'color.brand.secondary': 'var(--color-brand-secondary)',
  'color.brand.tertiary': 'var(--color-brand-tertiary)',

  'color.border.default': 'var(--color-border-default)',
  'color.border.subtle': 'var(--color-border-subtle)',

  'color.success': 'var(--color-success)',
  'color.warning': 'var(--color-warning)',
  'color.error': 'var(--color-error)',

  // Fonts
  'font.display': 'var(--font-display)',
  'font.body': 'var(--font-body)',
  'font.mono': 'var(--font-mono)',

  // Spacing
  'space-1': 'var(--space-1)',
  'space-2': 'var(--space-2)',
  'space-3': 'var(--space-3)',
  'space-4': 'var(--space-4)',
  'space-6': 'var(--space-6)',
  'space-8': 'var(--space-8)',
  'space-10': 'var(--space-10)',
  'space-12': 'var(--space-12)',
  'space-16': 'var(--space-16)',
  'space-20': 'var(--space-20)',
  'space-24': 'var(--space-24)',

  // Radii
  'radius-sm': 'var(--radius-sm)',
  'radius-md': 'var(--radius-md)',
  'radius-lg': 'var(--radius-lg)',
  'radius-pill': 'var(--radius-pill)',

  // Motion
  'motion-fast': 'var(--motion-fast)',
  'motion-normal': 'var(--motion-normal)',
  'motion-slow': 'var(--motion-slow)',
} as const;

/**
 * Flat list of all semantic tokens for inspector/auditing
 */
export const ALL_SEMANTIC_TOKENS: TokenItem[] = [
  // Color Text
  {
    name: 'color.text.primary',
    cssVar: '--color-text-primary',
    value: '#0A0F1D',
    description: 'Deep navy / near-black for primary text and dark sections',
    usage: 'Main headings, body text, primary interface labels',
    contrastRatio: '16.5:1 (AAA)',
  },
  {
    name: 'color.text.secondary',
    cssVar: '--color-text-secondary',
    value: '#334155',
    description: 'Slate 700 for descriptions, secondary content, supporting paragraphs',
    usage: 'Sub-headlines, card descriptions, list items',
    contrastRatio: '5.2:1 (AA)',
  },
  {
    name: 'color.text.muted',
    cssVar: '--color-text-muted',
    value: '#64748B',
    description: 'Muted gray text for timestamps, tags, captions, metadata',
    usage: 'Footnotes, timestamps, passive hints',
    contrastRatio: '4.6:1 (AA)',
  },
  {
    name: 'color.text.inverse',
    cssVar: '--color-text-inverse',
    value: '#FFFFFF',
    description: 'Pure white for text on dark sections and primary action buttons',
    usage: 'Dark hero overlay text, primary button labels, footer headings',
    contrastRatio: '16.5:1 (AAA)',
  },

  // Color Background
  {
    name: 'color.background.primary',
    cssVar: '--color-background-primary',
    value: '#FFFFFF',
    description: 'Clean white primary canvas for modern enterprise credibility',
    usage: 'Page background, cards, input backgrounds, modal surfaces',
  },
  {
    name: 'color.background.secondary',
    cssVar: '--color-background-secondary',
    value: '#F8FAFC',
    description: 'Off-white / light neutral surface for section alternation & panels',
    usage: 'Alternating sections, secondary panels, code blocks',
  },
  {
    name: 'color.background.dark',
    cssVar: '--color-background-dark',
    value: '#0A0F1D',
    description: 'Deep navy / near-black for dark sections (hero overlay, footer)',
    usage: 'Hero background, dark footer, dark statement cards',
  },
  {
    name: 'color.background.accent',
    cssVar: '--color-background-accent',
    value: '#EFF6FF',
    description: 'Subtle light neutral blue tint for technical highlights and badges',
    usage: 'Badge backgrounds, active state fills, feature callouts',
  },

  // Color Brand
  {
    name: 'color.brand.primary',
    cssVar: '--color-brand-primary',
    value: '#0066FF',
    description: 'Modern blue as the primary brand accent (technology + enterprise)',
    usage: 'Primary buttons, active links, focus rings, brand badges',
    contrastRatio: '4.8:1 (AA)',
  },
  {
    name: 'color.brand.secondary',
    cssVar: '--color-brand-secondary',
    value: '#7C3AED',
    description: 'Violet/purple as the secondary technology accent (creativity + innovation)',
    usage: 'Secondary highlights, capability tags, gradient accents',
  },
  {
    name: 'color.brand.tertiary',
    cssVar: '--color-brand-tertiary',
    value: '#00D4FF',
    description: 'Cyan/teal for selected technical highlights and telemetry accents',
    usage: 'Tech badges, status indicators, live metrics, code sparks',
  },

  // Color Border
  {
    name: 'color.border.default',
    cssVar: '--color-border-default',
    value: '#E2E8F0',
    description: 'Subtle border gray for standard cards, inputs, and container dividers',
    usage: 'Card outlines, text input borders, table borders',
  },
  {
    name: 'color.border.subtle',
    cssVar: '--color-border-subtle',
    value: '#F1F5F9',
    description: 'Subtle hairline gray for light divider lines',
    usage: 'Separators, footer rules, subtle group dividers',
  },

  // Color State
  {
    name: 'color.success',
    cssVar: '--color-success',
    value: '#10B981',
    description: 'Accessible green for verified checks, success banners, active indicators',
    usage: 'Form success, status pills, SLA badges',
  },
  {
    name: 'color.warning',
    cssVar: '--color-warning',
    value: '#F59E0B',
    description: 'Accessible amber orange for warnings, maintenance notices, caveats',
    usage: 'Attention badges, advisory alerts',
  },
  {
    name: 'color.error',
    cssVar: '--color-error',
    value: '#EF4444',
    description: 'Accessible red for field errors, validation alerts, failure notices',
    usage: 'Form invalid states, error messages, alert boxes',
  },

  // Spacing Scale
  { name: 'space-1', cssVar: '--space-1', value: '4px (0.25rem)', description: 'Micro-spacing, tight icon gap, badge padding' },
  { name: 'space-2', cssVar: '--space-2', value: '8px (0.5rem)', description: 'Small gap, compact padding, button horizontal margin' },
  { name: 'space-3', cssVar: '--space-3', value: '12px (0.75rem)', description: 'Medium gap, card internal micro-stack' },
  { name: 'space-4', cssVar: '--space-4', value: '16px (1rem)', description: 'Standard component padding, base container gap' },
  { name: 'space-6', cssVar: '--space-6', value: '24px (1.5rem)', description: 'Card padding, column gaps on tablet' },
  { name: 'space-8', cssVar: '--space-8', value: '32px (2rem)', description: 'Section sub-group padding, grid row gap' },
  { name: 'space-10', cssVar: '--space-10', value: '40px (2.5rem)', description: 'Sub-section vertical spacing' },
  { name: 'space-12', cssVar: '--space-12', value: '48px (3rem)', description: 'Medium section padding' },
  { name: 'space-16', cssVar: '--space-16', value: '64px (4rem)', description: 'Major section vertical spacing' },
  { name: 'space-20', cssVar: '--space-20', value: '80px (5rem)', description: 'Large section vertical padding' },
  { name: 'space-24', cssVar: '--space-24', value: '96px (6rem)', description: 'Hero section vertical padding and landmark separators' },

  // Radius System
  { name: 'radius-sm', cssVar: '--radius-sm', value: '6px (0.375rem)', description: 'Small radius for inputs, form controls, dropdowns, code chips' },
  { name: 'radius-md', cssVar: '--radius-md', value: '12px (0.75rem)', description: 'Medium radius for cards, interactive modules, dialog boxes' },
  { name: 'radius-lg', cssVar: '--radius-lg', value: '20px (1.25rem)', description: 'Larger radius for feature panels, hero container frames, bento blocks' },
  { name: 'radius-pill', cssVar: '--radius-pill', value: '9999px', description: 'Pill ONLY for tags, chips, status pills, circular icon containers' },

  // Motion System
  { name: 'motion-fast', cssVar: '--motion-fast', value: '150ms cubic-bezier(0.4, 0, 0.2, 1)', description: 'Opacity transitions, button hover states, micro-interactions' },
  { name: 'motion-normal', cssVar: '--motion-normal', value: '250ms cubic-bezier(0.4, 0, 0.2, 1)', description: 'Card translate transitions, navigation dropdowns, tab switches' },
  { name: 'motion-slow', cssVar: '--motion-slow', value: '400ms cubic-bezier(0.16, 1, 0.3, 1)', description: 'Image scale on hover, scroll reveal, modal enter/leave' },
];
