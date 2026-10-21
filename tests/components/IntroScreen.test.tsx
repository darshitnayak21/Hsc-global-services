import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { IntroScreen } from '../../src/components/IntroScreen';

describe('Component Tests: IntroScreen', () => {
  it('renders video element with correct source and poster attributes', () => {
    const handleFinish = vi.fn();
    const { container } = render(<IntroScreen onFinish={handleFinish} />);

    const video = container.querySelector('video') as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.getAttribute('src')).toContain('/videos/intro-video.mp4');
    expect(video.getAttribute('poster')).toContain('/videos/intro-video-poster.jpg');
  });

  it('applies responsive object-contain for mobile and md:landscape:object-cover for desktop', () => {
    const handleFinish = vi.fn();
    const { container } = render(<IntroScreen onFinish={handleFinish} />);

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.className).toContain('object-contain');
    expect(video?.className).toContain('md:landscape:object-cover');
  });

  it('guarantees the Skip button is completely removed from the intro screen', () => {
    const handleFinish = vi.fn();
    render(<IntroScreen onFinish={handleFinish} />);

    // Check for any text matching 'skip' (case-insensitive) or skip buttons
    const skipButtonText = screen.queryByText(/skip/i);
    expect(skipButtonText).not.toBeInTheDocument();

    const skipButtonRole = screen.queryByRole('button', { name: /skip/i });
    expect(skipButtonRole).not.toBeInTheDocument();
  });

  it('triggers onFinish when clicking the screen container', () => {
    vi.useFakeTimers();
    const handleFinish = vi.fn();
    const { container } = render(<IntroScreen onFinish={handleFinish} />);

    const screenContainer = container.firstChild as HTMLElement;
    fireEvent.click(screenContainer);

    // Fast-forward transition timer (850ms)
    vi.advanceTimersByTime(900);
    expect(handleFinish).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('triggers transition when video fires ended event', () => {
    vi.useFakeTimers();
    const handleFinish = vi.fn();
    const { container } = render(<IntroScreen onFinish={handleFinish} />);

    const video = container.querySelector('video')!;
    fireEvent.ended(video);

    vi.advanceTimersByTime(900);
    expect(handleFinish).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('triggers graceful fallback when video fails to load (onError)', () => {
    vi.useFakeTimers();
    const handleFinish = vi.fn();
    const { container } = render(<IntroScreen onFinish={handleFinish} />);

    const video = container.querySelector('video')!;
    fireEvent.error(video);

    vi.advanceTimersByTime(900);
    expect(handleFinish).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
