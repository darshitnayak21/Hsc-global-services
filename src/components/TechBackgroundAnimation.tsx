import React, { useEffect, useRef } from 'react';

interface TechBackgroundAnimationProps {
  className?: string;
  mode?: 'animated' | 'photo-blend' | 'photo-only';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulseOffset: number;
}

export const TechBackgroundAnimation: React.FC<TechBackgroundAnimationProps> = ({
  className = '',
  mode = 'animated',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (mode === 'photo-only') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    // Motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedMultiplier = 1.0;

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      const isMobile = w < 768;
      const particleCount = isMobile ? 36 : 64;
      particles = [];

      // High-tech enterprise constellation palette
      const palette = [
        { color: 'rgba(56, 189, 248, ', glow: '#38bdf8' }, // Vivid Sky Cyan
        { color: 'rgba(129, 140, 248, ', glow: '#818cf8' }, // Soft Indigo
        { color: 'rgba(45, 212, 191, ', glow: '#2dd4bf' }, // Neon Teal
        { color: 'rgba(96, 165, 250, ', glow: '#60a5fa' }, // Electric Blue
        { color: 'rgba(192, 132, 252, ', glow: '#c084fc' }, // Soft Violet
        { color: 'rgba(6, 182, 212, ', glow: '#06b6d4' }, // Pure Cyan
      ];

      for (let i = 0; i < particleCount; i++) {
        const item = palette[Math.floor(Math.random() * palette.length)];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.65 * speedMultiplier,
          vy: (Math.random() - 0.5) * 0.55 * speedMultiplier,
          radius: Math.random() * 2.2 + 1.5,
          baseAlpha: Math.random() * 0.35 + 0.55,
          alpha: 0.75,
          color: item.color,
          glowColor: item.glow,
          pulseSpeed: Math.random() * 0.025 + 0.012,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || Math.max(window.innerHeight * 0.82, 650);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    resize();
    window.addEventListener('resize', resize);
    const timeoutId = setTimeout(resize, 60);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('mousemove', handleMouseMove);
      parentEl.addEventListener('mouseleave', handleMouseLeave);
    }

    let isRunning = false;

    const startAnimation = () => {
      if (!isRunning && isVisible && !prefersReducedMotion) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

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

    let time = 0;

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      time += 1;
      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // ANIMATED CONSTELLATION NETWORK & GLOWING NODES
      // ==========================================
      ctx.save();
      const maxDistance = width < 768 ? 90 : 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interactive mouse attraction/repulsion
        if (mouseX > -500) {
          const mdx = mouseX - p.x;
          const mdy = mouseY - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140 && mDist > 4) {
            const force = (1 - mDist / 140) * 0.4;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        p.alpha = Math.max(0.4, Math.min(1.0, p.baseAlpha + pulse * 0.3));

        // Particle luminous radial halo
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.2);
        radGrad.addColorStop(0, `${p.color}${p.alpha})`);
        radGrad.addColorStop(0.45, `${p.color}${p.alpha * 0.4})`);
        radGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Particle bright spark core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles for dynamic high-tech constellation network (capped connections per particle)
        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < 3; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connections++;
            const lineAlpha = (1 - dist / maxDistance) * 0.4 * p.alpha;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    // If reduced motion is requested, render one static frame
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      if (parentEl) {
        parentEl.removeEventListener('mousemove', handleMouseMove);
        parentEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [mode]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Layer 1: Deep Navy / Midnight Digital Foundation */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Layer 1.5: Distinct Cyber Circuit Grid & Dot Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.6) 1.5px, transparent 1.5px)`,
          backgroundSize: '22px 22px',
        }}
      />

      {/* Layer 2: Radiant Digital Ambient Glow Orbs (Electric Blue, Cyan, Purple) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[12%] left-[8%] w-[680px] h-[480px] rounded-full bg-cyan-500/25 blur-[120px] animate-pulse"
          style={{ animationDuration: '7s' }}
        />
        <div
          className="absolute top-[20%] right-[3%] w-[720px] h-[520px] rounded-full bg-indigo-600/28 blur-[130px] animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        <div
          className="absolute -bottom-[8%] left-[28%] w-[650px] h-[420px] rounded-full bg-blue-600/25 blur-[120px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
      </div>

      {/* Layer 3: Active Hardware-Accelerated Canvas for Floating Constellation Mesh & Glowing Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Layer 4: Refined Readability Vignette (Allows edge-to-edge animation vibrancy while keeping center text crystal clear) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(3,7,18,0.3)_0%,_rgba(3,7,18,0.1)_45%,_rgba(3,7,18,0.55)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/95" />
    </div>
  );
};
