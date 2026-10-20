import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

// Custom enterprise easing curves (similar to Linear / Vercel / Stripe design systems)
export const enterpriseEasing = [0.16, 1, 0.3, 1] as const;
export const gentleEasing = [0.25, 0.1, 0.25, 1] as const;
export const smoothSpring = { type: 'spring', stiffness: 380, damping: 30 } as const;

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  distance?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
  blur?: boolean;
}

/**
 * Scroll-triggered reveal with directional slide, smooth opacity, and optional blur
 */
export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 24,
  className = '',
  viewportMargin = '-40px',
  once = true,
  blur = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsetMap = {
    up: { y: distance, x: 0, scale: 1 },
    down: { y: -distance, x: 0, scale: 1 },
    left: { x: -distance, y: 0, scale: 1 },
    right: { x: distance, y: 0, scale: 1 },
    scale: { x: 0, y: 0, scale: 0.95 },
    none: { x: 0, y: 0, scale: 1 },
  };

  const initialOffset = offsetMap[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialOffset,
        ...(blur ? { filter: 'blur(8px)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        ...(blur ? { filter: 'blur(0px)' } : {}),
      }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: enterpriseEasing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * High-end staggered word reveal with fluid enterprise easing
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.04,
  as = 'h2',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const Component = motion[as] as any;

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1 align-top">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: '100%' },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: enterpriseEasing,
                },
              },
            }}
            className={`inline-block ${wordClassName}`}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

/**
 * Stagger container for cascading grids (cards, lists, milestones)
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className = '',
  viewportMargin = '-40px',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  direction?: 'up' | 'scale' | 'left' | 'right';
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  distance = 20,
  direction = 'up',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialVariants = {
    up: { opacity: 0, y: distance, scale: 1 },
    scale: { opacity: 0, y: 0, scale: 0.94 },
    left: { opacity: 0, x: -distance, y: 0, scale: 1 },
    right: { opacity: 0, x: distance, y: 0, scale: 1 },
  };

  return (
    <motion.div
      variants={{
        hidden: initialVariants[direction],
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            ease: enterpriseEasing,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverY?: number;
  hoverScale?: number;
}

/**
 * Micro-interactive card with hardware-accelerated lift & smooth glow
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  onClick,
  hoverY = -6,
  hoverScale = 1.012,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        transition: { duration: 0.26, ease: gentleEasing },
      }}
      whileTap={{ scale: 0.985 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  duration?: number;
}

/**
 * Image reveal with slow cinematic scale-down and opacity transition
 */
export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  delay = 0,
  duration = 0.9,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden ${containerClassName}`}>
        <img src={src} alt={alt} className={className} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration,
          delay,
          ease: enterpriseEasing,
        }}
        className={className}
      />
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}

/**
 * Subtle ambient float for badges and accents
 */
export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  distance = 6,
  duration = 5,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Smooth number ticker for stats (e.g. 50+, 99.8%, 8+)
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (!hasAnimated) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [hasAnimated, value, duration, shouldReduceMotion]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setHasAnimated(true)}
      viewport={{ once: true }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
};

export { motion, AnimatePresence };
