import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ClientCard } from '../../src/design-system/components/ClientCard';
import { DarkHeader } from '../../src/components/DarkHeader';
import { CST_SERVICES } from '../../src/data/servicesData';

describe('Accessibility (a11y) & WCAG Compliance Tests', () => {
  it('client cards have accessible roles, titles, and aria-labels', () => {
    const client = {
      id: 'cst-test',
      name: 'Creative Solution Tech',
      industry: 'Cloud Architecture',
      logo: <svg data-testid="svg-logo" />,
    };

    render(<ClientCard client={client} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', `Client partner: ${client.name}`);
    expect(card).toHaveAttribute('title', `${client.name} - ${client.industry}`);
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('disabled client cards remove tabIndex from focus order', () => {
    const client = {
      id: 'cst-test',
      name: 'Creative Solution Tech',
      industry: 'Cloud Architecture',
      logo: <svg data-testid="svg-logo" />,
    };

    render(<ClientCard client={client} forcedState="disabled" />);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '-1');
  });

  it('DarkHeader navigation provides accessible aria-expanded and labels', () => {
    render(<DarkHeader activePage="home" onNavigate={() => {}} />);

    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuButton).toHaveAttribute('aria-label');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('all service offerings have descriptive non-empty text for screen readers', () => {
    for (const service of CST_SERVICES) {
      expect(service.title.trim().length).toBeGreaterThan(2);
      expect(service.description.trim().length).toBeGreaterThan(10);
      expect(service.capabilities.length).toBeGreaterThan(0);
    }
  });
});
