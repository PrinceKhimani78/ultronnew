'use client';

import { useEffect, useState } from 'react';

export function UltronLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Prevent page scrolling while loader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const triggerFadeOut = () => {
      setIsFading(true);
      const timer = setTimeout(() => {
        setIsMounted(false);
        document.body.style.overflow = originalOverflow || '';
      }, 500);
      return timer;
    };

    let fadeTimer: NodeJS.Timeout;
    let mainTimer: NodeJS.Timeout;

    if (document.readyState === 'complete') {
      mainTimer = setTimeout(() => {
        fadeTimer = triggerFadeOut();
      }, 800);
    } else {
      const handleLoad = () => {
        mainTimer = setTimeout(() => {
          fadeTimer = triggerFadeOut();
        }, 600);
      };

      window.addEventListener('load', handleLoad);
      const fallbackTimer = setTimeout(() => {
        fadeTimer = triggerFadeOut();
      }, 2500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(mainTimer);
        clearTimeout(fallbackTimer);
        clearTimeout(fadeTimer);
        document.body.style.overflow = originalOverflow || '';
      };
    }

    return () => {
      clearTimeout(mainTimer);
      clearTimeout(fadeTimer);
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`ultron-loader-overlay ${isFading ? 'ultron-loader-fading' : ''}`}
      aria-hidden={isFading}
    >
      <div
        className="ultron-loader"
        role="status"
        aria-label="Loading Ultron Financials"
      >
        <span aria-hidden="true">Ultron Financials</span>
        <span aria-hidden="true">Ultron Financials</span>
      </div>
    </div>
  );
}
