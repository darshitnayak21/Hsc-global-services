import React, { useEffect, useRef } from 'react';

export type CardAccent = 'blue-cyan' | 'violet-purple' | 'green-teal' | 'amber-orange';

interface ServiceCardVisualProps {
  accent: CardAccent;
  isHovered: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface ThemeConfig {
  primary: string;
  secondary: string;
  glow: string;
  particleColor: string;
  orbColor: string;
}

const THEMES: Record<CardAccent, ThemeConfig> = {
  'blue-cyan': {
    primary: '#38bdf8',
    secondary: '#2563eb',
    glow: 'rgba(56, 189, 248, 0.35)',
    particleColor: '56, 189, 248',
    orbColor: 'rgba(14, 165, 233, 0.12)',
  },
  'violet-purple': {
    primary: '#c084fc',
    secondary: '#7c3aed',
    glow: 'rgba(192, 132, 252, 0.35)',
    particleColor: '192, 132, 252',
    orbColor: 'rgba(147, 51, 234, 0.12)',
  },
  'green-teal': {
    primary: '#2dd4bf',
    secondary: '#059669',
    glow: 'rgba(45, 212, 191, 0.35)',
    particleColor: '45, 212, 191',
    orbColor: 'rgba(20, 184, 166, 0.12)',
  },
  'amber-orange': {
    primary: '#fbbf24',
    secondary: '#ea580c',
    glow: 'rgba(251, 191, 36, 0.35)',
    particleColor: '251, 191, 36',
    orbColor: 'rgba(245, 158, 11, 0.12)',
  },
};

export const ServiceCardVisual: React.FC<ServiceCardVisualProps> = ({ accent, isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const theme = THEMES[accent];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedMult = prefersReducedMotion ? 0.2 : 0.85;

    // Subtle particles (10 particles per card - clean and restrained)
    const particles: Particle[] = [];
    const particleCount = 10;

    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25 * speedMult,
          vy: -Math.random() * 0.25 * speedMult - 0.05,
          radius: Math.random() * 1.6 + 1.0,
          alpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
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

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(canvas.parentElement);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;
    let pulseProgress = 0.2;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 1;
      const currentHover = isHoveredRef.current;
      const hoverMultiplier = currentHover ? 1.4 : 1.0;

      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // 1. ABSTRACT FLOWING CURVED LINES & WAVES
      // ==========================================
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Wave 1: Elegant primary curve in upper-middle
      const phase1 = time * 0.008 * speedMult * hoverMultiplier;
      const amp1 = currentHover ? 26 : 20;
      const yBase1 = height * 0.48;

      ctx.beginPath();
      for (let x = 0; x <= width + 10; x += 10) {
        const y =
          yBase1 +
          Math.sin(x * 0.006 + phase1) * amp1 +
          Math.sin(x * 0.012 - phase1 * 0.8) * (amp1 * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const grad1 = ctx.createLinearGradient(0, 0, width, 0);
      grad1.addColorStop(0, 'transparent');
      grad1.addColorStop(0.3, `${theme.primary}18`);
      grad1.addColorStop(0.7, `${theme.primary}${currentHover ? '55' : '35'}`);
      grad1.addColorStop(1, 'transparent');

      ctx.strokeStyle = grad1;
      ctx.lineWidth = currentHover ? 2.2 : 1.6;
      ctx.stroke();

      // Soft glow pass for Wave 1
      ctx.strokeStyle = `${theme.primary}${currentHover ? '1a' : '0d'}`;
      ctx.lineWidth = currentHover ? 8 : 6;
      ctx.stroke();

      // Wave 2: Complementary secondary wave lower down
      const phase2 = time * 0.006 * speedMult * hoverMultiplier + 2.2;
      const amp2 = currentHover ? 24 : 18;
      const yBase2 = height * 0.72;

      ctx.beginPath();
      for (let x = 0; x <= width + 10; x += 10) {
        const y =
          yBase2 +
          Math.cos(x * 0.005 + phase2) * amp2 +
          Math.sin(x * 0.014 + phase2 * 0.5) * (amp2 * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const grad2 = ctx.createLinearGradient(0, 0, width, 0);
      grad2.addColorStop(0, 'transparent');
      grad2.addColorStop(0.4, `${theme.secondary}14`);
      grad2.addColorStop(0.8, `${theme.primary}${currentHover ? '40' : '25'}`);
      grad2.addColorStop(1, 'transparent');

      ctx.strokeStyle = grad2;
      ctx.lineWidth = currentHover ? 1.8 : 1.3;
      ctx.stroke();

      // ==========================================
      // 2. SLOW MOVING LIGHT TRAIL / ENERGY NODE
      // ==========================================
      pulseProgress = (pulseProgress + 0.0018 * speedMult * hoverMultiplier) % 1.0;
      const pulseX = pulseProgress * width;
      const pulseY =
        yBase1 +
        Math.sin(pulseX * 0.006 + phase1) * amp1 +
        Math.sin(pulseX * 0.012 - phase1 * 0.8) * (amp1 * 0.35);

      // Light trail
      const trailLength = 55;
      const trailSteps = 7;
      for (let t = 1; t <= trailSteps; t++) {
        const trailProg = pulseProgress - (t / trailSteps) * (trailLength / width);
        if (trailProg > 0) {
          const tx = trailProg * width;
          const ty =
            yBase1 +
            Math.sin(tx * 0.006 + phase1) * amp1 +
            Math.sin(tx * 0.012 - phase1 * 0.8) * (amp1 * 0.35);
          const tAlpha = (1 - t / trailSteps) * (currentHover ? 0.45 : 0.28);
          ctx.fillStyle = `${theme.primary}${Math.floor(tAlpha * 255).toString(16).padStart(2, '0')}`;
          ctx.beginPath();
          ctx.arc(tx, ty, 2.2 * (1 - (t / trailSteps) * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Glowing head
      const nodeGlow = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, currentHover ? 14 : 10);
      nodeGlow.addColorStop(0, theme.primary);
      nodeGlow.addColorStop(0.5, `${theme.primary}44`);
      nodeGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = nodeGlow;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, currentHover ? 14 : 10, 0, Math.PI * 2);
      ctx.fill();

      // Bright center core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // ==========================================
      // 3. SOFT GEOMETRIC WATERMARK ARCS & FORMS
      // ==========================================
      const arcCenterX = width * 0.85;
      const arcCenterY = height * 0.25;
      const rotAngle = time * 0.0006 * speedMult;

      ctx.save();
      ctx.translate(arcCenterX, arcCenterY);
      ctx.rotate(rotAngle);

      // Outer delicate arc
      ctx.beginPath();
      ctx.arc(0, 0, currentHover ? 65 : 55, -Math.PI * 0.6, Math.PI * 0.6);
      ctx.strokeStyle = `${theme.primary}${currentHover ? '22' : '12'}`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner dashed concentric arc
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.arc(0, 0, currentHover ? 45 : 38, -Math.PI * 0.4, Math.PI * 0.8);
      ctx.strokeStyle = `${theme.primary}${currentHover ? '18' : '0e'}`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // ==========================================
      // 4. FLOATING PARTICLES
      // ==========================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const currentAlpha = Math.max(0.1, p.alpha + pulse * 0.15) * (currentHover ? 1.3 : 1.0);

        ctx.fillStyle = `rgba(${theme.particleColor}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [accent]);

  const theme = THEMES[accent];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-[inherit]">
      {/* 1. Dark Navy foundation gradient (rich navy, not flat black) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b142c] via-[#070e22] to-[#040817]" />

      {/* 2. Soft Ambient Accent Glow in Top-Right / Corner */}
      <div
        className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-40' : 'opacity-20'
        }`}
        style={{ backgroundColor: theme.primary }}
      />
      <div
        className={`absolute -bottom-20 -left-20 w-52 h-52 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-25' : 'opacity-10'
        }`}
        style={{ backgroundColor: theme.secondary }}
      />

      {/* 3. Subtle Cyber Grid & Dot Matrix Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 4. Canvas for Flowing Curves, Light Trails, Rotating Shapes & Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* 5. Soft Readability Vignette Scrim (Ensures text in front is effortlessly legible) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040817]/90 via-[#070e22]/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_transparent_40%,_rgba(4,8,23,0.6)_100%)]" />
    </div>
  );
};
