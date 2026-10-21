import React, { useState, useRef, useEffect } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

// Cache-buster version query to ensure browsers never serve a stale cached video
const VIDEO_VERSION = '20261021_v2';
const VIDEO_PATH = `/videos/intro-video.mp4?v=${VIDEO_VERSION}`;
const POSTER_PATH = `/videos/intro-video-poster.jpg?v=${VIDEO_VERSION}`;

export const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasTransitionedRef = useRef(false);

  const handleTransition = () => {
    if (hasTransitionedRef.current) return;
    hasTransitionedRef.current = true;

    // Fast fade out for zero-delay website access
    setIsFadingOut(true);

    // Promptly reveal main website (200ms for smooth visual dissolve without delay)
    setTimeout(() => {
      onFinish();
    }, 200);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video autoplay handled:', error);
        });
      }
    }

    // Keyboard listener: allow Enter, Space, or Escape to immediately skip with 0 delay
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        handleTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Fast fallback timer: transition after 3.5 seconds if video doesn't play or stall occurs
    const fallbackTimer = setTimeout(() => {
      handleTransition();
    }, 3500);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      onClick={handleTransition}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#eaeaea] overflow-hidden select-none cursor-pointer transition-all duration-200 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-hidden={isFadingOut}
    >
      {/* Pure Cinematic Video */}
      <video
        ref={videoRef}
        src={VIDEO_PATH}
        poster={POSTER_PATH}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleTransition}
        onError={() => {
          console.warn('Intro video error, proceeding to site');
          handleTransition();
        }}
        onTimeUpdate={() => {
          if (videoRef.current && videoRef.current.duration) {
            // Smoothly initiate fade-out slightly before the absolute end for zero-stutter transition
            if (videoRef.current.currentTime >= videoRef.current.duration - 0.25) {
              handleTransition();
            }
          }
        }}
        className="w-full h-full object-contain md:landscape:object-cover object-center pointer-events-none select-none"
      >
        <source src={VIDEO_PATH} type="video/mp4" />
      </video>
    </div>
  );
};
