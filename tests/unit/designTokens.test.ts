import { describe, it, expect } from 'vitest';
import { cstTokens } from '../../src/design-system/tokens';

describe('Unit Tests: Design Tokens System', () => {
  it('should define color system with required brand and neutral tones', () => {
    expect(cstTokens.color).toBeDefined();
    expect(cstTokens.color.brand.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(cstTokens.color.text.primary).toBeDefined();
    expect(cstTokens.color.text.secondary).toBeDefined();
    expect(cstTokens.color.background.primary).toBeDefined();
  });

  it('should define fonts for display, body, and monospace', () => {
    expect(cstTokens.font).toBeDefined();
    expect(cstTokens.font.display).toContain('Plus Jakarta Sans');
    expect(cstTokens.font.body).toContain('Inter');
    expect(cstTokens.font.mono).toContain('JetBrains Mono');
  });

  it('should define responsive clamp typography scale', () => {
    expect(cstTokens.text).toBeDefined();
    expect(cstTokens.text['display-xl']).toBeDefined();
    expect(cstTokens.text['display-xl'].clamp).toContain('clamp(');
    expect(cstTokens.text['h1']).toBeDefined();
    expect(cstTokens.text['body']).toBeDefined();
  });

  it('should define 4px-based spacing scale and border radii', () => {
    expect(cstTokens.space).toBeDefined();
    expect(cstTokens.space['space-4']).toBe('1rem');
    expect(cstTokens.radius).toBeDefined();
    expect(cstTokens.radius['radius-md']).toBe('12px');
    expect(cstTokens.radius['radius-lg']).toBe('20px');
  });
});
