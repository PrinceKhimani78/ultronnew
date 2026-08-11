'use client';

import { useEffect, useState } from 'react';

export function UltronLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent page scrolling while loader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let animFrame: number;
    let startTime: number | null = null;
    const DURATION = 1300; // 1.3s total loading animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Non-linear progress curve: quick start to ~65%, then smooth to 100%
      const ratio = Math.min(elapsed / DURATION, 1);
      let currentProgress = 0;

      if (ratio < 0.6) {
        currentProgress = (ratio / 0.6) * 65;
      } else {
        currentProgress = 65 + ((ratio - 0.6) / 0.4) * 35;
      }

      currentProgress = Math.min(Math.round(currentProgress), 100);
      setProgress(currentProgress);

      if (ratio < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        // Progress reached 100%
        setProgress(100);
        setIsComplete(true);

        // Hold completed teal state briefly (250ms), then fade out (400ms)
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsMounted(false);
            document.body.style.overflow = originalOverflow || '';
          }, 400);
        }, 250);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  if (!isMounted) return null;

  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`ultron-loader-overlay fixed inset-0 z-[99999] flex h-[100dvh] w-full items-center justify-center bg-[#FDFBEE] transition-all duration-400 ease-out ${
        isFading
          ? 'visibility-hidden pointer-events-none scale-[1.02] opacity-0'
          : 'scale-100 opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${Math.round(progress)}%`}
    >
      <div
        className={`relative flex flex-col items-center justify-center transition-transform duration-300 ${
          isComplete ? 'scale-[1.025]' : 'scale-100'
        }`}
      >
        {/* Outer Progress Ring & UF Monogram Area */}
        <div className="relative flex h-[155px] w-[155px] items-center justify-center sm:h-[195px] sm:w-[195px]">
          {/* SVG Clockwise Progress Circle */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90 transform"
            viewBox="0 0 195 195"
          >
            {/* Inactive Cream/Teal Background Track */}
            <circle
              cx="97.5"
              cy="97.5"
              r={radius}
              className="fill-none stroke-[#035551]/10"
              strokeWidth="4"
            />
            {/* Active Clockwise Progress Stroke */}
            <circle
              cx="97.5"
              cy="97.5"
              r={radius}
              className="stroke-linecap-round fill-none transition-colors duration-300"
              strokeWidth="4"
              stroke={isComplete ? '#035551' : '#DCCB8E'}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 40ms linear, stroke 300ms ease',
              }}
            />
          </svg>

          {/* Prominent Centred UF Monogram Symbol with Bottom-to-Top Fill */}
          <div className="relative flex h-[92px] w-[92px] items-center justify-center sm:h-[118px] sm:w-[118px]">
            {/* Inactive Muted Base UF Layer */}
            <div
              className="absolute inset-0 bg-[#DCCB8E]/30"
              style={{
                WebkitMaskImage: 'url(/brand/logo-icon-green.webp)',
                maskImage: 'url(/brand/logo-icon-green.webp)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />

            {/* Coloured Progress Fill UF Layer (Clipped Bottom-to-Top) */}
            <div
              className="absolute inset-0 transition-colors duration-300"
              style={{
                backgroundColor: isComplete ? '#035551' : '#DCCB8E',
                clipPath: `inset(${100 - progress}% 0 0 0)`,
                WebkitMaskImage: 'url(/brand/logo-icon-green.webp)',
                maskImage: 'url(/brand/logo-icon-green.webp)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                transition: 'backgroundColor 300ms ease',
              }}
            />
          </div>
        </div>

        {/* Synchronized Percentage Display */}
        <div className="font-display mt-5 text-[13px] font-bold tracking-widest uppercase transition-colors duration-300">
          <span style={{ color: isComplete ? '#035551' : '#DCCB8E' }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
