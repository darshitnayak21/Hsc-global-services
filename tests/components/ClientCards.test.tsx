import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ClientCard } from '../../src/design-system/components/ClientCard';
import { ClientLogoGrid, VERIFIED_CLIENTS } from '../../src/components/ClientLogoGrid';

describe('Component Tests: Client Cards & Client Logo Grid', () => {
  const sampleClient = {
    id: 'test-client',
    name: 'Global Enterprise Corp',
    industry: 'Cloud Infrastructure',
    logo: <span data-testid="test-logo">LOGO</span>,
  };

  it('renders client card with name, industry, and logo', () => {
    render(<ClientCard client={sampleClient} />);

    expect(screen.getByText('Global Enterprise Corp')).toBeInTheDocument();
    expect(screen.getByText('Cloud Infrastructure')).toBeInTheDocument();
    expect(screen.getByTestId('test-logo')).toBeInTheDocument();
  });

  it('fires onClick callback with client id when clicked', () => {
    const handleClick = vi.fn();
    render(<ClientCard client={sampleClient} onClick={handleClick} />);

    const card = screen.getByRole('button', { name: /client partner: Global Enterprise Corp/i });
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledWith('test-client');
  });

  it('renders loading skeleton when state is loading', () => {
    const { container } = render(<ClientCard client={sampleClient} forcedState="loading" />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error state message when forcedState is error', () => {
    render(<ClientCard client={sampleClient} forcedState="error" />);
    expect(screen.getByText(/Logo asset failed to render/i)).toBeInTheDocument();
  });

  it('renders empty slot placeholder when forcedState is empty', () => {
    render(<ClientCard client={sampleClient} forcedState="empty" />);
    expect(screen.getByText(/Empty Partner Slot/i)).toBeInTheDocument();
  });

  it('renders the verified client logos in ClientLogoGrid with accessible alt attributes', () => {
    render(<ClientLogoGrid />);

    // Should render all verified clients defined in VERIFIED_CLIENTS
    expect(VERIFIED_CLIENTS.length).toBeGreaterThanOrEqual(5);
    for (const client of VERIFIED_CLIENTS) {
      expect(screen.getByAltText(`${client.name} logo`)).toBeInTheDocument();
    }
  });
});
