import React, { useEffect, useRef } from 'react';

interface SubtleAmbientWavesProps {
  className?: string;
}

export const SubtleAmbientWaves: React.FC<SubtleAmbientWavesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let step = 0;

    // Subtle drifting particles
    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
      color: string;
    }

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      const count = Math.min(Math.floor(w / 45), 32);
      particles = [];
      const colors = [
        'rgba(6, 182, 212, ',   // cyan-500
        'rgba(56, 189, 248, ',  // sky-400
        'rgba(14, 165, 233, ',  // sky-500
        'rgba(45, 212, 191, ',  // teal-400
      ];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 1.6 + 0.8,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -(Math.random() * 0.2 + 0.08), // Gentle upward drift
          baseAlpha: Math.random() * 0.18 + 0.08, // Very subtle opacity
          pulseSpeed: Math.random() * 0.015 + 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || 800;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isRunning = false;

    const startAnimation = () => {
      if (!isRunning && isVisible && !prefersReducedMotion) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animId);
      }
    };

    // Pause when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Smooth wave drawer
    const drawWave = (
      yBaseRatio: number,
      amplitude: number,
      wavelength: number,
      speed: number,
      phaseOffset: number,
      strokeColor: string,
      fillGradientColors: [string, string]
    ) => {
      const yBase = height * yBaseRatio;
      ctx.beginPath();
      ctx.moveTo(0, height);

      // Draw bottom-up wave ribbon
      for (let x = 0; x <= width; x += 12) {
        const wave1 = Math.sin((x / wavelength) + step * speed + phaseOffset) * amplitude;
        const wave2 = Math.cos((x / (wavelength * 1.6)) - step * (speed * 0.6) + phaseOffset) * (amplitude * 0.45);
        const y = yBase + wave1 + wave2;

        if (x === 0) {
          ctx.lineTo(0, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Soft vertical gradient fill
      const grad = ctx.createLinearGradient(0, yBase - amplitude, 0, height);
      grad.addColorStop(0, fillGradientColors[0]);
      grad.addColorStop(1, fillGradientColors[1]);
      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate wave crest stroke
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      step += 0.005; // Very slow, calm evolution
      ctx.clearRect(0, 0, width, height);

      // Wave Layer 1: Ambient deep cyan wave
      drawWave(
        0.35,
        48,
        width * 0.65,
        0.4,
        0,
        'rgba(6, 182, 212, 0.12)',
        ['rgba(6, 182, 212, 0.045)', 'rgba(6, 182, 212, 0.002)']
      );

      // Wave Layer 2: Subtle soft electric blue secondary wave
      drawWave(
        0.6,
        40,
        width * 0.5,
        -0.35,
        Math.PI / 3,
        'rgba(14, 165, 233, 0.10)',
        ['rgba(14, 165, 233, 0.038)', 'rgba(14, 165, 233, 0.002)']
      );

      // Wave Layer 3: Gentle low teal crest
      drawWave(
        0.8,
        32,
        width * 0.45,
        0.3,
        Math.PI / 1.7,
        'rgba(45, 212, 191, 0.08)',
        ['rgba(45, 212, 191, 0.03)', 'rgba(45, 212, 191, 0.001)']
      );

      // Draw and update micro-particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alpha = p.baseAlpha + Math.sin(step * 1.5 + p.pulseOffset) * 0.06;
        const clampedAlpha = Math.max(0.02, Math.min(alpha, 0.35));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full opacity-90" />
    </div>
  );
};
