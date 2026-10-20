import React, { useState, useRef, useEffect } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

// Cache-buster version query to ensure browsers never serve a stale cached video
const VIDEO_VERSION = '20261020_v2';
const VIDEO_PATH = `/videos/intro-video.mp4?v=${VIDEO_VERSION}`;
const POSTER_PATH = `/videos/intro-video-poster.jpg?v=${VIDEO_VERSION}`;

export const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasTransitionedRef = useRef(false);

  const handleTransition = () => {
    if (hasTransitionedRef.current) return;
    hasTransitionedRef.current = true;

    // Start cinematic dissolve / fade out
    setIsFadingOut(true);

    // After fade completes, reveal main website
    setTimeout(() => {
      onFinish();
    }, 850);
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

    // Safety fallback timer: The intro video is ~10.0 seconds. Transition after 11.5 seconds if not ended
    const fallbackTimer = setTimeout(() => {
      handleTransition();
    }, 11500);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      onClick={handleTransition}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07051a] overflow-hidden select-none cursor-pointer transition-all duration-1000 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-hidden={isFadingOut}
      title="Click anywhere to skip intro"
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
        className="w-full h-full object-cover object-center pointer-events-none select-none"
      >
        <source src={VIDEO_PATH} type="video/mp4" />
      </video>

      {/* Subtle Skip Indicator */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 backdrop-blur-md text-xs tracking-wider uppercase text-white/70 hover:text-white transition-colors duration-200">
        <span>Skip</span>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};
