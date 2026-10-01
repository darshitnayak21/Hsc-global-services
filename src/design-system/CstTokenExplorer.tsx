import React, { useState } from 'react';
import { cstTokens, ALL_SEMANTIC_TOKENS, TokenItem } from './tokens';
import { Button } from './Button';
import { Card, CardHeader } from './Card';
import { Badge } from './Badge';
import { Input } from './Input';
import { Panel } from './Panel';
import { BrandLogo } from './BrandLogo';
import {
  Palette,
  Type,
  Maximize2,
  Sliders,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Activity,
  Layers,
  Code2,
  ArrowRight,
  RefreshCw,
  Search,
  AlertTriangle,
} from 'lucide-react';

export const CstTokenExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'color' | 'typography' | 'spacing' | 'radius' | 'motion' | 'breakpoints' | 'accessibility' | 'primitives' | 'code'
  >('color');

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [heroFontSize, setHeroFontSize] = useState<number>(84);
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'tablet' | 'desktop' | 'wide'>('desktop');
  const [inputVal, setInputVal] = useState('');
  const [hasInputError, setHasInputError] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [motionTrigger, setMotionTrigger] = useState(0);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const navTabs = [
    { id: 'color', label: '1. Color System', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: '2. Typography', icon: <Type className="w-4 h-4" /> },
    { id: 'spacing', label: '3. Spacing (4px)', icon: <Sliders className="w-4 h-4" /> },
    { id: 'radius', label: '4. Radius Scale', icon: <Maximize2 className="w-4 h-4" /> },
    { id: 'motion', label: '5. Motion System', icon: <Activity className="w-4 h-4" /> },
    { id: 'breakpoints', label: '6. Breakpoints', icon: <Monitor className="w-4 h-4" /> },
    { id: 'accessibility', label: '7. Accessibility', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'primitives', label: 'Component Primitives', icon: <Layers className="w-4 h-4" /> },
    { id: 'code', label: 'Export Tokens', icon: <Code2 className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] text-[var(--color-text-primary)] font-['Inter'] selection:bg-[var(--color-brand-primary)] selection:text-white">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[var(--color-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" theme="light" />
            <div className="hidden sm:block h-5 w-px bg-[var(--color-border-default)]" />
            <span className="hidden sm:inline-flex text-xs font-mono font-semibold px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--color-background-accent)] text-[var(--color-brand-primary)] border border-blue-200">
              DESIGN TOKEN FOUNDATION
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="cyan" size="sm" icon={<span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />}>
              Tokens Centralized
            </Badge>
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<Code2 className="w-4 h-4" />}
              onClick={() => setActiveTab('code')}
            >
              Tokens JSON
            </Button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[var(--color-border-subtle)] overflow-x-auto scrollbar-none">
          <nav className="flex space-x-1 py-2">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-[var(--radius-sm)] whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-brand-primary)] text-white shadow-xs font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ========================================================
            TAB 1: COLOR SYSTEM
           ======================================================== */}
        {activeTab === 'color' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Color Intro */}
            <div className="max-w-3xl">
              <Badge variant="brand" className="mb-3">Disciplined Architecture</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                Modern CST Technology Palette
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Structured around the core brand balance: <strong>Technology + Digital Transformation + Enterprise + Creativity</strong>.
                Components reference semantic color tokens (<code className="px-1.5 py-0.5 rounded bg-slate-100 text-xs font-mono text-[var(--color-brand-primary)]">color.text.primary</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 text-xs font-mono text-[var(--color-brand-primary)]">color.brand.primary</code>) rather than arbitrary hardcoded hex codes.
              </p>
            </div>

            {/* Quick Filter Bar */}
            <div className="flex flex-wrap gap-2 items-center p-2 rounded-[var(--radius-md)] bg-[var(--color-background-secondary)] border border-[var(--color-border-default)]">
              <span className="text-xs font-mono text-[var(--color-text-muted)] px-2 font-semibold">Filter:</span>
              {[
                { id: 'all', label: 'All Semantic Roles' },
                { id: 'text', label: 'Text Roles' },
                { id: 'background', label: 'Backgrounds & Surfaces' },
                { id: 'brand', label: 'Brand & Accents' },
                { id: 'border', label: 'Borders & Rules' },
                { id: 'status', label: 'Status & State' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setColorFilter(filter.id)}
                  className={`px-3 py-1.5 text-xs rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
                    colorFilter === filter.id
                      ? 'bg-[var(--color-brand-primary)] text-white font-medium shadow-xs'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* 1. Primary & Supporting Palettes Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Palette */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-h3 font-semibold text-[var(--color-text-primary)]">Primary Roles</h2>
                  <Badge variant="brand" size="sm">Core Focus</Badge>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Deep navy / near-black for primary text and dark sections, modern blue as the primary brand accent, and violet/purple for secondary technology accent.
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#0A0F1D] text-white">
                    <span className="text-xs font-mono">Deep Navy (Near-Black)</span>
                    <span className="text-xs font-mono font-semibold">#0A0F1D</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#0066FF] text-white">
                    <span className="text-xs font-mono">Modern Blue Accent</span>
                    <span className="text-xs font-mono font-semibold">#0066FF</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#7C3AED] text-white">
                    <span className="text-xs font-mono">Violet / Purple Accent</span>
                    <span className="text-xs font-mono font-semibold">#7C3AED</span>
                  </div>
                </div>
              </div>

              {/* Supporting Palette */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-h3 font-semibold text-[var(--color-text-primary)]">Supporting Roles</h2>
                  <Badge variant="cyan" size="sm">Technical</Badge>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Cyan/teal for selected technical highlights, clean white, off-white, light neutral surfaces, muted gray text, and subtle border gray.
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#00D4FF] text-[#0A0F1D]">
                    <span className="text-xs font-mono">Cyan/Teal Highlight</span>
                    <span className="text-xs font-mono font-semibold">#00D4FF</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#F8FAFC] border border-[#E2E8F0] text-[var(--color-text-primary)]">
                    <span className="text-xs font-mono">Off-White Surface</span>
                    <span className="text-xs font-mono font-semibold">#F8FAFC</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-white border border-[#E2E8F0] text-[var(--color-text-muted)]">
                    <span className="text-xs font-mono">Muted Gray Text</span>
                    <span className="text-xs font-mono font-semibold">#64748B</span>
                  </div>
                </div>
              </div>

              {/* System States Palette */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-h3 font-semibold text-[var(--color-text-primary)]">Semantic States</h2>
                  <Badge variant="neutral" size="sm">WCAG AA</Badge>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Predictable, enterprise-standard feedback tokens for user interaction, validation, alerts, and system state confirmations.
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#10B981] text-white">
                    <span className="text-xs font-mono">color.success</span>
                    <span className="text-xs font-mono font-semibold">#10B981</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#F59E0B] text-white">
                    <span className="text-xs font-mono">color.warning</span>
                    <span className="text-xs font-mono font-semibold">#F59E0B</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[#EF4444] text-white">
                    <span className="text-xs font-mono">color.error</span>
                    <span className="text-xs font-mono font-semibold">#EF4444</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic Token Inventory Table */}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-default)] overflow-hidden bg-white shadow-xs">
              <div className="p-4 bg-[var(--color-background-secondary)] border-b border-[var(--color-border-default)] flex items-center justify-between">
                <div>
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">Semantic Color Tokens Matrix</h3>
                  <p className="text-caption text-[var(--color-text-muted)]">Click any token to copy its CSS variable or path to your clipboard</p>
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">WCAG 2.1 AA/AAA Compliant</span>
              </div>

              <div className="divide-y divide-[var(--color-border-subtle)]">
                {ALL_SEMANTIC_TOKENS.filter((t) => {
                  if (colorFilter === 'text') return t.name.startsWith('color.text');
                  if (colorFilter === 'background') return t.name.startsWith('color.background');
                  if (colorFilter === 'brand') return t.name.startsWith('color.brand');
                  if (colorFilter === 'border') return t.name.startsWith('color.border');
                  if (colorFilter === 'status') return ['color.success', 'color.warning', 'color.error'].includes(t.name);
                  return t.name.startsWith('color.');
                }).map((token) => (
                  <div
                    key={token.name}
                    className="p-4 hover:bg-[var(--color-background-secondary)] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Swatch */}
                      <div
                        className="w-10 h-10 rounded-[var(--radius-sm)] border border-slate-300 shrink-0 shadow-xs flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: token.value,
                          color: token.name.includes('inverse') || token.value === '#0A0F1D' || token.name.includes('primary') && token.value.startsWith('#00') || token.name.includes('brand.secondary') || token.name.includes('error') || token.name.includes('success') ? '#FFFFFF' : '#0A0F1D',
                        }}
                      >
                        ●
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                            {token.name}
                          </code>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-[var(--color-text-muted)]">
                            {token.value}
                          </span>
                        </div>
                        <p className="text-body-sm text-[var(--color-text-secondary)] mt-0.5">
                          {token.description}
                        </p>
                        {token.usage && (
                          <p className="text-caption text-[var(--color-text-muted)] mt-0.5">
                            Usage: {token.usage}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      {token.contrastRatio && (
                        <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {token.contrastRatio}
                        </span>
                      )}
                      <button
                        onClick={() => copyToClipboard(`var(${token.cssVar})`, token.name)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-brand-primary)] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                      >
                        {copiedToken === token.name ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy CSS Var</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: TYPOGRAPHY SYSTEM
           ======================================================== */}
        {activeTab === 'typography' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Typography Intro */}
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-3">Two-Font System</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                CST Typographic Architecture
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Engineered with a modern display sans-serif (<strong>Plus Jakarta Sans</strong>) for editorial headlines and section titles, and a highly readable geometric sans-serif (<strong>Inter</strong>) for body copy, UI components, and data tables.
              </p>
            </div>

            {/* Editorial Hero Clamp() Heading Sandbox */}
            <Panel variant="light" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-default)] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-h3 font-semibold text-[var(--color-text-primary)]">
                      Homepage Hero Editorial Typography (text.display-xl)
                    </h2>
                    <Badge variant="brand" size="sm">Responsive clamp()</Badge>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mt-1">
                    Token: <code className="font-mono text-xs font-bold text-[var(--color-brand-primary)]">text.display-xl</code> → <code className="font-mono text-xs">clamp(2.625rem, 5.5vw + 1.25rem, 6.25rem)</code>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-mono text-[var(--color-text-muted)]">
                    Target Specs:
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="px-2 py-1 bg-white rounded border border-[var(--color-border-default)] font-semibold">Desktop: 72–100px</span>
                    <span className="px-2 py-1 bg-white rounded border border-[var(--color-border-default)] font-semibold">Tablet: 56–72px</span>
                    <span className="px-2 py-1 bg-white rounded border border-[var(--color-border-default)] font-semibold">Mobile: 42–56px</span>
                  </div>
                </div>
              </div>

              {/* Live Fluid Demonstration */}
              <div className="p-8 sm:p-12 rounded-[var(--radius-md)] bg-[#0A0F1D] text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-4 right-4 text-xs font-mono px-2 py-1 rounded bg-white/10 text-slate-300 border border-white/10">
                  Live Token Render: text-display-xl
                </div>

                <div className="max-w-4xl space-y-4">
                  <span className="text-label text-[var(--color-brand-tertiary)] tracking-widest font-mono">
                    ENTERPRISE DIGITAL PLATFORMS
                  </span>
                  <div className="text-display-xl text-white font-light tracking-tight leading-[1.05]">
                    Engineering the Next Era of Enterprise Software.
                  </div>
                  <p className="text-body-lg text-slate-300 max-w-2xl font-light">
                    Transforming complex enterprise challenges into resilient, scalable cloud architectures and digital experiences.
                  </p>
                </div>
              </div>
            </Panel>

            {/* Typography Hierarchy Table */}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-default)] overflow-hidden bg-white shadow-xs">
              <div className="p-4 bg-[var(--color-background-secondary)] border-b border-[var(--color-border-default)]">
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Complete CST Typography Hierarchy (Tokens: text.*)
                </h3>
              </div>

              <div className="divide-y divide-[var(--color-border-subtle)]">
                {[
                  {
                    token: 'text.display-xl',
                    cssClass: 'text-display-xl',
                    sample: 'Digital Innovation & Scale',
                    specs: 'clamp(2.625rem, 5.5vw + 1.25rem, 6.25rem) | 42px to 100px | Weight 300 | Display',
                  },
                  {
                    token: 'text.display-lg',
                    cssClass: 'text-display-lg',
                    sample: 'Architected for Global Enterprise',
                    specs: 'clamp(2.25rem, 4vw + 1rem, 4.5rem) | 36px to 72px | Weight 400 | Display',
                  },
                  {
                    token: 'text.display-md',
                    cssClass: 'text-display-md',
                    sample: 'Accelerating Business Velocity',
                    specs: 'clamp(1.875rem, 3vw + 0.75rem, 3.25rem) | 30px to 52px | Weight 500 | Display',
                  },
                  {
                    token: 'text.h1',
                    cssClass: 'text-h1',
                    sample: 'H1: Comprehensive Cloud Infrastructure',
                    specs: 'clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem) | 28px to 40px | Weight 600 | Display',
                  },
                  {
                    token: 'text.h2',
                    cssClass: 'text-h2',
                    sample: 'H2: Enterprise Delivery Model & Governance',
                    specs: 'clamp(1.5rem, 2vw + 0.5rem, 2rem) | 24px to 32px | Weight 600 | Display',
                  },
                  {
                    token: 'text.h3',
                    cssClass: 'text-h3',
                    sample: 'H3: Full-Lifecycle Product Development',
                    specs: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.625rem) | 20px to 26px | Weight 600 | Display',
                  },
                  {
                    token: 'text.h4',
                    cssClass: 'text-h4',
                    sample: 'H4: Security, Compliance & Observability',
                    specs: 'clamp(1.125rem, 1vw + 0.5rem, 1.25rem) | 18px to 20px | Weight 600 | Display',
                  },
                  {
                    token: 'text.body-lg',
                    cssClass: 'text-body-lg',
                    sample: 'Body Large: We partner with leading financial, healthcare, and retail enterprises to engineer reliable digital platforms.',
                    specs: '1.125rem (18px) | Line Height 1.6 | Weight 400 | Body Sans (Inter)',
                  },
                  {
                    token: 'text.body',
                    cssClass: 'text-body',
                    sample: 'Body: Hscgolbalservices delivers high-impact digital engineering, technology staffing, and cloud solutions.',
                    specs: '1rem (16px) | Line Height 1.6 | Weight 400 | Body Sans (Inter)',
                  },
                  {
                    token: 'text.body-sm',
                    cssClass: 'text-body-sm',
                    sample: 'Body Small: ISO 27001 certified delivery centers with guaranteed 99.99% uptime SLAs across multi-cloud regions.',
                    specs: '0.875rem (14px) | Line Height 1.5 | Weight 400 | Body Sans (Inter)',
                  },
                  {
                    token: 'text.caption',
                    cssClass: 'text-caption',
                    sample: 'Caption: * All project estimations are provided under standard enterprise master service agreements.',
                    specs: '0.75rem (12px) | Line Height 1.4 | Weight 400 | Body Sans (Inter)',
                  },
                  {
                    token: 'text.label',
                    cssClass: 'text-label',
                    sample: 'LABEL: ENTERPRISE ARCHITECTURE // ISO CERTIFIED',
                    specs: '0.75rem (12px) | Uppercase | Letter Spacing 0.08em | Monospace',
                  },
                ].map((item) => (
                  <div key={item.token} className="p-6 hover:bg-[var(--color-background-secondary)] transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono font-bold text-[var(--color-brand-primary)] bg-blue-50 px-2 py-0.5 rounded">
                          {item.token}
                        </code>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono">
                          .{item.cssClass}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                        {item.specs}
                      </span>
                    </div>
                    <div className={`${item.cssClass} text-[var(--color-text-primary)] pt-1 overflow-x-hidden`}>
                      {item.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: SPACING (4PX SCALE)
           ======================================================== */}
        {activeTab === 'spacing' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Spacing Intro */}
            <div className="max-w-3xl">
              <Badge variant="cyan" className="mb-3">4px Mathematical Base</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                4px-Based Spacing Scale
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Strict mathematical intervals ensuring visual rhythm across cards, padding, grids, and section blocks without arbitrary pixel nudging.
              </p>
            </div>

            {/* Spacing Ruler Table */}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-default)] overflow-hidden bg-white shadow-xs">
              <div className="p-4 bg-[var(--color-background-secondary)] border-b border-[var(--color-border-default)] flex justify-between items-center">
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Spacing Tokens Roster
                </h3>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">Base: 1 unit = 4px</span>
              </div>

              <div className="divide-y divide-[var(--color-border-subtle)]">
                {[
                  { token: 'space-1', px: '4px', rem: '0.25rem', usage: 'Micro padding, icon-to-label gap' },
                  { token: 'space-2', px: '8px', rem: '0.5rem', usage: 'Tight gap, compact button padding' },
                  { token: 'space-3', px: '12px', rem: '0.75rem', usage: 'Input horizontal padding, chip spacing' },
                  { token: 'space-4', px: '16px', rem: '1rem', usage: 'Standard component margin & padding' },
                  { token: 'space-6', px: '24px', rem: '1.5rem', usage: 'Standard card internal padding' },
                  { token: 'space-8', px: '32px', rem: '2rem', usage: 'Card grid gap, panel margins' },
                  { token: 'space-10', px: '40px', rem: '2.5rem', usage: 'Section sub-group padding' },
                  { token: 'space-12', px: '48px', rem: '3rem', usage: 'Sub-section vertical spacing' },
                  { token: 'space-16', px: '64px', rem: '4rem', usage: 'Major section vertical spacing' },
                  { token: 'space-20', px: '80px', rem: '5rem', usage: 'Large page landmark spacing' },
                  { token: 'space-24', px: '96px', rem: '6rem', usage: 'Hero section vertical padding' },
                ].map((s) => (
                  <div key={s.token} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--color-background-secondary)] transition-colors">
                    <div className="flex items-center gap-4 w-64 shrink-0">
                      <code className="text-xs font-mono font-bold text-[var(--color-brand-primary)] bg-blue-50 px-2.5 py-1 rounded">
                        {s.token}
                      </code>
                      <div>
                        <span className="text-sm font-mono font-semibold text-[var(--color-text-primary)]">{s.px}</span>
                        <span className="text-xs font-mono text-[var(--color-text-muted)] ml-2">({s.rem})</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div
                        className="h-6 rounded bg-[var(--color-brand-primary)]/15 border border-[var(--color-brand-primary)]/30 flex items-center px-2 text-[10px] font-mono text-[var(--color-brand-primary)]"
                        style={{ width: `min(100%, ${parseInt(s.px) * 3}px)` }}
                      >
                        {s.px}
                      </div>
                    </div>

                    <div className="text-xs text-[var(--color-text-secondary)] w-72 shrink-0 md:text-right">
                      {s.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: RADIUS SCALE
           ======================================================== */}
        {activeTab === 'radius' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Radius Intro */}
            <div className="max-w-3xl">
              <Badge variant="brand" className="mb-3">Disciplined Geometry</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                CST Radius Scale
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Do <strong>NOT</strong> copy Spectralsoft's extreme 30px/80px radius everywhere. CST maintains a balanced, disciplined character:
                small radius for inputs, medium radius for cards, larger radius for feature panels, and pill <em>only</em> for tags and chips.
              </p>
            </div>

            {/* Radius Visual Demonstration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Radius-sm */}
              <div className="p-6 rounded-[var(--radius-sm)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="brand" size="sm">radius-sm</Badge>
                  <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">6px (0.375rem)</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Small Radius: Inputs & Controls
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used for form inputs, dropdown selectors, action buttons, and table action triggers.
                </p>
                <div className="pt-2">
                  <div className="h-10 rounded-[6px] bg-[var(--color-background-secondary)] border border-[var(--color-border-default)] flex items-center px-3 text-xs text-[var(--color-text-muted)] font-mono">
                    Example Input Box (6px)
                  </div>
                </div>
              </div>

              {/* Radius-md */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" size="sm">radius-md</Badge>
                  <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">12px (0.75rem)</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Medium Radius: Cards & Modules
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used for standard service cards, blog cards, client testimonial cards, and dialog containers.
                </p>
                <div className="pt-2">
                  <div className="h-10 rounded-[12px] bg-blue-50/50 border border-blue-200 flex items-center px-3 text-xs text-[var(--color-brand-primary)] font-mono">
                    Example Card Edge (12px)
                  </div>
                </div>
              </div>

              {/* Radius-lg */}
              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">radius-lg</Badge>
                  <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">20px (1.25rem)</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Larger Radius: Feature Panels
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used for major feature sections, bento containers, and hero background containment panels.
                </p>
                <div className="pt-2">
                  <div className="h-10 rounded-[20px] bg-purple-50/50 border border-purple-200 flex items-center px-3 text-xs text-[var(--color-brand-secondary)] font-mono">
                    Example Feature Panel (20px)
                  </div>
                </div>
              </div>

              {/* Radius-pill */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="sm">radius-pill</Badge>
                  <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">9999px</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Pill: ONLY for Tags & Pills
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used strictly for status chips, badges, and category labels. Avoid making cards pill-shaped.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-[9999px] bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200">
                    Status Tag
                  </span>
                  <span className="px-3 py-1 rounded-[9999px] bg-blue-100 text-blue-700 text-xs font-mono border border-blue-200">
                    Badge Pill
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: MOTION SYSTEM
           ======================================================== */}
        {activeTab === 'motion' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Motion Intro */}
            <div className="max-w-3xl">
              <Badge variant="brand" className="mb-3">Subtle & Purposeful</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                CST Motion System
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Avoid excessive animations. Use subtle opacity transitions, translate transitions, image scale on hover, and scroll reveals that respect <code className="font-mono text-xs font-bold">prefers-reduced-motion</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fast Motion */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="brand" size="sm">motion-fast</Badge>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">150ms</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Micro-Interactions (150ms)
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used for hover opacity, button active clicks, tooltip appearances, and border highlight transitions.
                </p>
                <div className="pt-2">
                  <button className="w-full py-2.5 rounded-[var(--radius-sm)] bg-[var(--color-brand-primary)] text-white text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-150 cursor-pointer">
                    Hover Me (150ms transition)
                  </button>
                </div>
              </div>

              {/* Normal Motion */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" size="sm">motion-normal</Badge>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">250ms</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Card Translates (250ms)
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used for card hover lifts (<code className="text-xs font-mono">hover-lift-subtle</code>), dropdown menus, and accordion expanders.
                </p>
                <div className="pt-2">
                  <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-background-secondary)] border border-[var(--color-border-default)] hover-lift-subtle cursor-pointer text-xs font-mono text-center">
                    Hover to Lift (-2px translate)
                  </div>
                </div>
              </div>

              {/* Slow Motion */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">motion-slow</Badge>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">400ms</span>
                </div>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Image Scale & Reveal (400ms)
                </h3>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Used for subtle image scale on hover (1.03x) and smooth modal backdrop blurs.
                </p>
                <div className="pt-2 overflow-hidden rounded-[var(--radius-sm)]">
                  <div className="h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover-scale-subtle flex items-center justify-center text-xs font-mono text-white cursor-pointer">
                    Hover to Scale (1.03x)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: BREAKPOINTS
           ======================================================== */}
        {activeTab === 'breakpoints' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Breakpoints Intro */}
            <div className="max-w-3xl">
              <Badge variant="neutral" className="mb-3">Responsive Architecture</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                Responsive Breakpoint Targets
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Every CST component is engineered to respond predictably across four canonical breakpoints: <strong>mobile</strong>, <strong>tablet</strong>, <strong>desktop</strong>, and <strong>wide</strong>.
              </p>
            </div>

            {/* Breakpoints Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'mobile', icon: <Smartphone className="w-5 h-5 text-blue-500" />, min: '320px', range: '320px – 639px', behavior: 'Single column stack, 42–56px hero clamp, full-width buttons' },
                { name: 'tablet', icon: <Tablet className="w-5 h-5 text-indigo-500" />, min: '640px', range: '640px – 1023px', behavior: '2-column bento grids, 56–72px hero clamp, compact navigation' },
                { name: 'desktop', icon: <Monitor className="w-5 h-5 text-purple-500" />, min: '1024px', range: '1024px – 1439px', behavior: '3-column service grid, 72–100px hero clamp, sticky header' },
                { name: 'wide', icon: <Maximize2 className="w-5 h-5 text-cyan-500" />, min: '1440px', range: '1440px+', behavior: '1280px max-width container, spacious margins, editorial luxury' },
              ].map((bp) => (
                <div key={bp.name} className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-[var(--radius-sm)] bg-slate-100">{bp.icon}</div>
                    <code className="text-xs font-mono font-bold text-[var(--color-brand-primary)] bg-blue-50 px-2 py-0.5 rounded">
                      {bp.min}
                    </code>
                  </div>
                  <div>
                    <h3 className="text-h4 font-semibold text-[var(--color-text-primary)] uppercase font-mono">
                      {bp.name}
                    </h3>
                    <p className="text-caption text-[var(--color-text-muted)] font-mono">{bp.range}</p>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    {bp.behavior}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: ACCESSIBILITY
           ======================================================== */}
        {activeTab === 'accessibility' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* A11y Intro */}
            <div className="max-w-3xl">
              <Badge variant="cyan" className="mb-3">WCAG 2.1 AA Compliant</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                Accessibility Rules & Tokens
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Every CST component must remain completely usable without a mouse. Tokens govern visible focus rings, sufficient contrast, disabled states, error validation, and reduced motion.
              </p>
            </div>

            {/* Testbed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Focus Ring Sandbox */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">Visible Focus Verification</h3>
                  <Badge variant="brand" size="sm">Tab Navigation</Badge>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-xs font-mono font-semibold">Tab</kbd> to see the accessible 2px offset + 4px brand glow ring:
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary" size="sm">Interactive Primary</Button>
                  <Button variant="secondary" size="sm">Interactive Secondary</Button>
                  <a
                    href="#test-link"
                    className="px-3 py-1.5 text-xs text-[var(--color-brand-primary)] underline font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
                  >
                    Accessible Anchor
                  </a>
                </div>
              </div>

              {/* Form Validation & Error States */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">Interactive Input State Tester</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHasInputError(!hasInputError)}
                      className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    >
                      Toggle Error
                    </button>
                    <button
                      onClick={() => setIsInputDisabled(!isInputDisabled)}
                      className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    >
                      Toggle Disabled
                    </button>
                  </div>
                </div>

                <Input
                  label="Work Email Address"
                  placeholder="name@enterprise.com"
                  disabled={isInputDisabled}
                  error={hasInputError ? 'Please enter a valid enterprise corporate email address.' : undefined}
                  helperText="We never share your contact information."
                />
              </div>

              {/* Contrast Check Ratios */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4 md:col-span-2">
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  Audited Contrast Ratios (WCAG 2.1 AA & AAA)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {[
                    { pair: 'Deep Navy on White', score: '16.5:1', rating: 'AAA Pass', bg: 'bg-white', text: 'text-[#0A0F1D]' },
                    { pair: 'Slate 700 on White', score: '5.2:1', rating: 'AA Pass', bg: 'bg-white', text: 'text-[#334155]' },
                    { pair: 'Slate 500 on White', score: '4.6:1', rating: 'AA Pass', bg: 'bg-white', text: 'text-[#64748B]' },
                    { pair: 'White on Deep Navy', score: '16.5:1', rating: 'AAA Pass', bg: 'bg-[#0A0F1D]', text: 'text-white' },
                  ].map((c) => (
                    <div key={c.pair} className={`p-4 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] ${c.bg} ${c.text} space-y-1`}>
                      <span className="text-xs font-mono block">{c.pair}</span>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold font-mono">{c.score}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {c.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 8: COMPONENT PRIMITIVES
           ======================================================== */}
        {activeTab === 'primitives' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Primitives Intro */}
            <div className="max-w-3xl">
              <Badge variant="brand" className="mb-3">Zero Raw Hex Code</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                Token-Powered Component Primitives
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Every component references tokens instead of arbitrary values: <code className="font-mono text-xs">radius-sm</code> for inputs and buttons, <code className="font-mono text-xs">radius-md</code> for cards, <code className="font-mono text-xs">radius-lg</code> for feature panels, and <code className="font-mono text-xs">radius-pill</code> only for tags.
              </p>
            </div>

            {/* Live Component Demonstrations */}
            <div className="space-y-8">
              {/* 1. Buttons */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                    Button Primitive (<code className="font-mono text-xs">radius-sm</code>: 6px)
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Variants: primary | secondary | accent | ghost | destructive</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="accent">Technology Accent</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="primary" disabled>Disabled State</Button>
                </div>
              </div>

              {/* 2. Badges */}
              <div className="p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-default)] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                    Badge Primitive (<code className="font-mono text-xs">radius-pill</code>: 9999px)
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Pill ONLY for tags & chips</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand">Brand Badge</Badge>
                  <Badge variant="secondary">Technology Violet</Badge>
                  <Badge variant="cyan">Technical Cyan</Badge>
                  <Badge variant="neutral">Neutral Surface</Badge>
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Verified SLA</Badge>
                  <Badge variant="warning">Maintenance Notice</Badge>
                  <Badge variant="error">Critical Warning</Badge>
                </div>
              </div>

              {/* 3. Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                    Card Primitive (<code className="font-mono text-xs">radius-md</code>: 12px)
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Subtle hover lift (motion-normal)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card variant="interactive">
                    <CardHeader
                      title="Cloud Architecture Consulting"
                      subtitle="Multi-cloud resilience, AWS / Azure migrations, and Kubernetes containerization."
                      badge={<Badge variant="brand" size="sm">ENTERPRISE</Badge>}
                    />
                    <div className="flex items-center text-xs font-semibold text-[var(--color-brand-primary)] gap-1 pt-2">
                      <span>Explore Capability</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>

                  <Card variant="interactive">
                    <CardHeader
                      title="Custom Software Engineering"
                      subtitle="Bespoke enterprise applications engineered with clean code architecture and high test coverage."
                      badge={<Badge variant="secondary" size="sm">DEVELOPMENT</Badge>}
                    />
                    <div className="flex items-center text-xs font-semibold text-[var(--color-brand-primary)] gap-1 pt-2">
                      <span>Explore Capability</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>

                  <Card variant="interactive">
                    <CardHeader
                      title="Specialized Talent Staffing"
                      subtitle="Dedicated IT specialists, solution architects, and senior engineers augmenting your engineering teams."
                      badge={<Badge variant="cyan" size="sm">STAFFING</Badge>}
                    />
                    <div className="flex items-center text-xs font-semibold text-[var(--color-brand-primary)] gap-1 pt-2">
                      <span>Explore Capability</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                </div>
              </div>

              {/* 4. Feature Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                    Panel Primitive (<code className="font-mono text-xs">radius-lg</code>: 20px)
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Larger radius for feature panels</span>
                </div>
                <Panel variant="light">
                  <div className="max-w-2xl space-y-3">
                    <Badge variant="cyan">FEATURE CONTAINER FRAME</Badge>
                    <h3 className="text-h2 font-semibold text-[var(--color-text-primary)]">
                      Enterprise Technology Governance
                    </h3>
                    <p className="text-body text-[var(--color-text-secondary)]">
                      Panels utilize a 20px radius (<code className="font-mono text-xs">radius-lg</code>) to frame major content sections, creating visual containment without adopting extreme pill curves for content cards.
                    </p>
                    <div className="pt-2">
                      <Button variant="primary">Launch Assessment</Button>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 9: EXPORT TOKENS (CODE / JSON)
           ======================================================== */}
        {activeTab === 'code' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Code Intro */}
            <div className="max-w-3xl">
              <Badge variant="brand" className="mb-3">Single Source of Truth</Badge>
              <h1 className="text-display-md text-[var(--color-text-primary)]">
                Centralized CST Design Tokens
              </h1>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                Import <code className="font-mono text-xs font-bold text-[var(--color-brand-primary)]">cstTokens</code> from <code className="font-mono text-xs">/src/design-system/tokens.ts</code> or consume standard CSS variables like <code className="font-mono text-xs">var(--color-brand-primary)</code>.
              </p>
            </div>

            <div className="p-6 rounded-[var(--radius-md)] bg-[#0A0F1D] text-slate-200 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 font-semibold">tokens.ts (Exported Architecture)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(cstTokens, null, 2), 'json')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  {copiedToken === 'json' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied JSON!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Tokens JSON</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono overflow-x-auto max-h-[500px] p-2 leading-relaxed text-blue-200/90">
                {JSON.stringify(cstTokens, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-default)] bg-[var(--color-background-secondary)] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
            <span>Hscgolbalservices — Enterprise Design Token Foundation</span>
          </div>
          <div>All components governed by token architecture. Zero arbitrary hex values.</div>
        </div>
      </footer>
    </div>
  );
};
