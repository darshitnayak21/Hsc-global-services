import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DarkHeader } from '../../src/components/DarkHeader';

describe('Component Tests: Navigation & DarkHeader', () => {
  it('renders all core navigation items', () => {
    const onNavigate = vi.fn();
    render(<DarkHeader activePage="home" onNavigate={onNavigate} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it('calls onNavigate with appropriate page id when clicked', () => {
    const onNavigate = vi.fn();
    render(<DarkHeader activePage="home" onNavigate={onNavigate} />);

    const servicesBtn = screen.getByText('Services');
    fireEvent.click(servicesBtn);

    expect(onNavigate).toHaveBeenCalledWith('services');
  });

  it('triggers contact action when Contact Us is clicked', () => {
    const onNavigate = vi.fn();
    const onContactClick = vi.fn();
    render(
      <DarkHeader
        activePage="home"
        onNavigate={onNavigate}
        onContactClick={onContactClick}
      />
    );

    const contactBtn = screen.getByRole('button', { name: /contact us/i });
    fireEvent.click(contactBtn);

    expect(onNavigate).toHaveBeenCalledWith('contact');
    expect(onContactClick).toHaveBeenCalled();
  });

  it('toggles mobile menu open and closed when hamburger button is clicked', () => {
    const onNavigate = vi.fn();
    render(<DarkHeader activePage="home" onNavigate={onNavigate} />);

    const menuToggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuToggle).toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // Close mobile menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });
});
