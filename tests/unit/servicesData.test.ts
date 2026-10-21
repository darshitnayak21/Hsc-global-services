import { describe, it, expect } from 'vitest';
import { CST_SERVICES, SERVICE_CATEGORIES } from '../../src/data/servicesData';

describe('Unit Tests: Services Data Model & Business Integrity', () => {
  it('should have valid category categories configured', () => {
    expect(SERVICE_CATEGORIES).toBeInstanceOf(Array);
    expect(SERVICE_CATEGORIES.length).toBeGreaterThanOrEqual(3);

    const ids = SERVICE_CATEGORIES.map((c) => c.id);
    expect(ids).toContain('all');
    expect(ids).toContain('engineering');
    expect(ids).toContain('enterprise');
  });

  it('should contain valid service items with unique IDs', () => {
    expect(CST_SERVICES.length).toBeGreaterThan(0);

    const seenIds = new Set<string>();
    for (const service of CST_SERVICES) {
      expect(service.id).toBeDefined();
      expect(typeof service.id).toBe('string');
      expect(service.id.trim()).not.toBe('');
      expect(seenIds.has(service.id)).toBe(false);
      seenIds.add(service.id);
    }
  });

  it('each service must have title, summary, description, and capabilities', () => {
    for (const service of CST_SERVICES) {
      expect(service.title, `Missing title on ${service.id}`).toBeTruthy();
      expect(service.summary, `Missing summary on ${service.id}`).toBeTruthy();
      expect(service.description, `Missing description on ${service.id}`).toBeTruthy();
      expect(service.categoryLabel, `Missing categoryLabel on ${service.id}`).toBeTruthy();

      expect(Array.isArray(service.capabilities)).toBe(true);
      expect(service.capabilities.length).toBeGreaterThan(0);
      service.capabilities.forEach((cap) => {
        expect(typeof cap).toBe('string');
        expect(cap.trim().length).toBeGreaterThan(3);
      });
    }
  });

  it('should include key business services such as IT recruitment and staffing', () => {
    const serviceIds = CST_SERVICES.map((s) => s.id);
    expect(serviceIds).toContain('it-recruitment');
    expect(serviceIds).toContain('staffing');
  });

  it('should filter services cleanly by category', () => {
    const enterpriseServices = CST_SERVICES.filter((s) => s.category === 'enterprise');
    const engineeringServices = CST_SERVICES.filter((s) => s.category === 'engineering');

    expect(enterpriseServices.length).toBeGreaterThan(0);
    expect(engineeringServices.length).toBeGreaterThan(0);
    expect(enterpriseServices.length + engineeringServices.length).toBe(CST_SERVICES.length);
  });
});
